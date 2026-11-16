import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { checkSeal } from "@/lib/seal";
import { parseContact } from "@/lib/validate";
import { limited } from "@/lib/ratelimit";

export const runtime = "nodejs";

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
    await sql`INSERT INTO contact_messages (lang, name, email, topic, message, ip_hash)
              VALUES (${c.lang}, ${c.name}, ${c.email}, ${c.topic}, ${c.message}, ${ipHash.slice(0, 16)})`;
  } catch {
    return reply(503, "unavailable");
  }
  return reply(200, "ok");
}
