"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { A11Y_ATTR, A11Y_DEFAULTS, A11Y_STORAGE_KEY, type A11ySettings } from "@/lib/a11y";

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
}

/**
 * Holds the accessibility menu's settings. The <head> script has already put
 * the saved ones on <html>; this reads them back so the menu shows them, and
 * turns Framer's animations off when "Stop animations" is on.
 */
export function A11yProvider({ children }: { children: ReactNode }) {
  // null until read from storage, so the defaults never overwrite what's saved.
  const [settings, setSettings] = useState<A11ySettings | null>(null);

  useEffect(() => setSettings(read()), []);

  useEffect(() => {
    if (!settings) return;
    apply(settings);
    write(settings);
  }, [settings]);

  const value = useMemo<A11yContextValue>(
    () => ({
      settings: settings ?? A11Y_DEFAULTS,
      update: (patch) => setSettings((prev) => ({ ...(prev ?? A11Y_DEFAULTS), ...patch })),
      reset: () => setSettings(A11Y_DEFAULTS),
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
