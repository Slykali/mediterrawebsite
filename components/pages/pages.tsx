import Link from "next/link";

import { DESIGNS } from "@/components/designs/registry";
import { JsonLd } from "@/components/shared/json-ld";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { CONTENT, MT07, SPONSORS, formatSeasons } from "@/lib/content";
import { DEFAULT_DESIGN } from "@/lib/designs";
import { localePath, type Locale } from "@/lib/i18n";
import { ACCESSIBILITY, PAGES, PAGE_PATHS, PRIVACY, ROBOT_PAGE, SEASON_TABLE } from "@/lib/pages";
import { faqJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { DesignFrame } from "./design-frame";
import { PageShell } from "./page-shell";

type PageProps = { locale: Locale };

const LABEL = "font-mono text-[0.625rem] tracking-[0.18em] uppercase";
const LINK =
  "group inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors hover:text-accent-text";

/* --- Home ----------------------------------------------------------------- */

export function HomePage({ locale }: PageProps) {
  const id = DEFAULT_DESIGN;
  const { Home } = DESIGNS[id];

  return (
    <DesignFrame id={id}>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(locale)} />
      <Home />
    </DesignFrame>
  );
}

/* --- History -------------------------------------------------------------- */

/** Every season's result in one table. */
function SeasonTable({ locale, pad }: { locale: Locale; pad: string }) {
  const c = CONTENT[locale];
  const t = SEASON_TABLE[locale];
  const seasons = c.robots.filter((robot) => !robot.locked);

  return (
    <section aria-labelledby="season-table" className={`border-b border-rule py-14 sm:py-20 ${pad}`}>
      <h2 id="season-table" className="display-title text-[clamp(2rem,5vw,4rem)] leading-[0.9]">
        {t.caption}
      </h2>
      <p className="mt-4 max-w-xl text-sm text-mute">{t.note}</p>
      {/* Scrolls sideways on phones, so it has to be focusable to scroll with the keyboard. */}
      <div tabIndex={0} className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className={`border-b border-rule text-mute ${LABEL}`}>
              {t.cols.map((col) => (
                <th key={col} scope="col" className="py-3 pr-4 font-normal">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seasons.map((robot) => (
              <tr key={robot.season} className="border-b border-rule align-top">
                <th scope="row" className="py-3 pr-4 font-mono font-normal text-ink">
                  {robot.season}
                </th>
                <td className="py-3 pr-4">{robot.teamName}</td>
                <td className="py-3 pr-4">{robot.game}</td>
                <td className="py-3 pr-4">{robot.event} Regional</td>
                <td className="py-3 pr-4">{robot.rank && robot.teams ? c.rankShort(robot.rank, robot.teams) : "—"}</td>
                <td className="py-3 pr-4 text-mute">{robot.playoffs ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function HistoryPage({ locale }: PageProps) {
  const id = DEFAULT_DESIGN;
  const { Timeline, Garage, pad } = DESIGNS[id];

  return (
    <PageShell locale={locale} page="history" design={id}>
      <SeasonTable locale={locale} pad={pad} />
      <Timeline />
      <Garage />
    </PageShell>
  );
}

/* --- Sponsors ------------------------------------------------------------- */

function SponsorTable({ locale, pad }: { locale: Locale; pad: string }) {
  const en = locale === "en";

  return (
    <section aria-labelledby="sponsor-table" className={`border-b border-rule py-14 sm:py-20 ${pad}`}>
      <h2 id="sponsor-table" className="display-title text-[clamp(2rem,5vw,4rem)] leading-[0.9]">
        {en ? "Every sponsor, by season" : "Sezonlarıyla tüm sponsorlar"}
      </h2>
      <table className="mt-8 w-full max-w-3xl border-collapse text-left text-sm">
        <thead>
          <tr className={`border-b border-rule text-mute ${LABEL}`}>
            <th scope="col" className="py-3 pr-4 font-normal">
              {en ? "Sponsor" : "Sponsor"}
            </th>
            <th scope="col" className="py-3 text-right font-normal">
              {en ? "Seasons" : "Sezonlar"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-rule">
            <th scope="row" className="py-3 pr-4 font-normal text-ink">
              {site.team.school}
            </th>
            <td className="py-3 text-right text-mute">{en ? "Every season" : "Her sezon"}</td>
          </tr>
          {SPONSORS.map((sponsor) => (
            <tr key={sponsor.name} className="border-b border-rule">
              <th scope="row" className="py-3 pr-4 font-normal text-ink">
                {sponsor.name}
              </th>
              <td className="py-3 text-right font-mono text-mute">{formatSeasons(sponsor.seasons)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-8">
        <Link href={localePath(locale, PAGE_PATHS.join)} className={LINK}>
          {en ? "Talk to us about sponsoring" : "Sponsorluk için bize yazın"} <span aria-hidden>&rarr;</span>
        </Link>
      </p>
    </section>
  );
}

export function SponsorsPage({ locale }: PageProps) {
  const id = DEFAULT_DESIGN;
  const { Backers, pad } = DESIGNS[id];

  return (
    <PageShell locale={locale} page="sponsors" design={id}>
      <SponsorTable locale={locale} pad={pad} />
      <Backers />
    </PageShell>
  );
}

/* --- Join ----------------------------------------------------------------- */

export function JoinPage({ locale }: PageProps) {
  const id = DEFAULT_DESIGN;
  const { Contact } = DESIGNS[id];

  return (
    <PageShell locale={locale} page="join" design={id}>
      <Contact />
    </PageShell>
  );
}

/* --- MT07 ----------------------------------------------------------------- */

export function RobotPage({ locale }: PageProps) {
  const id = DEFAULT_DESIGN;
  const { pad } = DESIGNS[id];
  const c = CONTENT[locale];
  const t = ROBOT_PAGE[locale];
  const robot = c.robots.find((r) => r.season === MT07.season)!;
  const next = c.robots.find((r) => r.locked);

  return (
    <PageShell locale={locale} page="robot2026" design={id}>
      <section className={`grid gap-12 border-b border-rule py-14 sm:py-20 lg:grid-cols-12 ${pad}`}>
        <figure className="lg:col-span-7">
          <div className="border border-rule bg-panel/50 p-6 sm:p-10">
            <RobotGlyph kind={robot.kind} strokeWidth={1.3} label={c.glyphAlt(robot)} className="w-full text-ink" />
          </div>
          <figcaption className={`mt-3 text-mute ${LABEL}`}>{t.figure}</figcaption>
        </figure>

        <div className="lg:col-span-5">
          <h2 className="display-title text-[clamp(2rem,4vw,3.5rem)] leading-[0.9]">{t.factsTitle}</h2>
          <dl className="mt-6 divide-y divide-rule border-y border-rule">
            {t.facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                <dt className={`pt-0.5 text-mute ${LABEL}`}>{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className={`mt-4 text-mute ${LABEL}`}>
            {MT07.partners.map((team, i) => (
              <span key={team}>
                {i > 0 && " · "}
                <a
                  href={`https://www.thebluealliance.com/team/${team}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {locale === "en" ? "Team" : "Takım"} {team} &#8599;
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className={`grid gap-8 border-b border-rule py-14 sm:py-20 lg:grid-cols-12 ${pad}`}>
        <h2 className="display-title text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] lg:col-span-4">{t.specsTitle}</h2>
        <div className="space-y-6 lg:col-span-8">
          <p className="max-w-2xl text-sm leading-relaxed text-mute sm:text-base">{t.specsBody}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a href={site.contact.tba} target="_blank" rel="noreferrer" className={LINK}>
              {t.tba} <span aria-hidden>&#8599;</span>
            </a>
            <Link href={localePath(locale, PAGE_PATHS.history)} className={LINK}>
              {PAGES[locale].history.h1} <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          {next && (
            <p className="max-w-2xl border-t border-rule pt-6 text-sm leading-relaxed">
              {t.next}{" "}
              <Link href={localePath(locale, PAGE_PATHS.join)} className="text-accent-text underline underline-offset-4">
                {PAGES[locale].join.h1} &rarr;
              </Link>
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}

/* --- Privacy and accessibility -------------------------------------------- */

/** A page of titled sections: the privacy notice and the accessibility statement. */
function NoticePage({
  locale,
  page,
  t,
}: PageProps & { page: "privacy" | "accessibility"; t: (typeof PRIVACY)[Locale] }) {
  const id = DEFAULT_DESIGN;
  const { pad } = DESIGNS[id];

  return (
    <PageShell locale={locale} page={page} design={id}>
      <div className={`py-14 sm:py-20 ${pad}`}>
        <div className="max-w-3xl divide-y divide-rule border-y border-rule">
          {t.sections.map((section) => (
            <section key={section.title} className="grid gap-3 py-8 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <h2 className={`text-ink ${LABEL} pt-1`}>{section.title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-mute sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className={`mt-6 text-mute ${LABEL}`}>{t.updated}</p>
      </div>
    </PageShell>
  );
}

export function PrivacyPage({ locale }: PageProps) {
  return <NoticePage locale={locale} page="privacy" t={PRIVACY[locale]} />;
}

export function AccessibilityPage({ locale }: PageProps) {
  return <NoticePage locale={locale} page="accessibility" t={ACCESSIBILITY[locale]} />;
}
