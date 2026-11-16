import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { LANGS, dict, isLang } from "@/lib/i18n";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5fb" };

export function generateStaticParams() { return LANGS.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = dict[lang];
  return {
    metadataBase: new URL("https://komshia.org"),
    title: { default: `${d.name} · ${d.tag}`, template: `%s · ${d.name}` },
    description: d.hero.lead,
    alternates: { canonical: `/${lang}`, languages: { bg: "/bg", en: "/en" } },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict[lang];
  const other = lang === "bg" ? "en" : "bg";
  return (
    <html lang={lang} data-theme="light">
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="brand" href={`/${lang}`}>{d.name}</Link>
            <nav aria-label="main">
              <a href={`/${lang}#about`}>{d.nav.about}</a>
              <a href={`/${lang}#work`}>{d.nav.work}</a>
              <a href={`/${lang}#join`}>{d.nav.join}</a>
              <Link href={`/${lang}/contact`}>{d.nav.contact}</Link>
            </nav>
            <div className="ctl">
              <Link href={`/${other}`} hrefLang={other} aria-label={d.footer.lang}>{other.toUpperCase()}</Link>
              <ThemeToggle label={d.footer.theme} />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <span>© 2026 {d.footer.rights}</span>
            <span><Link href={`/${lang}/privacy`}>{d.footer.privacy}</Link> · {d.footer.server}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
