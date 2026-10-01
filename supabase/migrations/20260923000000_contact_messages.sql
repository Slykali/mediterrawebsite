-- Contact form inbox.
--
-- RLS is on with no policies, so the anon and authenticated roles can neither
-- read nor write this table. The only way in is the server action, which uses
-- the service role (bypasses RLS) and never runs in the browser.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  interest text not null check (interest in ('crew', 'sponsor', 'mentor', 'other')),
  message text not null check (char_length(message) between 1 and 4000)
);

alter table public.contact_messages enable row level security;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
