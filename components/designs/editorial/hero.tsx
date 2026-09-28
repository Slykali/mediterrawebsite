"use client";

import { motion } from "framer-motion";

import { useBoot } from "@/components/boot/boot-provider";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { NAV, ROBOTS, UNLOCKED_ROBOTS, robotTitle, roman, spell } from "@/lib/content";
import { fadeIn, maskUp, riseIn, stagger } from "@/lib/motion";
import { site } from "@/lib/site";
import { CONTAINER, KICKER, titleCase } from "./ui";

const COVER_LINES = [
  { page: "04", title: "From last place to alliance captain", id: "timeline" },
  { page: "12", title: `The garage: ${spell(UNLOCKED_ROBOTS)} robots and a locked door`, id: "garage" },
  { page: "20", title: "The companies behind the team", id: "backers" },
  { page: "24", title: "Letters: write to us", id: "contact" },
];

/** A magazine cover: masthead, cover story, cover art, cover lines. */
export function Hero() {
  const { booted } = useBoot();
  const { team } = site;
  const volume = roman(team.season - team.rookieYear + 1);
  const cover = ROBOTS.filter((robot) => !robot.locked).at(-1) ?? ROBOTS[0];

  return (
    <motion.header
      id="top"
      variants={stagger(0.08, 0.1)}
      initial="hidden"
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
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
        <span>{team.city}</span>
      </motion.div>

      <div className="overflow-hidden border-b-4 border-double border-ink">
        <motion.h1
          variants={maskUp}
          data-reveal
          className="pt-3 pb-1 text-center font-display text-[clamp(4.5rem,19vw,19rem)] leading-[0.82] tracking-[-0.02em]"
        >
          {titleCase(team.name)}
        </motion.h1>
      </div>

      <motion.div
        variants={fadeIn}
        data-reveal
        className={`flex justify-between gap-4 border-b border-rule py-2 text-mute ${KICKER}`}
      >
        <span>The robotics issue</span>
        <span className="hidden sm:inline">{team.program}</span>
        <span>
          Vol. {volume} &middot; {team.season}
        </span>
      </motion.div>

      <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-14 lg:py-14">
        <div className="flex flex-col lg:col-span-7">
          <motion.p variants={riseIn} data-reveal className={`text-accent ${KICKER}`}>
            Cover story
          </motion.p>
          <motion.h2
            variants={riseIn}
            data-reveal
            className="mt-4 font-display text-[clamp(3.75rem,10vw,9rem)] leading-[0.88] tracking-[-0.02em]"
          >
            We are <em className="text-accent">back.</em>
          </motion.h2>
          <motion.p variants={riseIn} data-reveal className="mt-6 max-w-xl text-xl leading-snug italic sm:text-2xl">
            Team {team.number} has built robots in Döşemealtı since {team.rookieYear}, as Imperium and
            Lycia before it became Mediterra. Last April it captained an alliance in Ankara.
          </motion.p>
          <motion.div
            variants={riseIn}
            data-reveal
            className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-10 font-mono text-xs tracking-[0.16em] uppercase"
          >
            <a href="#contact" className="border-b border-ink pb-1 transition-colors hover:border-accent hover:text-accent">
              Write to us &rarr;
            </a>
            <a href="#backers" className="border-b border-rule pb-1 text-mute transition-colors hover:border-ink hover:text-ink">
              Support the team &rarr;
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.figure variants={riseIn} data-reveal className="border border-ink p-2">
            <div className="border border-rule bg-panel/50 px-4 py-6 sm:px-8">
              <RobotGlyph kind={cover.kind} play={booted} strokeWidth={1.2} className="w-full text-ink" />
            </div>
            <figcaption className={`mt-2 flex justify-between gap-4 text-mute ${KICKER}`}>
              <span>
                Fig. 1 &middot; {robotTitle(cover)}, {cover.season}
              </span>
              <span>Illustration</span>
            </figcaption>
          </motion.figure>

          <motion.ol variants={riseIn} data-reveal className="mt-8 divide-y divide-rule border-y border-rule">
            {COVER_LINES.map((line) => (
              <li key={line.id}>
                <a href={`#${line.id}`} className="group flex items-baseline gap-4 py-3">
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
