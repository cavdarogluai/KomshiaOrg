"use client";
import { useState } from "react";
import { TOPICS, dict, type Lang } from "@/lib/i18n";

export default function ContactForm({ lang, seal }: { lang: Lang; seal: string }) {
  const t = dict[lang].contact;
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err" | "limit" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(f.entries()), lang, seal }),
      });
      setState(r.status === 200 ? "ok" : r.status === 429 ? "limit" : r.status === 400 ? "invalid" : "err");
      if (r.status === 200) (e.target as HTMLFormElement).reset();
    } catch {
      setState("err");
    }
  }

  const msg = state === "ok" ? t.ok : state === "limit" ? t.limit : state === "invalid" ? t.invalid : state === "err" ? t.err : "";
  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <label>{t.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
      <label>{t.email}<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label>{t.topic}
        <select name="topic" defaultValue="other">
          {TOPICS.map((k) => <option key={k} value={k}>{t.topics[k]}</option>)}
        </select>
      </label>
      <label>{t.message}<textarea name="message" required minLength={10} maxLength={4000} /></label>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="check"><input type="checkbox" required /> <span>{t.consent}</span></label>
      <button className="btn primary" type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.send}</button>
      {msg && <p role="status" className={`status ${state === "ok" ? "ok" : "bad"}`}>{msg}</p>}
    </form>
  );
}
