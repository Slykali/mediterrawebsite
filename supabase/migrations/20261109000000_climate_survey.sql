-- Climate feelings survey (mediterra6874.com/anket), backup copy.
--
-- The main record is the Google Sheet behind the Apps Script web app; the API
-- route writes every answer to both. Anonymous: an age, one of six feelings,
-- which poster's QR code was scanned, and the page language. No name, email or IP.
--
-- RLS on with no policies, like contact_messages: only the server route, using
-- the service role, can read or write.

create table if not exists public.climate_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  age smallint not null check (age between 1 and 120),
  feeling text not null check (feeling in ('pessimism', 'fear', 'helplessness', 'anxiety', 'anger', 'guilt')),
  poster text check (poster is null or poster in ('pessimism', 'fear', 'helplessness', 'anxiety', 'anger', 'guilt')),
  locale text not null default 'tr' check (locale in ('tr', 'en'))
);

alter table public.climate_survey_responses enable row level security;

create index if not exists climate_survey_responses_created_at_idx
  on public.climate_survey_responses (created_at desc);
