-- komshia.org iletişim formu. Neon'a uygulama: Mehmet onayıyla.
CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  lang        TEXT NOT NULL CHECK (lang IN ('bg','en')),
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email       TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  topic       TEXT NOT NULL CHECK (topic IN ('volunteer','partner','help','press','other')),
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  ip_hash     TEXT
);
CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC);
