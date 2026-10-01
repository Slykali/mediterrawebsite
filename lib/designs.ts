/**
 * The site ships one design, Matchday. The other four (and the picker that
 * switched between them) live in archive/; see archive/README.md.
 */
export const DESIGN_IDS = ["matchday"] as const;

export type DesignId = (typeof DESIGN_IDS)[number];

export const DEFAULT_DESIGN: DesignId = "matchday";

export function isDesignId(value: unknown): value is DesignId {
  return typeof value === "string" && (DESIGN_IDS as readonly string[]).includes(value);
}
