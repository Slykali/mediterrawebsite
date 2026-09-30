"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";
import { riseIn } from "@/lib/motion";
import { useCopy } from "./copy";

/** Archivo at full width and weight. */
export const WIDE = "font-display font-black uppercase [font-stretch:125%]";
export const MONO = "font-mono text-xs tracking-[0.14em] uppercase";

/** Warning triangle. `mark` is the colour of the "!" — the background it sits on. */
export function WarningIcon({ className = "", mark = "var(--canvas)" }: { className?: string; mark?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden>
      <path d="M12 1.5L23 20.5H1Z" fill="currentColor" />
      <path d="M12 8v6M12 16.4v1.8" style={{ stroke: mark }} strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function SectionHead({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  const t = useCopy();
  return (
    <Reveal className="px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
      <p className={MONO}>
        {t.section} {n} &mdash; {label}
      </p>
      {/* Floor is low enough that "ALUMINUM" (the longest unbreakable word) fits at 320px. */}
      <h2 className={`${WIDE} mt-4 text-[clamp(2.25rem,11vw,10rem)] leading-[0.8] tracking-[-0.04em]`}>{children}</h2>
    </Reveal>
  );
}

/** Full-width slab link. Needs a variant-driving parent (the hero, or <Stagger>). */
export function Slab({
  href,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.a
      variants={riseIn}
      data-reveal
      href={href}
      className={`group flex items-center justify-between gap-4 px-4 py-5 transition-colors sm:px-6 sm:py-6 ${WIDE} text-xl sm:text-3xl ${
        dark ? "bg-ink text-canvas hover:bg-canvas hover:text-ink" : "hover:bg-ink hover:text-canvas"
      } ${className}`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
    </motion.a>
  );
}
