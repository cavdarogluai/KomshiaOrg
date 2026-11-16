import { TOPICS } from "./i18n";

const BAD = /(<\s*\/?\s*(script|iframe|img|svg|object|embed|style)\b|javascript:|on\w+\s*=|\{\{|\$\{|union\s+select|;\s*drop\s+table|\.\.\/)/i;
const CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const DISPOSABLE = new Set(["mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "yopmail.com", "trashmail.com", "sharklasers.com"]);

function safeDecode(v: string): string { try { return decodeURIComponent(v); } catch { return v; } }

export function clean(v: unknown, max: number): string {
  return (typeof v === "string" ? v : "").replace(/\r\n/g, "\n").trim().slice(0, max);
}

export type Contact = { name: string; email: string; topic: (typeof TOPICS)[number]; message: string; lang: "bg" | "en" };

export function parseContact(b: Record<string, unknown>): Contact | null {
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase(), message = clean(b.message, 4000);
  const topic = clean(b.topic, 20) as Contact["topic"];
  const lang = b.lang === "en" ? "en" : "bg";
  if (!name || !EMAIL.test(email) || message.length < 10 || !(TOPICS as readonly string[]).includes(topic)) return null;
  if (DISPOSABLE.has(email.split("@")[1])) return null;
  for (const f of [name, email, message]) {
    if (BAD.test(f) || BAD.test(safeDecode(f)) || CTRL.test(f)) return null;
  }
  if ((message.match(/https?:\/\//gi) || []).length > 2) return null;
  return { name, email, topic, message, lang };
}
