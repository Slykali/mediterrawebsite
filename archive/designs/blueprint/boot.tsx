"use client";

import { motion } from "framer-motion";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { EASE_OUT } from "@/lib/motion";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { MONO } from "./ui";

/** Blueprint intro: draws the sheet border, title block, then the robot. */
export function BlueprintBoot() {
  const { readout, progress } = useBootCounter(1.35);
  const t = useCopy();
  const line = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });

  return (
    <div className="bp-grid flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="relative w-[min(36rem,86vw)]">
        <svg viewBox="0 0 400 260" className="w-full text-ink" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          {/* No vector-effect here: it breaks pathLength (dashes measured in screen space). */}
          <motion.path d="M1 1H399V259H1Z" {...line(0)} />
          <motion.path d="M8 8H392V252H8Z" opacity={0.4} {...line(0.1)} />
          <motion.path d="M250 206H392M250 206V252M250 229H392M330 206V252" {...line(0.35)} />
        </svg>
        <div className="absolute inset-x-[12%] top-[10%] bottom-[24%]">
          <RobotGlyph kind="shooter" play strokeWidth={1.1} className="h-full w-full text-ink" />
        </div>
      </div>

      <div className="w-[min(36rem,86vw)] space-y-2">
        <div className="h-px bg-ink/25">
          <motion.div style={{ scaleX: progress }} className="h-px w-full origin-left bg-accent" />
        </div>
        <div className={`flex justify-between text-mute ${MONO}`}>
          <span>
            DWG FRC-{site.team.number}-{site.team.season} &middot; {t.plotting}
          </span>
          <span className="text-ink">
            <motion.span>{readout}</motion.span>%
          </span>
        </div>
      </div>
    </div>
  );
}
