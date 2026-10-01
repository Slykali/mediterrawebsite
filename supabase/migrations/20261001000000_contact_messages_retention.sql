-- The privacy notice says messages are deleted 12 months after they arrive.
-- The server action also prunes on every submit; this covers quiet months.
-- pg_cron is available on every Supabase project (Database > Extensions).

create extension if not exists pg_cron;

select cron.schedule(
  'contact-messages-retention',
  '0 3 * * *',
  $$delete from public.contact_messages where created_at < now() - interval '12 months'$$
);
