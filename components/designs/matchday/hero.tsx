"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

import { useBoot } from "@/components/boot/boot-provider";
import { LangSwitch } from "@/components/i18n/lang-switch";
import { useSectionHref } from "@/components/i18n/nav";
import { MediaBackdrop } from "@/components/shared/media-backdrop";
import { pad2, useCountdown, type Countdown } from "@/components/shared/use-countdown";
import { SPRING, fadeIn, riseIn, stagger } from "@/lib/motion";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { HUD, MONO, SkewButton } from "./ui";

const NAV_IDS = ["timeline", "garage", "backers", "contact"] as const;

/** Red team number, countdown in the middle, blue season. */
function Scorebug({ time }: { time: Countdown | null }) {
  const t = useCopy();
  const cells: [string, number | undefined][] = [
    [t.cells[0], time?.days],
    [t.cells[1], time?.hours],
    [t.cells[2], time?.minutes],
    [t.cells[3], time?.seconds],
  ];

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-stretch border border-rule bg-panel/85 backdrop-blur-sm">
      <div className="flex flex-col justify-center bg-accent px-3 py-2 text-on-accent sm:px-5">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-80">{t.red}</span>
        <span className={`${HUD} text-2xl leading-none sm:text-5xl`}>{site.team.number}</span>
      </div>

      <div className="flex flex-col items-center justify-center px-2 py-2 sm:px-6">
        <p className="font-mono text-[9px] tracking-[0.3em] text-mute uppercase">
          {time?.done ? t.buildOn : t.kickoffIn}
        </p>
        <div className="mt-1 flex items-start gap-1 sm:gap-3" aria-live="off">
          {cells.map(([label, value], i) => (
            <Fragment key={label}>
              {i > 0 && <span className={`${HUD} text-2xl text-mute sm:text-5xl`}>:</span>}
              <span className="flex flex-col items-center">
                <span className={`${HUD} text-2xl leading-none tabular-nums not-italic sm:text-5xl`}>{pad2(value)}</span>
                <span className="mt-1 font-mono text-[8px] tracking-[0.2em] text-mute uppercase">{label}</span>
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end justify-center bg-accent-2 px-3 py-2 text-on-accent sm:px-5">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-80">{t.blue}</span>
        <span className={`${HUD} text-2xl leading-none sm:text-5xl`}>{site.team.season}</span>
      </div>
    </div>
  );
}

/** Broadcast lower third. Slides in after the boot. */
function LowerThird({ play }: { play: boolean }) {
  const { team } = site;
  const { instant } = useBoot();
  const t = useCopy();
  return (
    <motion.div
      data-reveal
      initial={instant ? false : { x: "-105%" }}
      animate={{ x: play ? "0%" : "-105%" }}
      transition={{ ...SPRING, delay: 0.7 }}
      className="relative mb-6 flex max-w-[min(100%,56rem)] items-stretch self-start"
    >
      <span className={`flex items-center bg-accent px-4 text-2xl text-on-accent ${HUD}`}>{team.number}</span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-y border-r border-rule bg-panel/90 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-mute uppercase sm:text-[11px]">
        <span className="text-ink">{team.name}</span>
        <span>{team.city}</span>
        <span>{t.lastResult}</span>
        <span className="text-accent">{t.membership}</span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { booted, instant } = useBoot();
  const time = useCountdown(site.team.kickoffISO);
  const { team } = site;
  const t = useCopy();
  const href = useSectionHref();

  return (
    <motion.section
      id="top"
      variants={stagger(0.07, 0.1)}
      initial={instant ? false : "hidden"}
      animate={booted ? "show" : "hidden"}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <MediaBackdrop opacity="opacity-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_0%_100%,color-mix(in_oklab,var(--accent)_24%,transparent),transparent),radial-gradient(55%_45%_at_100%_100%,color-mix(in_oklab,var(--accent-2)_24%,transparent),transparent)]"
      />

      <motion.header
        variants={fadeIn}
        data-reveal
        className={`relative flex items-center justify-between gap-4 border-b border-rule px-4 py-3 sm:px-6 ${MONO}`}
      >
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-accent px-2 py-0.5 text-on-accent">
            <span className="size-1.5 animate-pulse rounded-full bg-on-accent" />
            {t.live}
          </span>
          <span className="text-ink">
            FRC {team.number} &middot; {team.name}
          </span>
        </span>
        <nav className="hidden gap-6 text-mute md:flex">
          {NAV_IDS.map((id) => (
            <a key={id} href={href(id)} className="transition-colors hover:text-ink">
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <span className="flex items-center gap-4">
          <span className="hidden text-mute sm:inline">{t.seasonLabel}</span>
          <LangSwitch className="text-ink" />
        </span>
      </motion.header>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
        <motion.p variants={riseIn} data-reveal className="font-mono text-[11px] tracking-[0.3em] text-mute uppercase">
          {t.qualification}
        </motion.p>
        <motion.h1 variants={riseIn} data-reveal className={`${HUD} mt-4 text-[clamp(4rem,14vw,12.5rem)] leading-[0.82]`}>
          <span className="sr-only">FRC {team.number} Mediterra: </span>
          {t.weAreBack[0]}
          <span className="text-accent">{t.weAreBack[1]}</span>
        </motion.h1>
        <motion.div variants={riseIn} data-reveal className="mt-10 w-full max-w-3xl">
          <Scorebug time={time} />
        </motion.div>
        <motion.div variants={riseIn} data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
          <SkewButton href={href("contact")} tone="red">
            {t.joinAlliance}
          </SkewButton>
          <SkewButton href={href("backers")} tone="blue">
            {t.sponsorUs}
          </SkewButton>
        </motion.div>
      </div>

      <div className="relative px-4 sm:px-6">
        <LowerThird play={booted} />
      </div>
    </motion.section>
  );
}
