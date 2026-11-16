import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dict, isLang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? dict[lang].privacy.title : "Privacy" };
}

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const p = dict[lang].privacy;
  return (
    <div className="wrap" style={{ padding: "48px 16px", maxWidth: 760 }}>
      <h1 style={{ fontSize: 36 }}>{p.title}</h1>
      <section style={{ padding: "12px 0" }}><h2 style={{ fontSize: 20 }}>{p.controller.h}</h2><p>{p.controller.p}</p><p><Link href={`/${lang}/contact`}>{p.controller.link}</Link></p></section>
      {p.sections.map((s) => <section key={s.h} style={{ padding: "12px 0" }}><h2 style={{ fontSize: 20 }}>{s.h}</h2><p>{s.p}</p></section>)}
    </div>
  );
}
