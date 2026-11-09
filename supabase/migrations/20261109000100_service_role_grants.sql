-- The production project (mediterra6874, created 9 November 2026) has
-- "Automatically expose new tables" turned off, so new tables get no Data API
-- grants. The server routes use the service role; give it exactly what they
-- need. anon and authenticated still get nothing, and RLS stays on.

grant select, insert, delete on table public.contact_messages to service_role;
grant select, insert, delete on table public.climate_survey_responses to service_role;
