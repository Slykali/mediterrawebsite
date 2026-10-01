"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { useMotionOff } from "@/components/a11y/a11y-provider";
import { wrap } from "@/lib/utils";

type MarqueeProps = {
  /** One copy of the loop. Repeated `repeat` times end to end. */
  children: ReactNode;
  /** Copy widths per second. Sign sets direction. */
  baseVelocity?: number;
  /** Multiplier a parent can drive — the Kinetic hero spins rows down out of the boot. */
  spin?: MotionValue<number>;
  /** Copies laid end to end. (repeat - 1) copies must cover the widest viewport. */
  repeat?: number;
  className?: string;
  /** Gap after each copy. Padding, not a trailing space — block boxes strip those. */
  itemClassName?: string;
};

/**
 * Scroll-reactive marquee: speeds up with scroll velocity and reverses when
 * you scroll back up. Stops under prefers-reduced-motion or the accessibility
 * menu's "Stop animations", and pauses while the pointer or focus is on it.
 */
export function Marquee({
  children,
  baseVelocity = -2,
  spin,
  repeat = 6,
  className = "",
  itemClassName = "pr-[0.3em]",
}: MarqueeProps) {
  const reduced = useMotionOff();
  const paused = useRef(false);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // clamp:false lets a hard flick push the row well past cruising speed.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // One copy is 100/repeat percent of the track, so wrapping over that span
  // lands on an identical frame every time.
  const span = 100 / repeat;
  const x = useTransform(baseX, (v) => `${wrap(-span, 0, v)}%`);

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced || paused.current) return;

    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += moveBy * factor;
    if (spin) moveBy *= spin.get();

    baseX.set(baseX.get() + moveBy * span);
  });

  return (
    // Clip sideways only. overflow-hidden also clipped vertically, which cut
    // the dots and cedillas off Ö, Ü, İ, Ş at the display sizes' tight leading.
    <div
      className="w-full overflow-x-clip"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <motion.div style={{ x }} className={`flex w-max flex-nowrap ${className}`}>
        {Array.from({ length: repeat }, (_, i) => (
          // Only the first copy is content; the rest are the loop.
          <div
            key={i}
            aria-hidden={i > 0 || undefined}
            className={`flex shrink-0 items-center whitespace-nowrap ${itemClassName}`}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
