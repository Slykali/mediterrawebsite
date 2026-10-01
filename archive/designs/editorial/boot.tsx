"use client";

import { motion } from "framer-motion";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { SPRING_HEAVY } from "@/lib/motion";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { KICKER, titleCase } from "./ui";

/** Editorial intro: the masthead slides in, a rule fills, then the sheet lifts. */
export function EditorialBoot() {
  const { readout, progress } = useBootCounter(1.25);
  const t = useCopy();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <span className={`text-mute ${KICKER}`}>
        N&ordm; {site.team.number} &middot; {t.season} {site.team.season}
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
        {t.goingToPress} &mdash; <motion.span className="text-ink">{readout}</motion.span>%
      </span>
    </div>
  );
}
