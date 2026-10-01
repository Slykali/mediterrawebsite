"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { useContent } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { ThroughLink } from "@/components/shared/through-link";
import {
  REGIONAL_COUNT,
  SPONSORS,
  UNLOCKED_ROBOTS,
  formatSeasons,
  robotTitle,
  type Robot,
  type TimelineKind,
} from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
import { useCopy } from "./copy";
import { ActionBar, H2, LABEL, OUTLINE, Rail } from "./ui";

/* --- Timeline ------------------------------------------------------------ */

const YEAR_TONE: Record<TimelineKind, string> = {
  legacy: "text-ink",
  latest: "text-accent",
  next: "text-ink",
};

function KindDot({ kind }: { kind: TimelineKind }) {
  if (kind === "next") return <span className="size-1.5 animate-pulse bg-accent" />;
  return <span className={`size-1.5 ${kind === "latest" ? "bg-accent" : "bg-ink"}`} />;
}

export function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const c = useContent();
  const t = useCopy();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.75"] });
  // The spine fills as you read down it.
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section ref={ref} id="timeline">
      <Rail index="01" label={t.timeline} meta={`${site.team.rookieYear} → ${site.team.season}`} />
      <div className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className={H2}>
            {t.regionals(c.spell(REGIONAL_COUNT))}
            <br />
            {c.sinceRookie}
          </h2>
        </Reveal>
        <Reveal className="mt-14 max-w-5xl">
          <FinishChart className="text-ink" highlightClassName="text-accent" />
        </Reveal>
      </div>

      <div className="relative">
        <div aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-rule sm:left-6">
          <motion.div style={{ scaleY: fill }} className="h-full w-px origin-top bg-accent" />
        </div>

        <ol>
          {c.timeline.map((entry) => (
            <li key={entry.years} className="border-t border-rule">
              <Reveal className="grid gap-4 py-8 pr-4 pl-10 sm:py-10 sm:pr-6 sm:pl-14 lg:grid-cols-12 lg:gap-6">
                <span
                  className={`font-display text-[clamp(3rem,7vw,6rem)] leading-none uppercase lg:col-span-3 ${YEAR_TONE[entry.kind]}`}
                >
                  {entry.years}
                </span>
                <span className={`flex items-center gap-2 self-start pt-1 text-ink lg:col-span-2 ${LABEL}`}>
                  <KindDot kind={entry.kind} />
                  {c.timelineLabel[entry.kind]}
                </span>
                <div className="lg:col-span-7">
                  <h3 className="font-display text-2xl uppercase sm:text-3xl">{entry.title}</h3>
                  <p className="mt-3 max-w-xl text-xs leading-relaxed text-mute sm:text-sm">{entry.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-rule px-4 py-8 sm:px-6">
        <ThroughLink page="history" />
      </div>
    </section>
  );
}

/* --- Garage -------------------------------------------------------------- */

function RobotCard({ robot }: { robot: Robot }) {
  const c = useContent();
  const t = useCopy();
  return (
    <article className="flex h-full flex-col p-4 sm:p-6">
      <div className={`flex justify-between gap-4 text-mute ${LABEL}`}>
        <span className="text-ink">{robot.season}</span>
        <span>{t.as(robot.teamName)}</span>
      </div>
      <RobotGlyph
        kind={robot.kind}
        label={c.glyphAlt(robot)}
        draw
        className="my-8 w-full text-ink transition-colors duration-300 group-hover:text-accent"
      />
      <h3 className="font-display text-3xl uppercase">{robotTitle(robot)}</h3>
      {robot.robotName && <p className={`mt-1 text-mute ${LABEL}`}>{robot.game}</p>}
      <p className="mt-3 text-xs leading-relaxed text-ink">{c.finish(robot)}</p>
      {robot.playoffs && <p className="mt-1 text-xs leading-relaxed text-mute">{robot.playoffs}</p>}
    </article>
  );
}

function LockedCard({ robot }: { robot: Robot }) {
  const c = useContent();
  const t = useCopy();
  return (
    <article className="relative flex h-full flex-col overflow-hidden bg-panel p-4 sm:p-6">
      <div className={`flex justify-between text-mute ${LABEL}`}>
        <span className="text-ink">{robot.season}</span>
        <span className="flex items-center gap-2 text-accent">
          <span className="size-1.5 animate-pulse bg-accent" />
          {t.locked}
        </span>
      </div>
      <div className="relative my-8 flex flex-1 items-center justify-center">
        <RobotGlyph kind={robot.kind} filled label={c.glyphAlt(robot)} className="w-full max-w-xl text-canvas" />
        <div aria-hidden className="hatch absolute inset-0 text-rule opacity-50" />
        <span aria-hidden className="absolute font-display text-[clamp(4rem,10vw,8rem)] text-rule">
          ?
        </span>
      </div>
      <h3 className="font-display text-3xl uppercase">{robot.game}</h3>
      <p className="mt-3 max-w-md text-xs leading-relaxed text-mute">{t.lockedNote}</p>
    </article>
  );
}

export function Garage() {
  const c = useContent();
  const t = useCopy();
  return (
    <section id="garage">
      <Rail index="02" label={t.garage} meta={t.robots(UNLOCKED_ROBOTS)} />
      <div className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className={H2}>
            {t.everyRobot}
            <br />
            {c.sinceRookie}
          </h2>
        </Reveal>
        <Reveal className="mt-6">
          <p className="max-w-md text-xs leading-relaxed text-mute sm:text-sm">{t.garageNote}</p>
        </Reveal>
      </div>

      <Stagger className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
        {c.robots.map((robot) => (
          <StaggerItem
            key={robot.season}
            className={`group border-b border-rule sm:border-r ${robot.locked ? fillLastRow(UNLOCKED_ROBOTS) : ""}`}
          >
            {robot.locked ? <LockedCard robot={robot} /> : <RobotCard robot={robot} />}
          </StaggerItem>
        ))}
      </Stagger>

      <div className="px-4 py-8 sm:px-6">
        <ThroughLink page="robot2026" />
      </div>
    </section>
  );
}

/* --- Sponsors ------------------------------------------------------------ */

export function Backers() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  return (
    <section id="backers">
      <Rail index="03" label={t.sponsors} meta={t.companiesSince(SPONSORS.length)} />
      <div className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className={H2}>{t.sponsors}</h2>
        </Reveal>
        <Reveal className="mt-6">
          <p className="max-w-lg text-xs leading-relaxed text-mute sm:text-sm">{t.sponsorsNote}</p>
        </Reveal>
        <div className="mt-8">
          <ThroughLink page="sponsors" />
        </div>
      </div>

      <div className="space-y-4 border-t border-rule py-8">
        <Marquee baseVelocity={-0.035} repeat={3} itemClassName="">
          {SPONSORS.map((sponsor) => (
            <span key={sponsor.name} className="flex items-center">
              <span
                className={`px-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none uppercase sm:px-10 ${OUTLINE}`}
              >
                {sponsor.name}
              </span>
              <span className="size-2 bg-accent" />
            </span>
          ))}
        </Marquee>
        <Marquee baseVelocity={0.03} repeat={3} itemClassName="">
          {SPONSORS.map((sponsor) => (
            <span key={sponsor.name} className={`flex items-center gap-3 px-6 text-mute sm:px-10 ${LABEL}`}>
              <span className="text-ink">{sponsor.name}</span>
              {formatSeasons(sponsor.seasons)}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="grid border-t border-rule md:grid-cols-3">
        {c.pitch.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.06}
            className="border-b border-rule p-4 sm:p-6 md:border-r md:border-b-0 md:last:border-r-0"
          >
            <span className={`text-mute ${LABEL}`}>0{i + 1}</span>
            <h3 className="mt-2 font-display text-2xl uppercase">{item.title}</h3>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-mute">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <Stagger className="border-t border-rule">
        <ActionBar href={href("contact")} label={t.sponsorTeam} />
      </Stagger>
    </section>
  );
}

/* --- Footer -------------------------------------------------------------- */

export function Footer() {
  const { team, contact } = site;
  const c = useContent();

  return (
    <footer className="border-t border-rule">
      <div className="py-8">
        <Marquee
          baseVelocity={-0.08}
          className={`font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] uppercase ${OUTLINE}`}
        >
          {`${team.number} · ${team.name} ·`}
        </Marquee>
      </div>
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-t border-rule px-4 py-4 text-mute sm:px-6 ${LABEL}`}
      >
        <span>
          &copy; {new Date().getFullYear()} FRC {team.number} {team.name}
        </span>
        <nav className="flex flex-wrap gap-5">
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-ink">
            {c.email}
          </a>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="transition-colors hover:text-ink">
          {c.backToTop} &uarr;
        </a>
      </div>
    </footer>
  );
}
