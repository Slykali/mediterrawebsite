"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { riseIn } from "@/lib/motion";

export const LABEL = "text-[10px] tracking-[0.18em] uppercase";
export const OUTLINE = "text-transparent [-webkit-text-stroke:1px_var(--mute)]";
export const H2 = "font-display text-[clamp(3rem,10vw,9rem)] leading-[0.85] uppercase";

/** Hairline bar that opens every section: index and name left, a fact right. */
export function Rail({ index, label, meta }: { index: string; label: string; meta?: ReactNode }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-y border-rule px-4 py-3 text-mute sm:px-6 ${LABEL}`}
    >
      <span className="flex items-center gap-2 text-ink">
        <span className="size-1.5 bg-accent" />
        {index} &middot; {label}
      </span>
      {meta && <span>{meta}</span>}
    </div>
  );
}

/** Full-width link bar. Needs a variant-driving parent (the hero, or <Stagger>). */
export function ActionBar({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <motion.a
      variants={riseIn}
      data-reveal
      href={href}
      className={`group flex items-center justify-between px-4 py-5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-accent hover:text-on-accent sm:px-6 ${className}`}
    >
      {label}
      <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
    </motion.a>
  );
}
