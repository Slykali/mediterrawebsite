"use client";

import { motion } from "framer-motion";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { site } from "@/lib/site";
import { MONO, WIDE, WarningIcon } from "./ui";

/** Stand clear: tape runs, a bar fills, the whole thing wipes off to the right. */
export function HazardBoot() {
  const { readout, progress } = useBootCounter();

  return (
    <div className="flex h-full flex-col text-ink">
      <div className="stripes stripes-move h-10 shrink-0 border-b-4 border-ink sm:h-14" />

      <div className="flex flex-1 flex-col justify-center px-5 sm:px-10">
        <p className={`flex items-center gap-3 ${MONO}`}>
          <WarningIcon className="h-5 w-5" />
          Stand clear
        </p>
        <p className={`${WIDE} mt-4 text-[clamp(3rem,13vw,12rem)] leading-[0.82] tracking-[-0.04em]`}>
          Powering
          <br />
          up
        </p>
      </div>

      <div className="border-t-4 border-ink px-5 py-4 sm:px-10">
        <div className="h-4 border-2 border-ink">
          <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-ink" />
        </div>
        <div className={`mt-3 flex justify-between ${MONO}`}>
          <span>
            FRC {site.team.number} &mdash; {site.team.name}
          </span>
          <span>
            <motion.span>{readout}</motion.span>%
          </span>
        </div>
      </div>

      <div className="stripes stripes-move h-10 shrink-0 border-t-4 border-ink sm:h-14" />
    </div>
  );
}
