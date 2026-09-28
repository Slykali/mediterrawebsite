import type { Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Springs, not eased fades. Things should arrive with mass and settle, which is
 * what separates motion that feels built from motion that feels templated.
 */
export const SPRING = { type: "spring", stiffness: 240, damping: 30, mass: 0.9 } as const;
export const SPRING_HEAVY = { type: "spring", stiffness: 150, damping: 26, mass: 1.1 } as const;

/** Scroll reveals fire once, slightly before the element is fully in view. */
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Parent: holds children back, then releases them in order. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Line reveal. Wrap in overflow-hidden; this slides out from under the clip. */
export const maskUp: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: SPRING_HEAVY },
};

/** The workhorse for everything that isn't a headline. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Hairlines draw rather than appear. */
export const drawRule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};
