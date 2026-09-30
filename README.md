# FRC 6874 — Reboot

Team site. Five complete designs you can switch between live, one shared set of
content, a contact form that writes to Supabase. Next.js 15 App Router,
Tailwind v4, Framer Motion. Deploys to Vercel as-is.

## Run it

```bash
npm install
npm run dev
```

`npm run typecheck` and `npm run build` before you push.

## The five designs

| #  | Name      | What it is                                                                 |
| -- | --------- | -------------------------------------------------------------------------- |
| 01 | Kinetic   | Giant moving type, scroll-reactive. Carbon, bone, hazard orange.           |
| 02 | Editorial | A printed magazine: masthead, chapters, plates, a fill-in-the-blanks letter. |
| 03 | Blueprint | An engineering drawing sheet: title block, revision history, redlines.     |
| 04 | Hazard    | Brutalist safety yellow and black. Asset tags with barcodes.               |
| 05 | Matchday  | FRC broadcast graphics. Live kickoff countdown, robot select screen.       |

Every design has every section: hero, timeline, garage (with a locked 2027
robot), sponsors marquee, contact form, footer. Each has its own intro.

### Picking one

The picker sits bottom-right. Click through, use the ‹ › arrows, or press
`1`–`5`. Switching keeps you on the section you were reading. "Replay intro"
plays the current design's boot sequence again.

`?design=blueprint` in the URL works too, so you can send a link to a specific
design.

### Locking it in for launch

In `lib/designs.ts`:

```ts
export const DEFAULT_DESIGN: DesignId = "blueprint"; // whichever you picked
export const SHOW_DESIGN_SWITCHER = false;
```

With the switcher off, the picker disappears and `?design=` / the cookie are
ignored — every visitor gets the default.

Then trim what you don't ship (all five designs share one ~27 KB gzipped chunk
until you do):

1. Delete the unused folders in `components/designs/`.
2. Remove their lines from `components/designs/registry.ts` and their ids from
   `DESIGN_IDS` / `DESIGN_META` in `lib/designs.ts`.
3. Remove their fonts from `app/layout.tsx`, and set `preload: true` on the
   fonts your design uses.
4. Delete their `[data-design="…"]` block in `app/globals.css`.

## Where things live

```
app/
  page.tsx               picks the design (?design= > cookie > default)
  layout.tsx             fonts for every design, boot provider
  actions.ts             contact form server action
  globals.css            one token block per design, textures
  not-found.tsx, sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
components/
  designs/<name>/        index, boot, hero, sections, contact — one folder per design
  designs/registry.ts    id -> component
  boot/                  shared intro state, overlay shell, counter
  shared/                marquee, robot line drawings, reveals, picker, form guards
lib/
  site.ts                team facts: number, season, kickoff, contact
  content.ts             timeline, robots, sponsors, pitch — shared by all designs
  designs.ts             design list, default, switcher flag
  contact.ts             form fields and types
  supabase/admin.ts      server-only client
supabase/migrations/     contact_messages table
public/media/            hero video (see the README in there)
```

Components never name colours. They use `bg-canvas`, `text-ink`,
`border-rule`, `text-accent` and friends; each design's block in `globals.css`
decides what those are.

## Pages and languages

English lives at the root, Turkish under `/tr`, with the same paths in both:
`/`, `/history`, `/sponsors`, `/join`, `/robot/2026`. Subpages reuse the active
design's own sections inside a shared frame (`components/pages/`).

- Section text is in `lib/content.ts`, page titles and descriptions in
  `lib/pages.ts`, the FAQ in `lib/faq.ts`, and each design's own wording in
  `components/designs/<name>/copy.ts`. Every string has an `en` and a `tr`
  version.
- `middleware.ts` sets `<html lang>` from the path.
- Metadata, canonicals, hreflang and structured data come from `lib/seo.ts`.
  `sitemap.xml`, `robots.txt`, `llms.txt` and the social images are generated
  from the same data.

## Contact form

1. Create a Supabase project.
2. Run `supabase/migrations/20260923000000_contact_messages.sql` in the SQL
   editor (or `supabase db push`).
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` from Project Settings → API.
4. Restart `npm run dev`.

Messages land in `contact_messages`. RLS is on with no policies, so the public
API can't read or write the table; only the server action can. Spam protection
is a honeypot field plus a minimum fill time.

Until the keys are set, submitting shows a "not connected yet" message in
development and a fallback email address in production.

## Where the facts come from

Team history, event results, robot name and sponsors are taken from FIRST's
own records, checked on 2026-09-28:

- https://frc-events.firstinspires.org/team/6874 (one page per season)
- https://www.thebluealliance.com/team/6874/history
- 2027 game and kickoff: https://www.firstinspires.org/programs/frc/game-and-season

The robot line drawings are illustrations of a typical robot for each year's
game, not drawings of the team's machines, and every design says so.

## Before launch

Search for `TODO`. What's still missing:

- **Contact email** and **production URL** in `lib/site.ts`.
- **2021 and 2022.** FIRST has no registration for 6874 in those seasons, so
  they have no timeline entry. If the team did something those years, add it
  to `TIMELINE` in `lib/content.ts`.
- **"Bk"** is listed next to MGA Airlines in the 2026 FIRST registration.
  Find out what it is and add it to `SPONSORS`.
- **Robot names.** FIRST only has "MT07", listed for both 2025 and 2026. Only
  2026 shows it.
- **Photos.** Real robot and team photos would do more than any drawing.
- **Team colours.** Each design's accent is in its block in `app/globals.css`.
- **Hero video.** Add the loop to `public/media/`, then set `HAS_HERO_MEDIA =
  true` in `lib/site.ts`. Kinetic and Matchday use it.

## Deploy

Push to GitHub, import the repo in Vercel, and add these environment variables:

- `NEXT_PUBLIC_SITE_URL`: the production domain, e.g. `https://yourdomain.com`
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

Turn on Web Analytics in the Vercel project for `@vercel/analytics` to report.
