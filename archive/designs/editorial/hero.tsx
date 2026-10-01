"use client";

import { motion } from "framer-motion";

import { useBoot } from "@/components/boot/boot-provider";
import { LangSwitch } from "@/components/i18n/lang-switch";
import { useContent } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { UNLOCKED_ROBOTS, robotTitle, roman, type SectionId } from "@/lib/content";
import { fadeIn, maskUp, riseIn, stagger } from "@/lib/motion";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { CONTAINER, KICKER, titleCase } from "./ui";

/** A magazine cover: masthead, cover story, cover art, cover lines. */
export function Hero() {
  const { booted, instant } = useBoot();
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  const { team } = site;
  const volume = roman(team.season - team.rookieYear + 1);
  const cover = c.robots.filter((robot) => !robot.locked).at(-1) ?? c.robots[0];

  const coverLines: { page: string; title: string; id: SectionId }[] = [
    { page: "04", title: t.coverLines.timeline, id: "timeline" },
    { page: "12", title: t.coverLines.garage(c.spell(UNLOCKED_ROBOTS)), id: "garage" },
    { page: "20", title: t.coverLines.backers, id: "backers" },
    { page: "24", title: t.coverLines.contact, id: "contact" },
  ];

  return (
    <motion.header
      id="top"
      variants={stagger(0.08, 0.1)}
      initial={instant ? false : "hidden"}
      animate={booted ? "show" : "hidden"}
      className={`${CONTAINER} pt-5`}
    >
      <motion.div
        variants={fadeIn}
        data-reveal
        className={`flex items-center justify-between gap-4 border-b border-ink pb-2 ${KICKER}`}
      >
        <span>N&ordm; {team.number}</span>
        <nav className="hidden gap-6 md:flex">
          {c.nav.map((item) => (
            <a key={item.id} href={href(item.id)} className="transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
        <span className="flex items-center gap-4">
          <span className="hidden sm:inline">{team.city}</span>
          <LangSwitch />
        </span>
      </motion.div>

      <div className="overflow-hidden border-b-4 border-double border-ink">
        <motion.h1
          variants={maskUp}
          data-reveal
          className="pt-3 pb-1 text-center font-display text-[clamp(4.5rem,19vw,19rem)] leading-[0.82] tracking-[-0.02em]"
        >
          <span className="sr-only">FRC {team.number} </span>
          {titleCase(team.name)}
        </motion.h1>
      </div>

      <motion.div
        variants={fadeIn}
        data-reveal
        className={`flex justify-between gap-4 border-b border-rule py-2 text-mute ${KICKER}`}
      >
        <span>{t.robotIssue}</span>
        <span className="hidden sm:inline">{team.program}</span>
        <span>
          {t.vol} {volume} &middot; {team.season}
        </span>
      </motion.div>

      <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-14 lg:py-14">
        <div className="flex flex-col lg:col-span-7">
          <motion.p variants={riseIn} data-reveal className={`text-accent ${KICKER}`}>
            {t.coverStory}
          </motion.p>
          <motion.h2
            variants={riseIn}
            data-reveal
            className="mt-4 font-display text-[clamp(3.75rem,10vw,9rem)] leading-[0.88] tracking-[-0.02em]"
          >
            {t.weAreBack[0]}
            <em className="text-accent">{t.weAreBack[1]}</em>
          </motion.h2>
          <motion.p variants={riseIn} data-reveal className="mt-6 max-w-xl text-xl leading-snug italic sm:text-2xl">
            {t.standfirst}
          </motion.p>
          <motion.div
            variants={riseIn}
            data-reveal
            className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-10 font-mono text-xs tracking-[0.16em] uppercase"
          >
            <a href={href("contact")} className="border-b border-ink pb-1 transition-colors hover:border-accent hover:text-accent">
              {t.writeToUs} &rarr;
            </a>
            <a href={href("backers")} className="border-b border-rule pb-1 text-mute transition-colors hover:border-ink hover:text-ink">
              {t.support} &rarr;
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.figure variants={riseIn} data-reveal className="border border-ink p-2">
            <div className="border border-rule bg-panel/50 px-4 py-6 sm:px-8">
              <RobotGlyph
                kind={cover.kind}
                play={booted}
                strokeWidth={1.2}
                label={c.glyphAlt(cover)}
                className="w-full text-ink"
              />
            </div>
            <figcaption className={`mt-2 flex justify-between gap-4 text-mute ${KICKER}`}>
              <span>
                {t.fig1} &middot; {robotTitle(cover)}, {cover.season}
              </span>
              <span>{t.illustration}</span>
            </figcaption>
          </motion.figure>

          <motion.ol variants={riseIn} data-reveal className="mt-8 divide-y divide-rule border-y border-rule">
            {coverLines.map((line) => (
              <li key={line.id}>
                <a href={href(line.id)} className="group flex items-baseline gap-4 py-3">
                  <span className="font-mono text-xs text-accent">{line.page}</span>
                  <span className="font-display text-2xl leading-tight group-hover:italic">{line.title}</span>
                </a>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </motion.header>
  );
}
