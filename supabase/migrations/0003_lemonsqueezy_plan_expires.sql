alter table accesos
  add column if not exists plan text,
  add column if not exists expires_at timestamptz;
