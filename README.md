# FRC 6874 Mediterra

The team site. Next.js 15 App Router, Tailwind v4, Framer Motion, a contact
form that writes to Supabase. English at `/`, Turkish at `/tr`. Deploys to
Vercel as-is.

## Run it

```bash
npm install
npm run dev
```

`npm run typecheck` and `npm run build` before you push.

## The design

Matchday: FRC broadcast graphics, red and blue alliance, a kickoff countdown
and a robot select screen. Components never name colours. They use
`bg-canvas`, `text-ink`, `border-rule`, `text-accent` and friends, and the
block at the top of `app/globals.css` decides what those are. Small red or
blue text uses `text-accent-text` / `text-accent-2-text`, which are lifted
enough to pass contrast on the dark background.

The four other designs (Kinetic, Editorial, Blueprint, Hazard) and the picker
that switched between them are in `archive/`. Nothing there is compiled or
shipped; `archive/README.md` says how to bring one back.

## Where things live

```
app/
  layout.tsx             fonts, <html lang>, skip link, boot provider
  page.tsx, tr/page.tsx  home; history/, sponsors/, join/, robot/2026/, privacy/ likewise
  actions.ts             contact form server action
  globals.css            design tokens, textures
  not-found.tsx, sitemap.ts, robots.ts, manifest.ts, llms.txt/, icon.svg, opengraph-image.tsx
components/
  designs/matchday/      index, boot, hero, sections, contact, copy
  designs/registry.ts    the design's parts, used by the subpages
  pages/                 subpage frame and bodies
  boot/                  intro state, overlay shell, counter
  i18n/                  locale provider, language switch, section links
  shared/                marquee, robot drawings, reveals, FAQ, form guards
lib/
  site.ts                team facts, contact, site URL
  content.ts             timeline, robots, sponsors, pitch (en + tr)
  pages.ts               page titles, descriptions, chrome, privacy notice (en + tr)
  cased.tsx              right capitals for Turkish words on English pages and back
  seo.ts                 metadata, hreflang, structured data
supabase/migrations/     contact_messages table
archive/                 the designs that weren't picked
docs/hero-media.md       how to add the hero video
```

## Pages and languages

Same paths in both languages: `/`, `/history`, `/sponsors`, `/join`,
`/robot/2026`, `/privacy`, `/accessibility`, each with a `/tr` twin. The homepage is
the summary that scrolls; the header nav on every page, home included, goes to
the full pages.

- Section text is in `lib/content.ts`, page copy in `lib/pages.ts`, the FAQ in
  `lib/faq.ts`, and Matchday's own wording in
  `components/designs/matchday/copy.ts`. Every string has `en` and `tr`.
- `middleware.ts` sets `<html lang>` from the path.
- CSS uppercase follows the page language, so on `/tr` "Mediterra" would turn
  into "MEDİTERRA". Text set in capitals goes through `<Cased>` (or `cased()`
  on the server), which marks the other language's words. New English names
  with an "i" in them go in the list in `lib/cased.tsx`.

## Contact form

1. Create a Supabase project. Pick the EU (Frankfurt) region.
2. Run `supabase/migrations/20260923000000_contact_messages.sql` in the SQL
   editor (or `supabase db push`).
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` from Project Settings → API.
4. Restart `npm run dev`.

Messages land in `contact_messages`: name, email, chosen option, message,
time. Nothing else is stored. RLS is on with no policies, so the public API
can't read or write the table; only the server action can.

- Spam: a honeypot field, a minimum fill time, and at most three messages per
  email address per hour.
- Retention: every successful submit deletes messages older than 12 months,
  which is what the privacy notice promises.
- Until the keys are set, submitting says "not connected yet" in development
  and points to Instagram in production.

## Accessibility

- The button bottom-left opens the accessibility menu (`components/a11y/`):
  text size, higher contrast, stop animations, underline links, plainer font.
  Settings are saved in localStorage and put on `<html>` as `data-a11y-*`
  attributes before first paint (the script in `lib/a11y.ts`); the CSS for
  them is in `app/globals.css`.
- Text size works by changing the root font size, so **size text in rem**,
  never px.
- Anything that moves on its own must stop when `useMotionOff()` is true.
- `/accessibility` is the statement. Update its date when you re-check.

## Legal

- `/privacy` (`/tr/privacy`) is the KVKK aydınlatma metni. It names the
  school as data controller. **The school's KVKK contact has to approve that
  before launch**, and should own the inbox and the Supabase project.
- The footer carries FIRST's trademark notice, worded as FIRST's policy asks.
- Sponsors appear by name with the seasons they gave. Don't add logos without
  each company's OK, and get the school administration's OK for using the
  school's name.
- No photos of students without written parent consent. See
  `docs/hero-media.md`.
- `next.config.ts` sets a Content-Security-Policy and the usual security
  headers. Everything the site loads is same-origin; if you add a third-party
  embed, add its origin there.

## Where the facts come from

Team history, event results, robot name and sponsors are from the official
FIRST records, checked on 2026-09-28 and again on 2026-10-01:

- https://frc-events.firstinspires.org/team/6874 (one page per season)
- https://www.thebluealliance.com/team/6874/history
- 2027 game and kickoff: https://www.firstinspires.org/programs/frc/game-and-season

The robot line drawings are illustrations of a typical robot for each year's
game, not drawings of the team's machines, and the site says so.

## Before launch

Search for `TODO`. Still missing:

- **Contact email.** Set `NEXT_PUBLIC_CONTACT_EMAIL` in Vercel.
- **School sign-off** on the privacy notice (see Legal).
- **2021 and 2022.** FIRST has no registration for 6874 in those seasons, so
  they have no timeline entry. If the team did something those years, add it
  to `TIMELINE` in `lib/content.ts`.
- **"Bk"** is listed next to MGA Airlines in the 2026 FIRST registration.
  Find out what it is and add it to `SPONSORS`.
- **Robot names.** FIRST only has "MT07", listed for both 2025 and 2026. Only
  2026 shows it.
- **Photos, team logo, hero video.** Real photos would do more than any
  drawing. The favicon is a placeholder (`app/icon.svg`, `lib/icon-art.tsx`).

## Deploy

Import the repo in Vercel. Environment variables:

- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for the form.
- `NEXT_PUBLIC_CONTACT_EMAIL` for the contact address.
- `NEXT_PUBLIC_SITE_URL` only once you add a custom domain. Until then the
  site uses the Vercel production domain automatically.

Turn on Web Analytics in the Vercel project for `@vercel/analytics` to report.
