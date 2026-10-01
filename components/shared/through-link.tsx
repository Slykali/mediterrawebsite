"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { useIsHome } from "@/components/i18n/nav";
import { localePath } from "@/lib/i18n";
import { CHROME, PAGE_PATHS } from "@/lib/pages";

type ThroughPage = keyof (typeof CHROME)["en"]["through"];

/**
 * "Full history and results →" at the foot of a homepage section, pointing at
 * the page that section also lives on. Renders nothing on that page itself.
 * Colours come from currentColor and the design's accent.
 */
export function ThroughLink({ page, className = "" }: { page: ThroughPage; className?: string }) {
  const locale = useLocale();
  if (!useIsHome()) return null;

  return (
    <Link
      href={localePath(locale, PAGE_PATHS[page])}
      className={`group inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors hover:text-accent-text ${className}`}
    >
      {CHROME[locale].through[page]}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}
