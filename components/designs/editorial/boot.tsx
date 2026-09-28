"use client";

import { motion } from "framer-motion";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { SPRING_HEAVY } from "@/lib/motion";
import { site } from "@/lib/site";
import { KICKER, titleCase } from "./ui";

/** Going to press: the masthead sets, a rule runs across, the sheet lifts. */
export function EditorialBoot() {
  const { readout, progress } = useBootCounter(1.25);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <span className={`text-mute ${KICKER}`}>
        N&ordm; {site.team.number} &middot; Season {site.team.season}
      </span>
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={SPRING_HEAVY}
          className="font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.95] italic"
        >
          {titleCase(site.team.name)}
        </motion.p>
      </div>
      <div className="h-px w-[min(28rem,80vw)] bg-rule">
        <motion.div style={{ scaleX: progress }} className="h-px w-full origin-left bg-ink" />
      </div>
      <span className={`text-mute ${KICKER}`}>
        Going to press &mdash; <motion.span className="text-ink">{readout}</motion.span>%
      </span>
    </div>
  );
}
