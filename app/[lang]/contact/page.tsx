import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { dict, isLang } from "@/lib/i18n";
import { makeSeal } from "@/lib/seal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? dict[lang].contact.title : "Contact" };
}

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = dict[lang].contact;
  return (
    <div className="wrap" style={{ padding: "48px 16px" }}>
      <h1 style={{ fontSize: 36 }}>{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <ContactForm lang={lang} seal={makeSeal()} />
    </div>
  );
}
