import Link from "next/link";
import { notFound } from "next/navigation";
import Street from "@/components/Street";
import { dict, isLang } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict[lang];
  return (
    <>
      <div className="wrap hero">
        <p className="tag">{d.tag}</p>
        <h1>{d.hero.title}</h1>
        <p className="lead">{d.hero.lead}</p>
        <div className="btns">
          <a className="btn primary" href="#join">{d.hero.cta}</a>
          <Link className="btn ghost" href={`/${lang}/contact`}>{d.hero.cta2}</Link>
        </div>
        <Street />
      </div>
      <section id="about"><div className="wrap">
        <h2>{d.about.title}</h2>
        <p>{d.about.p1}</p>
        <p>{d.about.p2}</p>
        <p className="note">{d.about.status}</p>
      </div></section>
      <section id="work"><div className="wrap">
        <h2>{d.work.title}</h2>
        <div className="grid">
          {d.work.items.map((i) => <div className="card" key={i.t}><h3>{i.t}</h3><p>{i.d}</p></div>)}
        </div>
      </div></section>
      <section id="join"><div className="wrap">
        <h2>{d.join.title}</h2>
        <p>{d.join.lead}</p>
        <div className="grid">
          {d.join.cards.map((i) => (
            <Link className="card door" key={i.t} href={`/${lang}/contact`} style={{ textDecoration: "none" }}>
              <h3>{i.t}</h3><p>{i.d}</p>
            </Link>
          ))}
        </div>
      </div></section>
    </>
  );
}
