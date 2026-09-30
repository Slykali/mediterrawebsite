"use client";

import { motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { GO, HUD, MONO } from "./ui";

/** Matchday intro: three connection checks turn green, then the page shows. */
export function MatchdayBoot() {
  const { count, readout, progress } = useBootCounter(1.35);
  const [stage, setStage] = useState(0);
  const t = useCopy();

  useMotionValueEvent(count, "change", (value) => {
    setStage(value >= 95 ? 3 : value >= 62 ? 2 : value >= 30 ? 1 : 0);
  });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
      <p className={`text-mute ${MONO}`}>{t.connecting}</p>
      <p className={`${HUD} text-[clamp(3rem,10vw,8rem)] leading-[0.85]`}>
        {t.match} <span className="text-accent">{stage === 3 ? t.ready : t.loading}</span>
      </p>

      <ul className="flex flex-wrap justify-center gap-2">
        {t.checks.map((check, i) => {
          const ok = stage > i;
          return (
            <li
              key={check}
              className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                ok ? "text-ink" : "border-rule text-mute"
              }`}
              style={ok ? { borderColor: GO } : undefined}
            >
              <span className="size-2" style={{ backgroundColor: ok ? GO : "var(--rule)" }} />
              {check}
            </li>
          );
        })}
      </ul>

      <div className="w-[min(32rem,80vw)]">
        <div className="h-1.5 bg-rule">
          <motion.div
            style={{ scaleX: progress }}
            className="h-full w-full origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
          />
        </div>
        <div className={`mt-2 flex justify-between text-mute ${MONO}`}>
          <span>FRC {site.team.number}</span>
          <span>
            <motion.span className="text-ink">{readout}</motion.span>%
          </span>
        </div>
      </div>
    </div>
  );
}
