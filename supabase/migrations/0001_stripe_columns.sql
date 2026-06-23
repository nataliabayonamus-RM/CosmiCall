alter table accesos
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists plan text;

create index if not exists accesos_stripe_customer_id_idx on accesos (stripe_customer_id);
