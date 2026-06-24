alter table accesos
  add column if not exists ls_customer_id text,
  add column if not exists ls_subscription_id text;

create index if not exists accesos_ls_subscription_id_idx on accesos (ls_subscription_id);
