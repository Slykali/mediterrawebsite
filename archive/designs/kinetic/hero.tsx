"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

import { useBoot } from "@/components/boot/boot-provider";
import { LangSwitch } from "@/components/i18n/lang-switch";
import { useContent } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { Marquee } from "@/components/shared/marquee";
import { MediaBackdrop } from "@/components/shared/media-backdrop";
import { riseIn, stagger } from "@/lib/motion";
import { site } from "@/lib/site";
import { useCopy } from "./copy";
import { ActionBar, LABEL, OUTLINE } from "./ui";

const container = stagger(0.07, 0.1);

export function Hero() {
  const { phase, booted, instant } = useBoot();
  const reveal = booted ? "show" : "hidden";
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();

  // After the intro the rows start fast and slow to their normal speed.
  const spin = useMotionValue(1);
  useEffect(() => {
    if (phase !== "done") return;
    spin.set(7);
    const controls = animate(spin, 1, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [phase, spin]);

  return (
    <motion.section
      id="top"
      variants={container}
      // Server already knows the intro won't play: render final, no fade-in.
      initial={instant ? false : "hidden"}
      animate={reveal}
      className="flex min-h-[100svh] flex-col"
    >
      <motion.header
        variants={riseIn}
        data-reveal
        className={`flex items-center justify-between gap-4 border-b border-rule px-4 py-3 text-mute sm:px-6 ${LABEL}`}
      >
        {/* The page's one h1. Preflight strips heading styles, so it looks the same as the span it was. */}
        <h1 className="flex items-center gap-2 text-ink">
          <span className="size-1.5 bg-accent" />
          FRC {site.team.number} &middot; {site.team.name}
        </h1>
        <nav className="hidden items-center gap-6 md:flex">
          {c.nav.map((item) => (
            <a key={item.id} href={href(item.id)} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <span className="flex items-center gap-4">
          <span className="hidden sm:inline">{site.team.city}</span>
          <LangSwitch className="text-ink" />
        </span>
      </motion.header>

      <div className="relative flex flex-1 flex-col justify-center gap-2 overflow-hidden py-10 sm:gap-3">
        <MediaBackdrop />

        <div className="relative">
          <Marquee
            baseVelocity={0.12}
            spin={spin}
            className={`font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.9] uppercase ${OUTLINE}`}
          >
            {`${site.team.number} · ${site.team.name} · Döşemealtı ·`}
          </Marquee>
        </div>

        <div className="relative">
          <Marquee
            baseVelocity={-0.24}
            spin={spin}
            className="font-display text-[clamp(4rem,15vw,13rem)] leading-[0.9] text-ink uppercase"
          >
            {t.weAreBack}
          </Marquee>
        </div>

        <div className="relative">
          <Marquee
            baseVelocity={0.15}
            spin={spin}
            className={`font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.9] uppercase ${OUTLINE}`}
          >
            {/* The team's registered names, oldest first. Written in capitals so
                Turkish uppercasing (i → İ) doesn't respell the brand. */}
            {"IMPERIUM · LYCIA · MEDITERRA ·"}
          </Marquee>
        </div>
      </div>

      <div className="grid border-t border-rule lg:grid-cols-12">
        <motion.div
          variants={riseIn}
          data-reveal
          className="flex items-end border-rule px-4 py-6 sm:px-6 lg:col-span-7 lg:border-r"
        >
          <p className="max-w-lg text-xs leading-relaxed text-mute sm:text-sm">{t.statement}</p>
        </motion.div>

        <div className="grid grid-cols-2 border-t border-rule lg:col-span-5 lg:border-t-0">
          {c.specs.map((spec) => (
            <motion.div
              key={spec.label}
              variants={riseIn}
              data-reveal
              className="border-r border-rule px-4 py-4 sm:px-6 [&:nth-child(-n+2)]:border-b"
            >
              <span className={`block text-mute ${LABEL}`}>{spec.label}</span>
              <span
                className={`mt-1.5 block font-display text-lg uppercase sm:text-xl ${
                  spec.accent ? "text-accent" : "text-ink"
                }`}
              >
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-rule sm:grid-cols-2">
        <ActionBar href={href("contact")} label={t.joinTeam} />
        <ActionBar href={href("backers")} label={t.sponsorTeam} className="border-t border-rule sm:border-t-0 sm:border-l" />
      </div>
    </motion.section>
  );
}
