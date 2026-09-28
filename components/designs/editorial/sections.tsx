"use client";

import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import {
  CURRENT_SPONSORS,
  PAST_SPONSORS,
  PITCH,
  PULL_QUOTE,
  REGIONAL_COUNT,
  ROBOTS,
  SPONSORS,
  TIMELINE,
  TIMELINE_LABEL,
  finish,
  formatSeasons,
  robotTitle,
  roman,
  spell,
  type Robot,
  type TimelineKind,
} from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
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
  return (
    <section id="timeline" className="border-t border-ink">
      <div className={`${CONTAINER} grid gap-12 py-16 lg:grid-cols-12 lg:py-24`}>
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-10">
            <p className={`text-accent ${KICKER}`}>Chapter I</p>
            <h2 className={`mt-3 ${H2}`}>
              {spell(REGIONAL_COUNT).replace(/^./, (c) => c.toUpperCase())} regionals
              <br />
              <em>since {site.team.rookieYear}</em>
            </h2>
            <p className="mt-6 max-w-xs text-lg leading-snug text-mute italic">
              Every event since the rookie season, from FIRST&rsquo;s own records. The name went from
              Imperium to Lycia and back again before it became Mediterra.
            </p>
          </Reveal>
        </div>

        {/* The margin rule sits in the middle of the gap between year and text. */}
        <ol className="relative lg:col-span-8">
          <span aria-hidden className="absolute top-3 bottom-3 left-[6.25rem] w-px bg-rule sm:left-[8.25rem]" />
          {TIMELINE.map((entry, i) => (
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
                <p className={`text-mute ${KICKER}`}>{TIMELINE_LABEL[entry.kind]}</p>
                <h3 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">{entry.title}</h3>
                <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${i === 0 ? DROP_CAP : ""}`}>{entry.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className={CONTAINER}>
        <Reveal className="border-t border-ink py-12">
          <p className={`text-mute ${KICKER}`}>Fig. 2 &middot; Where we finished</p>
          <FinishChart className="mt-6 text-ink" highlightClassName="text-accent" />
        </Reveal>
        <Reveal>
          <blockquote className="border-t border-ink py-12 text-center font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] italic lg:py-16">
            <span className="text-accent">&ldquo;</span>
            {PULL_QUOTE}
            <span className="text-accent">&rdquo;</span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Chapter II: garage -------------------------------------------------- */

function Plate({ robot, numeral }: { robot: Robot; numeral: string }) {
  return (
    <figure>
      <div className="border border-ink p-2">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-rule bg-canvas">
          {robot.locked ? (
            <>
              <div aria-hidden className="hatch absolute inset-0 text-rule" />
              <span className="relative -rotate-6 border-2 border-accent bg-canvas px-3 py-1 font-mono text-xs tracking-[0.3em] text-accent uppercase">
                Embargoed
              </span>
            </>
          ) : (
            <RobotGlyph kind={robot.kind} draw strokeWidth={1.1} className="w-4/5 text-ink" />
          )}
        </div>
      </div>
      <figcaption className="mt-4">
        <p className={`text-mute ${KICKER}`}>
          Plate {numeral} &middot; {robot.season} &middot; as {robot.teamName}
        </p>
        <p className="mt-2 font-display text-2xl leading-tight">
          {robot.locked ? <em>{robot.game}, withheld until kickoff</em> : robotTitle(robot)}
        </p>
        <p className="mt-2 text-base leading-snug text-mute italic">
          {robot.locked
            ? `The game is revealed on ${site.team.kickoffLong}.`
            : `${[finish(robot), robot.playoffs].filter(Boolean).join(", ")}.`}
        </p>
      </figcaption>
    </figure>
  );
}

export function Garage() {
  return (
    <section id="garage" className="border-t border-ink bg-panel/40">
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <Reveal className="grid gap-6 border-b border-rule pb-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`text-accent ${KICKER}`}>Chapter II</p>
            <h2 className={`mt-3 ${H2}`}>The garage</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-mute lg:col-span-6 lg:col-start-7">
            One robot for every season we competed. The plates are illustrations of a typical machine
            for each year&rsquo;s game, not portraits of ours. Plate {roman(ROBOTS.length)} stays
            covered until {ROBOTS.at(-1)?.game} is revealed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {ROBOTS.map((robot, i) => (
            <Reveal key={robot.season} delay={(i % 3) * 0.06}>
              <Plate robot={robot} numeral={roman(i + 1)} />
            </Reveal>
          ))}

          {/* Fills out the last row of the grid with the pitch. */}
          <Reveal delay={0.12} className={fillLastRow(ROBOTS.length)}>
            <a
              href="#contact"
              className="group flex h-full min-h-56 flex-col justify-between border border-dashed border-ink/50 p-6 transition-colors hover:border-accent"
            >
              <span className={`text-mute ${KICKER}`}>Plate {roman(ROBOTS.length + 1)}</span>
              <span className="font-display text-3xl leading-tight">
                The one you&rsquo;ll help build. <em className="text-accent group-hover:underline">Join the team &rarr;</em>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Chapter III: sponsors ----------------------------------------------- */

export function Backers() {
  const groups = [
    { label: `The ${site.team.lastCompeted} season`, sponsors: CURRENT_SPONSORS },
    { label: "Earlier seasons", sponsors: PAST_SPONSORS },
  ];

  return (
    <section id="backers" className="border-t border-ink">
      <div className={`${CONTAINER} grid gap-10 py-16 lg:grid-cols-12 lg:py-24`}>
        <Reveal className="lg:col-span-5">
          <p className={`text-accent ${KICKER}`}>Chapter III</p>
          <h2 className={`mt-3 ${H2}`}>
            The companies
            <br />
            <em>behind the team</em>
          </h2>
        </Reveal>
        <div className="space-y-8 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className={`text-xl leading-relaxed ${DROP_CAP}`}>
              {site.team.school} has backed the team every season since {site.team.rookieYear}. The
              companies below have backed it too, in the years shown.
            </p>
          </Reveal>
          {PITCH.map((item, i) => (
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
          <p className={`text-mute ${KICKER}`}>Colophon &middot; made possible by</p>
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
        <Reveal>
          <a
            href="#contact"
            className="mt-12 inline-block border-b border-ink pb-1 font-mono text-xs tracking-[0.18em] uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Put your name in the next issue &rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Colophon ------------------------------------------------------------ */

export function Footer() {
  const { team, contact } = site;

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
          <p className={`text-mute ${KICKER}`}>Colophon</p>
          <p className="mt-2 max-w-xs text-base leading-snug italic">
            Set in Instrument Serif and Newsreader. Results from FIRST&rsquo;s event records.
            Published from {team.city}.
          </p>
        </div>
        <nav className={`flex flex-col gap-2 md:items-end ${KICKER}`}>
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
            Email
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
          Back to the cover &uarr;
        </a>
      </div>
    </footer>
  );
}
