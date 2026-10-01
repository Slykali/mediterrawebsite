"use client";

import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { A11Y_ATTR, A11Y_DEFAULTS, A11Y_STORAGE_KEY, type A11ySettings } from "@/lib/a11y";

// Framer fixes each element's reduced-motion setting when it mounts, so a
// MotionConfig change can't stop what's already on the page. Its global flag is
// read every time an animation starts instead. Set it before anything hydrates,
// from the attribute the <head> script already put on <html>.
if (typeof document !== "undefined") {
  MotionGlobalConfig.skipAnimations = document.documentElement.hasAttribute(A11Y_ATTR.still);
}

type A11yContextValue = {
  settings: A11ySettings;
  update: (patch: Partial<A11ySettings>) => void;
  reset: () => void;
};

const A11yContext = createContext<A11yContextValue>({
  settings: A11Y_DEFAULTS,
  update: () => {},
  reset: () => {},
});

function read(): A11ySettings {
  try {
    return { ...A11Y_DEFAULTS, ...JSON.parse(window.localStorage.getItem(A11Y_STORAGE_KEY) ?? "{}") };
  } catch {
    return A11Y_DEFAULTS;
  }
}

function write(settings: A11ySettings) {
  try {
    window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private mode: the settings still apply, they just won't be remembered.
  }
}

function apply(settings: A11ySettings) {
  const root = document.documentElement;
  if (settings.text) root.setAttribute(A11Y_ATTR.text, String(settings.text));
  else root.removeAttribute(A11Y_ATTR.text);
  for (const key of ["contrast", "still", "links", "readable"] as const) {
    root.toggleAttribute(A11Y_ATTR[key], settings[key]);
  }
  MotionGlobalConfig.skipAnimations = settings.still;
}

/**
 * Holds the accessibility menu's settings. The <head> script has already put
 * the saved ones on <html>; this reads them back so the menu shows them, and
 * turns Framer's animations off when "Stop animations" is on.
 */
export function A11yProvider({ children }: { children: ReactNode }) {
  // null until read from storage, so the defaults never overwrite what's saved.
  const [settings, setSettings] = useState<A11ySettings | null>(null);
  // Nothing is written to storage until the visitor changes something.
  const [changed, setChanged] = useState(false);

  useEffect(() => setSettings(read()), []);

  useEffect(() => {
    if (!settings) return;
    apply(settings);
    if (changed) write(settings);
  }, [settings, changed]);

  const value = useMemo<A11yContextValue>(
    () => ({
      settings: settings ?? A11Y_DEFAULTS,
      update: (patch) => {
        setChanged(true);
        setSettings((prev) => ({ ...(prev ?? A11Y_DEFAULTS), ...patch }));
      },
      reset: () => {
        setChanged(true);
        setSettings(A11Y_DEFAULTS);
      },
    }),
    [settings],
  );

  return (
    <A11yContext.Provider value={value}>
      {/* "user" follows the OS reduced-motion setting; "always" is the menu's switch. */}
      <MotionConfig reducedMotion={settings?.still ? "always" : "user"}>{children}</MotionConfig>
    </A11yContext.Provider>
  );
}

export function useA11y(): A11yContextValue {
  return useContext(A11yContext);
}

/** OS reduced motion or the menu's "Stop animations". For code Framer doesn't animate itself. */
export function useMotionOff(): boolean {
  const { settings } = useA11y();
  const [osReduced, setOsReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduced(query.matches);
    const onChange = () => setOsReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return osReduced || settings.still;
}
