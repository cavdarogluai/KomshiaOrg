import { createHash } from "node:crypto";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { checkSeal } from "@/lib/seal";
import { parseContact } from "@/lib/validate";
import { limited } from "@/lib/ratelimit";

export const runtime = "nodejs";

// Şema db/001_contact.sql ile aynı; tablo yoksa ilk istekte oluşturur (idempotent).
let ready = false;
async function ensureSchema(sql: NeonQueryFunction<false, false>) {
  if (ready) return;
  await sql`CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    lang TEXT NOT NULL CHECK (lang IN ('bg','en')),
    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
    email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
    topic TEXT NOT NULL CHECK (topic IN ('volunteer','partner','help','press','other')),
    message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
    ip_hash TEXT)`;
  await sql`CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC)`;
  ready = true;
}

const reply = (status: number, code: string) => NextResponse.json({ ok: status === 200, code }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return reply(400, "invalid_content"); }

  // 1) bal küpü: dolu ise sessiz 200 (bota katmanı söylenmez)
  if (typeof body.website === "string" && body.website.length > 0) return reply(200, "ok");
  // 2) sunucu form mührü
  if (!checkSeal(String(body.seal ?? ""))) return reply(400, "invalid_content");
  // 3) içerik doğrulama + enjeksiyon kalıpları
  const c = parseContact(body);
  if (!c) return reply(400, "invalid_content");
  // 4) hız sınırı: IP 10/saat, e-posta 5/gün
  const ip = (req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");
  if (limited(`ip:${ipHash}`, 10, 3_600_000) || limited(`em:${c.email}`, 5, 86_400_000)) return reply(429, "rate_limited");

  const url = process.env.DATABASE_URL;
  if (!url) return reply(503, "unavailable");
  try {
    const sql = neon(url);
    await ensureSchema(sql);
    await sql`INSERT INTO contact_messages (lang, name, email, topic, message, ip_hash)
              VALUES (${c.lang}, ${c.name}, ${c.email}, ${c.topic}, ${c.message}, ${ipHash.slice(0, 16)})`;
  } catch {
    return reply(503, "unavailable");
  }
  return reply(200, "ok");
}
