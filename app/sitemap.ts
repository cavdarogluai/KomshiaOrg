import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/i18n";

const BASE = "https://komshia.org";
const PAGES = ["", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) =>
    LANGS.map((l) => ({
      url: `${BASE}/${l}${p}`,
      lastModified: new Date("2026-11-16"),
      alternates: { languages: Object.fromEntries(LANGS.map((x) => [x, `${BASE}/${x}${p}`])) },
    })),
  );
}
