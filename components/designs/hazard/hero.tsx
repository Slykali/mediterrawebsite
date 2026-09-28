"use client";

import { motion } from "framer-motion";

import { useBoot } from "@/components/boot/boot-provider";
import { NAV } from "@/lib/content";
import { fadeIn, maskUp, riseIn, stagger } from "@/lib/motion";
import { SPECS, site } from "@/lib/site";
import { MONO, Slab, WIDE, WarningIcon } from "./ui";

export function Hero() {
  const { booted } = useBoot();
  const { team } = site;

  return (
    <motion.section
      id="top"
      variants={stagger(0.06, 0.1)}
      initial="hidden"
      animate={booted ? "show" : "hidden"}
      className="flex min-h-[100svh] flex-col"
    >
      <motion.header
        variants={fadeIn}
        data-reveal
        className={`flex items-center justify-between gap-4 bg-ink px-4 py-3 text-canvas sm:px-6 ${MONO}`}
      >
        <span className="flex items-center gap-2">
          <WarningIcon className="h-4 w-4 text-canvas" mark="var(--ink)" />
          FRC {team.number} / {team.name}
        </span>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="underline-offset-4 hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
        <span>{team.season}</span>
      </motion.header>

      <div className="flex flex-1 flex-col justify-end">
        <div className="overflow-hidden px-3 pt-6 sm:px-5">
          <motion.h1
            variants={maskUp}
            data-reveal
            // "6874" measures 3.06em at this width and weight; sized off the
            // viewport minus padding so it fills the row without clipping.
            className={`${WIDE} text-[min(calc((100vw_-_3rem)/3.12),32rem)] leading-[0.76] tracking-[-0.05em]`}
          >
            {team.number}
          </motion.h1>
        </div>

        <motion.div variants={fadeIn} data-reveal className="bg-ink px-3 py-3 text-canvas sm:px-5 sm:py-4">
          <p className={`${WIDE} text-[clamp(2.25rem,8.5vw,8rem)] leading-[0.85] tracking-[-0.03em]`}>We are back.</p>
        </motion.div>

        <div aria-hidden className="stripes stripes-move h-8 border-y-4 border-ink" />

        <div className="grid grid-cols-2 border-b-4 border-ink lg:grid-cols-4">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              variants={riseIn}
              data-reveal
              className={`border-ink p-4 sm:p-6 ${i % 2 === 0 ? "border-r-4" : ""} ${
                i < 2 ? "border-b-4 lg:border-b-0" : ""
              } lg:border-r-4 lg:last:border-r-0 ${"accent" in spec && spec.accent ? "bg-ink text-canvas" : ""}`}
            >
              <span className="font-mono text-xs">0{i + 1}</span>
              <span className={`mt-6 block ${MONO}`}>{spec.label}</span>
              {/* Sized off the cell: "RECRUITING" is 8.4em at this width, cells are
                  half the viewport (quarter at lg) minus padding. */}
              <span
                className={`${WIDE} mt-1 block text-[min(calc((50vw_-_3rem)/8.6),2.25rem)] leading-none lg:text-[min(calc((25vw_-_3rem)/8.6),2.25rem)]`}
              >
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid border-b-4 border-ink lg:grid-cols-12">
          <motion.div
            variants={riseIn}
            data-reveal
            className="flex gap-4 border-ink p-4 sm:p-6 lg:col-span-5 lg:border-r-4"
          >
            <WarningIcon className="h-12 w-12 shrink-0" />
            <p className="font-mono text-xs leading-relaxed uppercase sm:text-sm">
              <b>Caution:</b> {team.season} robot under construction. {team.game} is revealed on{" "}
              {team.kickoff}. {team.school}, {team.city}.
            </p>
          </motion.div>
          <div className="grid border-t-4 border-ink lg:col-span-7 lg:border-t-0">
            <Slab href="#contact" dark>
              Join the team
            </Slab>
            <Slab href="#backers" className="border-t-4 border-ink">
              Sponsor the team
            </Slab>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
