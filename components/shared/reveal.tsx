"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { SPRING, VIEWPORT, riseIn, stagger } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Rises into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { ...SPRING, delay } },
  };

  return (
    <motion.div
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parent for a group that should arrive in order. Children use <StaggerItem>. */
export function Stagger({
  children,
  className,
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(gap)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div data-reveal variants={riseIn} className={className}>
      {children}
    </motion.div>
  );
}
