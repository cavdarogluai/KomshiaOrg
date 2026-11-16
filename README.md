# komshia.org

Komshia Vakfı / Foundation (Burgas, Bulgaristan) sitesi. Next.js 15, Neon (Frankfurt), Vercel (Frankfurt, fra1), alan adı Cloudflare'de.

- Diller: bg (varsayılan), en. Gündüz modu varsayılan.
- İletişim yalnız form (`/api/contact`): bal küpü, sunucu mührü (≥3 sn), enjeksiyon kalıbı, IP 10/saat, e-posta 5/gün. `mailto:` yok.
- Giriş yok (hesap gerekirse yalnız SocialID).
- Env: `DATABASE_URL`, `FORM_SECRET` (`.env.example`). Şema: `db/001_contact.sql`.
- Yayın: `vercel.json` git otomatik deploy kapalı; canlıya yayın (musluk) Mehmet onayıyla.
- Kapılar: `npm test` (`scripts/kapilar.test.mjs`).
