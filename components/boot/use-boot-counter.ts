import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import { BOOT_DURATION, BOOT_HOLD_MS } from "@/lib/boot";
import { useBoot } from "./boot-provider";

/**
 * The counter every intro runs on. One motion value drives the readout and the
 * progress bar, so they physically cannot disagree; reaching 100 holds briefly
 * and then ends the boot.
 */
export function useBootCounter(duration: number = BOOT_DURATION) {
  const { finish } = useBoot();
  const [full, setFull] = useState(false);

  const count = useMotionValue(0);
  const readout = useTransform(count, (v) => Math.round(v).toString().padStart(3, "0"));
  const progress = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setFull(true),
    });
    return () => controls.stop();
  }, [count, duration]);

  useEffect(() => {
    if (!full) return;
    const id = window.setTimeout(finish, BOOT_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [full, finish]);

  return { count, readout, progress, full };
}
