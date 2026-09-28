"use client";

import { motion } from "framer-motion";

import { useBoot } from "@/components/boot/boot-provider";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { EASE_OUT, fadeIn, riseIn, stagger } from "@/lib/motion";
import { site } from "@/lib/site";
import { CURRENT_REV, MONO, PAD } from "./ui";

const NAV = [
  { id: "timeline", label: "Revisions" },
  { id: "garage", label: "Details" },
  { id: "backers", label: "Suppliers" },
  { id: "contact", label: "RFI" },
];

const CALLOUTS = ["Shooter / flywheel", "Hopper", "Bumper, team number", "Drive module ×4"];

/** Balloon position, then the point on the robot its leader lands on. */
const BALLOONS: [number, number, number, number][] = [
  [128, 20, 148, 48],
  [18, 44, 42, 68],
  [229, 100, 212, 120],
  [12, 124, 44, 146],
];

/** A hand-drawn redline loop around a word, drawn on after boot. */
function Redline({ play }: { play: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-[18%] -left-[10%] h-[136%] w-[124%] overflow-visible text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <motion.path
        d="M22 58C16 22 92 6 152 14C198 20 200 72 160 86C110 102 28 96 12 70C4 54 20 38 44 32"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** General arrangement drawing: the robot plus numbered balloons and a dimension. */
function Drawing({ play }: { play: boolean }) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  });

  return (
    <figure>
      <div className="relative border border-ink/40 p-4 sm:p-8">
        <span className={`absolute top-2 left-3 text-mute ${MONO}`}>View A &middot; typical shooter robot, illustration</span>
        <div className="relative mt-4">
          <RobotGlyph kind="shooter" play={play} strokeWidth={1.25} className="w-full text-ink" />
          {/* Stroke width is in viewBox units: vector-effect would break pathLength. */}
          <svg viewBox="0 0 240 180" className="absolute inset-0 h-full w-full text-accent" fill="none" stroke="currentColor" strokeWidth="0.55" aria-hidden>
            {BALLOONS.map(([bx, by, tx, ty], i) => (
              <g key={i}>
                <motion.path d={`M${bx} ${by}L${tx} ${ty}`} {...draw(1 + i * 0.12)} />
                <motion.circle cx={bx} cy={by} r="7" {...draw(1 + i * 0.12)} />
                <motion.text
                  x={bx}
                  y={by + 2.6}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="currentColor"
                  stroke="none"
                  className="font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: play ? 1 : 0 }}
                  transition={{ delay: 1.3 + i * 0.12 }}
                >
                  {i + 1}
                </motion.text>
              </g>
            ))}
            <motion.path d="M20 144V176M220 144V176M20 172H108M132 172H220M20 172l6 -2.5v5ZM220 172l-6 -2.5v5Z" {...draw(1.5)} />
            <motion.text
              x="120"
              y="174.5"
              textAnchor="middle"
              fontSize="6.5"
              fill="currentColor"
              stroke="none"
              className="font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: play ? 1 : 0 }}
              transition={{ delay: 1.7 }}
            >
              OA
            </motion.text>
          </svg>
        </div>
      </div>
      <figcaption className={`mt-3 grid gap-1 text-mute sm:grid-cols-2 ${MONO}`}>
        {CALLOUTS.map((label, i) => (
          <span key={label}>
            <span className="text-accent">{i + 1}</span> &mdash; {label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function TitleBlock() {
  const { team } = site;
  const cell = "border-r border-b border-ink/50 px-3 py-2";
  const label = "block text-[9px] text-mute";
  const value = "mt-0.5 block text-[11px] text-ink";

  return (
    <div className="grid grid-cols-2 border-t border-l border-ink/50 font-mono tracking-[0.12em] uppercase">
      <div className={`${cell} col-span-2`}>
        <span className={label}>Title</span>
        <span className="mt-0.5 block text-xs text-ink">
          Team {team.number} &middot; {team.season} build ({team.game})
        </span>
      </div>
      <div className={`${cell} col-span-2`}>
        <span className={label}>School</span>
        <span className={value}>{team.school}</span>
      </div>
      <div className={cell}>
        <span className={label}>Drawn by</span>
        <span className={value}>{team.name}</span>
      </div>
      <div className={cell}>
        <span className={label}>Rookie year</span>
        <span className={value}>{team.rookieYear}</span>
      </div>
      <div className={cell}>
        <span className={label}>Last robot</span>
        <span className={value}>MT07, {team.lastCompeted}</span>
      </div>
      <div className={cell}>
        <span className={label}>Last finish</span>
        <span className={value}>7th of 33, captain</span>
      </div>
      <div className={cell}>
        <span className={label}>Kickoff</span>
        <span className={value}>{team.kickoff}</span>
      </div>
      <div className={cell}>
        <span className={label}>Rev</span>
        <span className={value}>{CURRENT_REV}</span>
      </div>
      <div className={`${cell} col-span-2 flex items-center justify-between`}>
        <span>
          <span className={label}>Crew</span>
          <span className={`${value} text-accent`}>Recruiting</span>
        </span>
        <span className={label}>Sheet 01 / 05</span>
      </div>
    </div>
  );
}

export function Hero() {
  const { booted } = useBoot();
  const { team } = site;

  return (
    <motion.section
      id="top"
      variants={stagger(0.07, 0.1)}
      initial="hidden"
      animate={booted ? "show" : "hidden"}
      className={`relative flex min-h-[100svh] flex-col pt-8 pb-12 sm:pt-12 ${PAD}`}
    >
      <motion.div
        variants={fadeIn}
        data-reveal
        className={`flex flex-wrap items-center justify-between gap-3 border-b border-ink/40 pb-3 text-mute ${MONO}`}
      >
        <span className="text-ink">
          DWG no. FRC-{team.number}-{team.season}
        </span>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <span>Sheet 01 / 05</span>
      </motion.div>

      <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <motion.p variants={riseIn} data-reveal className={`flex items-center gap-3 text-mute ${MONO}`}>
            <span className="flex size-6 items-center justify-center rounded-full border border-ink text-ink">A</span>
            Section A&ndash;A &middot; General arrangement
          </motion.p>

          <motion.h1
            variants={riseIn}
            data-reveal
            className="mt-6 font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] font-semibold tracking-[-0.02em] uppercase"
          >
            We are
            <br />
            <span className="relative inline-block">
              Back
              <Redline play={booted} />
            </span>
          </motion.h1>

          <motion.p
            variants={riseIn}
            data-reveal
            className="mt-6 inline-block -rotate-2 font-mono text-xs tracking-[0.14em] text-accent uppercase"
          >
            &larr; Rev {CURRENT_REV}: {team.season} build season
          </motion.p>

          <motion.p variants={riseIn} data-reveal className="mt-6 max-w-sm font-mono text-xs leading-relaxed text-mute">
            {team.school}, {team.city}. Competing since {team.rookieYear}. In {team.lastCompeted} MT07
            finished 7th of 33 at the Başkent Regional and captained Alliance 5.
          </motion.p>

          <motion.div variants={riseIn} data-reveal className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
            <a href="#contact" className="border border-ink px-4 py-3 transition-colors hover:bg-ink hover:text-canvas">
              Submit RFI &rarr;
            </a>
            <a href="#backers" className="border border-ink/40 px-4 py-3 text-mute transition-colors hover:border-ink hover:text-ink">
              Supplier list
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeIn} data-reveal className="lg:col-span-7">
          <Drawing play={booted} />
        </motion.div>
      </div>

      <motion.div variants={riseIn} data-reveal className="w-full max-w-xl self-end">
        <TitleBlock />
      </motion.div>
    </motion.section>
  );
}
