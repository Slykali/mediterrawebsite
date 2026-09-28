"use client";

import { motion } from "framer-motion";

import { useBootCounter } from "@/components/boot/use-boot-counter";
import { Marquee } from "@/components/shared/marquee";
import { BOOT_SPIN_VELOCITY } from "@/lib/boot";
import { site } from "@/lib/site";
import { LABEL } from "./ui";

/** The hero's own type, spun up. The hero inherits the momentum and settles it. */
export function KineticBoot() {
  const { readout, progress } = useBootCounter();

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className={`flex items-center justify-between gap-4 border-b border-rule px-4 py-3 text-mute sm:px-6 ${LABEL}`}>
        <span className="flex items-center gap-2 text-ink">
          <span className="size-1.5 bg-accent" />
          FRC {site.team.number} &middot; {site.team.name}
        </span>
        <span>{site.team.city}</span>
      </div>

      <Marquee
        baseVelocity={BOOT_SPIN_VELOCITY}
        className="font-display text-[clamp(4rem,15vw,13rem)] leading-[0.9] text-ink uppercase"
      >
        {`${site.team.number} ·`}
      </Marquee>

      <div className="space-y-3 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="h-px w-full bg-rule">
          <motion.div style={{ scaleX: progress }} className="h-px w-full origin-left bg-accent" />
        </div>
        <div className={`flex items-baseline justify-between text-mute ${LABEL}`}>
          <span>Spinning up</span>
          <span className="flex items-baseline gap-1 text-ink">
            <motion.span className="font-display text-base tracking-normal">{readout}</motion.span>
            <span className="text-mute">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
