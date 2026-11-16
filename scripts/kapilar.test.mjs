// CI kapıları: iletişim yalnız form (mailto yok), düz metin e-posta/telefon yok, marka adı büyük harf dönüşümü yok.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    if (["node_modules", ".next", ".git"].includes(n)) continue;
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p, out) : /\.(tsx?|css|json|html)$/.test(n) && out.push(p);
  }
  return out;
}
const files = walk(new URL("..", import.meta.url).pathname).filter((f) => !f.endsWith("kapilar.test.mjs") && !f.endsWith("package-lock.json"));

test("mailto: yok", () => { for (const f of files) assert.ok(!/mailto:/i.test(readFileSync(f, "utf8")), f); });
test("düz metin e-posta/telefon yok", () => {
  for (const f of files) {
    const s = readFileSync(f, "utf8");
    assert.ok(!/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(s.replace(/example@|@types\/|@neondatabase\/|@\/|@media|@vercel/g, "")), `e-posta: ${f}`);
    assert.ok(!/\+\d{2,3}[\s\d]{8,}/.test(s), `telefon: ${f}`);
  }
});
test("Türkçe büyük harf dönüşümü yok (marka adı)", () => { for (const f of files) assert.ok(!/toLocaleUpperCase\(["']tr/i.test(readFileSync(f, "utf8")), f); });
test("sunucu ifadesi Amerika demez", () => { for (const f of files) assert.ok(!/amerika/i.test(readFileSync(f, "utf8")), f); });
