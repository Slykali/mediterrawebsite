"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { pad2, useCountdown } from "@/components/shared/use-countdown";
import {
  PITCH,
  REGIONAL_COUNT,
  ROBOTS,
  SPONSORS,
  TIMELINE,
  finish,
  formatSeasons,
  robotTitle,
  spell,
  type Robot,
  type TimelineKind,
} from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { HUD, MONO, SectionTitle, SkewButton } from "./ui";

/* --- Match log ------------------------------------------------------------ */

const RESULT: Record<TimelineKind, { label: string; tag: string; stripe: string }> = {
  legacy: { label: "Played", tag: "bg-accent-2 text-on-accent", stripe: "bg-accent-2" },
  latest: { label: "Last season", tag: "bg-accent text-on-accent", stripe: "bg-accent" },
  next: { label: "Up next", tag: "border border-accent text-accent", stripe: "bg-accent" },
};

export function Timeline() {
  return (
    <section id="timeline" className="border-t border-rule px-4 py-20 sm:px-6">
      <SectionTitle kicker="Match log">
        {spell(REGIONAL_COUNT)} regionals
        <br />
        <span className="text-mute">since {site.team.rookieYear}</span>
      </SectionTitle>

      <Reveal className="mt-10 border border-rule bg-panel/40 p-4 sm:p-6">
        <p className={`text-mute ${MONO}`}>Best qualification finish per season</p>
        <FinishChart className="mt-4 text-ink" highlightClassName="text-accent" />
      </Reveal>

      <div className="mt-4 border border-rule bg-panel/40">
        <div className={`hidden grid-cols-[9rem_11rem_1fr] gap-6 border-b border-rule px-5 py-2 text-mute md:grid ${MONO}`}>
          <span>Season</span>
          <span>Result</span>
          <span>Summary</span>
        </div>
        {TIMELINE.map((entry) => {
          const result = RESULT[entry.kind];
          return (
            <Reveal
              key={entry.years}
              className="relative grid gap-3 border-b border-rule p-4 pl-6 last:border-b-0 sm:p-5 sm:pl-7 md:grid-cols-[9rem_11rem_1fr] md:items-center md:gap-6"
            >
              <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${result.stripe}`} />
              <span className={`${HUD} text-4xl leading-none`}>{entry.years}</span>
              <span>
                <span className={`inline-flex items-center gap-2 px-2 py-1 ${MONO} ${result.tag}`}>
                  {entry.kind === "next" && <span className="size-1.5 animate-pulse bg-accent" />}
                  {result.label}
                </span>
              </span>
              <div>
                <h3 className={`${HUD} text-2xl`}>{entry.title}</h3>
                <p className="mt-1 max-w-2xl text-base leading-snug text-mute">{entry.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* --- Robot select --------------------------------------------------------- */

function LockedDetail({ robot }: { robot: Robot }) {
  const time = useCountdown(site.team.kickoffISO);
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <span className={`${HUD} text-[clamp(6rem,14vw,10rem)] leading-none text-rule`}>?</span>
      <p className={`${HUD} text-3xl`}>{robot.game} unlocks at kickoff</p>
      <p className={`text-mute ${MONO}`}>
        {time ? `${time.days}d ${pad2(time.hours)}h ${pad2(time.minutes)}m ${pad2(time.seconds)}s` : "--"}
      </p>
    </div>
  );
}

function RobotDetail({ robot }: { robot: Robot }) {
  const rows: [string, string][] = [
    ["Season", String(robot.season)],
    ["Game", robot.game],
    ["Team name", robot.teamName],
  ];

  return (
    <div>
      <div className={`flex justify-between text-mute ${MONO}`}>
        <span>Unit select</span>
        <span>{robot.season}</span>
      </div>
      {robot.locked ? (
        <LockedDetail robot={robot} />
      ) : (
        <>
          <RobotGlyph kind={robot.kind} play strokeWidth={1.4} className="mx-auto my-6 w-full max-w-lg text-ink" />
          <p className={`text-mute ${MONO}`}>Illustration of a typical robot for this game</p>
          <h3 className={`${HUD} mt-2 text-5xl leading-none`}>{robotTitle(robot)}</h3>
          <dl className="mt-5 grid grid-cols-3 border-y border-rule">
            {rows.map(([label, value]) => (
              <div key={label} className="border-r border-rule px-3 py-3 last:border-r-0">
                <dt className={`text-mute ${MONO}`}>{label}</dt>
                <dd className={`${HUD} mt-1 text-lg`}>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-lg leading-snug">{finish(robot)}</p>
          {robot.playoffs && <p className="text-lg leading-snug text-mute">{robot.playoffs}</p>}
        </>
      )}
    </div>
  );
}

export function Garage() {
  const [selected, setSelected] = useState(() => Math.max(0, ROBOTS.findLastIndex((robot) => !robot.locked)));
  const robot = ROBOTS[selected];

  return (
    <section id="garage" className="border-t border-rule px-4 py-20 sm:px-6">
      <SectionTitle kicker="Robot select">Pick a season</SectionTitle>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <div className="grid grid-cols-3 content-start gap-2 sm:grid-cols-4 lg:col-span-5 lg:grid-cols-3">
          {ROBOTS.map((item, i) => {
            const active = i === selected;
            return (
              <button
                key={item.season}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                aria-controls="robot-detail"
                className={`relative flex flex-col items-start gap-2 border p-3 text-left transition-colors ${
                  active ? "border-transparent bg-accent/10" : "border-rule bg-panel hover:border-mute"
                }`}
              >
                <span className={`text-mute ${MONO}`}>{item.season}</span>
                {item.locked ? (
                  <span className={`${HUD} flex h-16 w-full items-center justify-center text-5xl text-mute`}>?</span>
                ) : (
                  <RobotGlyph kind={item.kind} strokeWidth={1.3} className="h-16 w-full text-ink" />
                )}
                <span className={`${HUD} text-base leading-none`}>{item.locked ? "Locked" : robotTitle(item)}</span>
                {active && (
                  <motion.span
                    layoutId="robot-select"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="pointer-events-none absolute -inset-px border-2 border-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div id="robot-detail" className="relative overflow-hidden border border-rule bg-panel p-5 sm:p-8 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={robot.season}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              <RobotDetail robot={robot} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* --- Partners ------------------------------------------------------------- */

export function Backers() {
  return (
    <section id="backers" className="border-t border-rule py-20">
      <div className="px-4 sm:px-6">
        <SectionTitle kicker="Partners">Presented by</SectionTitle>
        <Reveal>
          <p className="mt-4 max-w-xl text-lg leading-snug text-mute">
            {site.team.school} has backed the team every season. These companies have too, in the
            years shown.
          </p>
        </Reveal>
      </div>

      {/* News-crawl ticker, fixed label on the left. */}
      <div className="mt-10 flex items-stretch border-y border-rule bg-panel">
        <span className={`relative z-10 flex shrink-0 items-center bg-accent-2 px-4 text-lg text-on-accent sm:px-6 sm:text-2xl ${HUD}`}>
          Partners
        </span>
        <div className="min-w-0 flex-1 py-3">
          <Marquee baseVelocity={-0.04} repeat={3} itemClassName="">
            {SPONSORS.map((sponsor) => (
              <span key={sponsor.name} className="flex items-center gap-4 px-5">
                <span className={`${HUD} text-2xl sm:text-3xl`}>{sponsor.name}</span>
                <span className={`text-mute ${MONO}`}>{formatSeasons(sponsor.seasons)}</span>
                <span className="size-1.5 bg-accent" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="mt-10 grid gap-3 px-4 sm:px-6 md:grid-cols-3">
        {PITCH.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="border border-rule bg-panel p-5">
            <span className={`text-accent ${MONO}`}>0{i + 1}</span>
            <h3 className={`${HUD} mt-2 text-2xl`}>{item.title}</h3>
            <p className="mt-2 text-base leading-snug text-mute">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 px-4 sm:px-6">
        <SkewButton href="#contact" tone="blue">
          Become a partner
        </SkewButton>
      </div>
    </section>
  );
}

/* --- Footer --------------------------------------------------------------- */

export function Footer() {
  const { team, contact } = site;

  return (
    <footer className="border-t border-rule">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
        <span className={`${HUD} text-3xl`}>
          {team.number} <span className="text-mute">{team.name}</span>
        </span>
        <nav className={`flex flex-wrap gap-5 text-mute ${MONO}`}>
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-ink">
            Email
          </a>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div aria-hidden className="flex h-1.5">
        <span className="flex-1 bg-accent" />
        <span className="flex-1 bg-accent-2" />
      </div>
      <div className={`flex justify-between gap-4 px-4 py-3 text-mute sm:px-6 ${MONO}`}>
        <span>
          &copy; {new Date().getFullYear()} FRC {team.number}
        </span>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}
