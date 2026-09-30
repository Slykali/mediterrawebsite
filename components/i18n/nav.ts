"use client";

import { usePathname } from "next/navigation";

import { useLocale } from "@/components/i18n/locale-provider";
import type { SectionId } from "@/lib/content";
import { localePath, splitLocale } from "@/lib/i18n";
import { PAGE_PATHS } from "@/lib/pages";

/** Where each homepage section lives as a page of its own. */
const SECTION_PAGE: Record<Exclude<SectionId, "top">, string> = {
  timeline: PAGE_PATHS.history,
  garage: PAGE_PATHS.history,
  backers: PAGE_PATHS.sponsors,
  contact: PAGE_PATHS.join,
};

/** True on "/" and "/tr". */
export function useIsHome(): boolean {
  return splitLocale(usePathname()).path === "/";
}

/**
 * Links between sections. On the homepage they scroll ("#contact"); the same
 * section reused on a subpage links to the page that has it ("/tr/join"), or
 * scrolls if that's the page you're on.
 */
export function useSectionHref(): (id: SectionId) => string {
  const locale = useLocale();
  const { path } = splitLocale(usePathname());

  return (id) => {
    if (id === "top" || path === "/") return `#${id}`;
    const target = SECTION_PAGE[id];
    return target === path ? `#${id}` : localePath(locale, target);
  };
}
