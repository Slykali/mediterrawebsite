"use client";

import { useContent, useLocale } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { ThroughLink } from "@/components/shared/through-link";
import {
  CURRENT_SPONSORS,
  PAST_SPONSORS,
  REGIONAL_COUNT,
  SPONSORS,
  formatSeasons,
  robotTitle,
  roman,
  sentence,
  type Robot,
  type TimelineKind,
} from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
import { useCopy } from "./copy";
import { CONTAINER, DROP_CAP, H2, KICKER, titleCase } from "./ui";

/* --- Chapter I: timeline ------------------------------------------------- */

const YEAR_TONE: Record<TimelineKind, string> = {
  legacy: "",
  latest: "italic text-accent",
  next: "",
};

const DOT_TONE: Record<TimelineKind, string> = {
  legacy: "border-ink bg-canvas",
  latest: "border-accent bg-accent",
  next: "border-ink bg-ink",
};

export function Timeline() {
  const c = useContent();
  const t = useCopy();
  const locale = useLocale();
  const count = c.spell(REGIONAL_COUNT).replace(/^./, (ch) => ch.toLocaleUpperCase(locale));

  return (
    <section id="timeline" className="border-t border-ink">
      <div className={`${CONTAINER} grid gap-12 py-16 lg:grid-cols-12 lg:py-24`}>
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-10">
            <p className={`text-accent ${KICKER}`}>{t.chapter} I</p>
            <h2 className={`mt-3 ${H2}`}>
              {t.regionals(count)}
              <br />
              <em>{c.sinceRookie}</em>
            </h2>
            <p className="mt-6 max-w-xs text-lg leading-snug text-mute italic">{t.timelineNote}</p>
          </Reveal>
        </div>

        {/* The margin rule sits in the middle of the gap between year and text. */}
        <ol className="relative lg:col-span-8">
          <span aria-hidden className="absolute top-3 bottom-3 left-[6.25rem] w-px bg-rule sm:left-[8.25rem]" />
          {c.timeline.map((entry, i) => (
            <li
              key={entry.years}
              className="relative grid grid-cols-[5.5rem_1fr] gap-6 pb-12 last:pb-0 sm:grid-cols-[7.5rem_1fr]"
            >
              <span
                aria-hidden
                className={`absolute top-3 left-[6.25rem] size-2.5 -translate-x-1/2 rounded-full border sm:left-[8.25rem] ${DOT_TONE[entry.kind]}`}
              />
              <Reveal>
                <span className={`block text-right font-display text-3xl leading-none sm:text-4xl ${YEAR_TONE[entry.kind]}`}>
                  {entry.years}
                </span>
              </Reveal>
              <Reveal delay={0.05} className="pl-4">
                <p className={`text-mute ${KICKER}`}>{c.timelineLabel[entry.kind]}</p>
                <h3 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">{entry.title}</h3>
                <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${i === 0 ? DROP_CAP : ""}`}>{entry.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className={CONTAINER}>
        <Reveal className="border-t border-ink py-12">
          <p className={`text-mute ${KICKER}`}>{t.fig2}</p>
          <FinishChart className="mt-6 text-ink" highlightClassName="text-accent" />
        </Reveal>
        <Reveal>
          <blockquote className="border-t border-ink py-12 text-center font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] italic lg:py-16">
            <span className="text-accent">&ldquo;</span>
            {c.pullQuote}
            <span className="text-accent">&rdquo;</span>
          </blockquote>
        </Reveal>
        <div className="pb-12 text-center">
          <ThroughLink page="history" />
        </div>
      </div>
    </section>
  );
}

/* --- Chapter II: garage -------------------------------------------------- */

function Plate({ robot, numeral }: { robot: Robot; numeral: string }) {
  const c = useContent();
  const t = useCopy();

  return (
    <figure>
      <div className="border border-ink p-2">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-rule bg-canvas">
          {robot.locked ? (
            <>
              <div aria-hidden className="hatch absolute inset-0 text-rule" />
              <span className="relative -rotate-6 border-2 border-accent bg-canvas px-3 py-1 font-mono text-xs tracking-[0.3em] text-accent uppercase">
                {t.embargoed}
              </span>
            </>
          ) : (
            <RobotGlyph kind={robot.kind} draw strokeWidth={1.1} label={c.glyphAlt(robot)} className="w-4/5 text-ink" />
          )}
        </div>
      </div>
      <figcaption className="mt-4">
        <p className={`text-mute ${KICKER}`}>
          {t.plate} {numeral} &middot; {robot.season} &middot; {t.as(robot.teamName)}
        </p>
        <p className="mt-2 font-display text-2xl leading-tight">
          {robot.locked ? <em>{t.withheld(robot.game)}</em> : robotTitle(robot)}
        </p>
        <p className="mt-2 text-base leading-snug text-mute italic">
          {robot.locked ? t.revealed : sentence([c.finish(robot), robot.playoffs].filter(Boolean).join(", "))}
        </p>
      </figcaption>
    </figure>
  );
}

export function Garage() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();

  return (
    <section id="garage" className="border-t border-ink bg-panel/40">
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <Reveal className="grid gap-6 border-b border-rule pb-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`text-accent ${KICKER}`}>{t.chapter} II</p>
            <h2 className={`mt-3 ${H2}`}>{t.garage}</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-mute lg:col-span-6 lg:col-start-7">
            {t.garageNote(roman(c.robots.length), c.robots.at(-1)?.game ?? "")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {c.robots.map((robot, i) => (
            <Reveal key={robot.season} delay={(i % 3) * 0.06}>
              <Plate robot={robot} numeral={roman(i + 1)} />
            </Reveal>
          ))}

          {/* Fills out the last row of the grid with the pitch. */}
          <Reveal delay={0.12} className={fillLastRow(c.robots.length)}>
            <a
              href={href("contact")}
              className="group flex h-full min-h-56 flex-col justify-between border border-dashed border-ink/50 p-6 transition-colors hover:border-accent"
            >
              <span className={`text-mute ${KICKER}`}>
                {t.plate} {roman(c.robots.length + 1)}
              </span>
              <span className="font-display text-3xl leading-tight">
                {t.youllBuild} <em className="text-accent group-hover:underline">{t.joinTeam} &rarr;</em>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14">
          <ThroughLink page="robot2026" />
        </div>
      </div>
    </section>
  );
}

/* --- Chapter III: sponsors ----------------------------------------------- */

export function Backers() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  const groups = [
    { label: t.seasonGroup(site.team.lastCompeted), sponsors: CURRENT_SPONSORS },
    { label: t.earlier, sponsors: PAST_SPONSORS },
  ];

  return (
    <section id="backers" className="border-t border-ink">
      <div className={`${CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:py-24`}>
        <Reveal className="lg:col-span-5">
          <p className={`text-accent ${KICKER}`}>{t.chapter} III</p>
          <h2 className={`mt-3 ${H2}`}>
            {t.companies[0]}
            <br />
            <em>{t.companies[1]}</em>
          </h2>
        </Reveal>
        <div className="space-y-8 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className={`text-xl leading-relaxed ${DROP_CAP}`}>{t.backersNote}</p>
          </Reveal>
          {c.pitch.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <h3 className={`text-mute ${KICKER}`}>{item.title}</h3>
              <p className="mt-2 text-lg leading-relaxed">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-y border-rule py-6">
        <Marquee baseVelocity={-0.03} repeat={3} itemClassName="">
          {SPONSORS.map((sponsor) => (
            <span key={sponsor.name} className="flex items-center">
              <span className="px-8 font-display text-[clamp(2rem,4.5vw,3.75rem)] italic">{sponsor.name}</span>
              <span aria-hidden className="text-2xl text-accent">
                &#10086;
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className={`${CONTAINER} py-14`}>
        <Reveal>
          <p className={`text-mute ${KICKER}`}>{t.madePossible}</p>
        </Reveal>
        <dl className="mt-6 grid gap-10 sm:grid-cols-2">
          {groups.map((group) => (
            <Reveal key={group.label}>
              <dt className={`text-accent ${KICKER}`}>{group.label}</dt>
              <dd className="mt-3 space-y-2">
                {group.sponsors.map((sponsor) => (
                  <span key={sponsor.name} className="flex items-baseline justify-between gap-6 border-b border-rule pb-2">
                    <span className="font-display text-2xl">{sponsor.name}</span>
                    <span className="font-mono text-xs text-mute">{formatSeasons(sponsor.seasons)}</span>
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
        <Reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          <a
            href={href("contact")}
            className="inline-block border-b border-ink pb-1 font-mono text-xs tracking-[0.18em] uppercase transition-colors hover:border-accent hover:text-accent"
          >
            {t.nextIssue} &rarr;
          </a>
          <ThroughLink page="sponsors" />
        </Reveal>
      </div>
    </section>
  );
}

/* --- Colophon ------------------------------------------------------------ */

export function Footer() {
  const { team, contact } = site;
  const c = useContent();
  const t = useCopy();

  return (
    <footer className="border-t-4 border-double border-ink">
      <div className={`${CONTAINER} grid gap-8 py-10 md:grid-cols-3`}>
        <div>
          <p className="font-display text-5xl">{titleCase(team.name)}</p>
          <p className={`mt-2 text-mute ${KICKER}`}>
            N&ordm; {team.number} &middot; {team.program}
          </p>
        </div>
        <div>
          <p className={`text-mute ${KICKER}`}>{t.colophon}</p>
          <p className="mt-2 max-w-xs text-base leading-snug italic">{t.colophonNote}</p>
        </div>
        <nav className={`flex flex-col gap-2 md:items-end ${KICKER}`}>
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
            {c.email}
          </a>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={`${CONTAINER} flex justify-between gap-4 border-t border-rule py-3 text-mute ${KICKER}`}>
        <span>
          &copy; {new Date().getFullYear()} FRC {team.number}
        </span>
        <a href="#top" className="transition-colors hover:text-ink">
          {t.backToCover} &uarr;
        </a>
      </div>
    </footer>
  );
}
