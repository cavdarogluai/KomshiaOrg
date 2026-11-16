"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("theme"); } catch {}
    const d = saved === "dark"; // varsayılan her zaman gündüz
    setDark(d);
    document.documentElement.dataset.theme = d ? "dark" : "light";
  }, []);
  function toggle() {
    const d = !dark;
    setDark(d);
    document.documentElement.dataset.theme = d ? "dark" : "light";
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch {}
  }
  return <button type="button" onClick={toggle} aria-pressed={dark} aria-label={label} title={label}>{dark ? "☾" : "☀"}</button>;
}
