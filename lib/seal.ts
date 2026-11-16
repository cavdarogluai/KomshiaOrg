import { createHmac, timingSafeEqual } from "node:crypto";

// Mühür anahtarı: FORM_SECRET, yoksa sunucuya özel DATABASE_URL (ikisi de istemciye gitmez).
const secret = () => process.env.FORM_SECRET || process.env.DATABASE_URL || "";

export function makeSeal(): string {
  const s = secret();
  if (!s) return "";
  const ts = Date.now().toString();
  return `${ts}.${createHmac("sha256", s).update(ts).digest("hex")}`;
}

/** Form mührü: imza geçerli, en az 3 sn önce, en çok 2 saat önce üretilmiş olmalı. */
export function checkSeal(seal: string): boolean {
  const s = secret();
  if (!s || !seal) return false;
  const [ts, sig] = seal.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;
  const want = createHmac("sha256", s).update(ts).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(want);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const age = Date.now() - Number(ts);
  return age >= 3000 && age <= 2 * 60 * 60 * 1000;
}
