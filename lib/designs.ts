export const DESIGN_IDS = ["kinetic", "editorial", "blueprint", "hazard", "matchday"] as const;

export type DesignId = (typeof DESIGN_IDS)[number];

/** The design every visitor gets once the switcher is off. */
export const DEFAULT_DESIGN: DesignId = "kinetic";

/**
 * The floating picker, plus the ?design= and cookie overrides. Set to false for
 * launch and the site is locked to DEFAULT_DESIGN — no picker, no overrides.
 */
export const SHOW_DESIGN_SWITCHER = true;

export const DESIGN_COOKIE = "frc6874-design";

export type DesignMeta = {
  name: string;
  blurb: string;
  swatches: [string, string, string];
};

export const DESIGN_META: Record<DesignId, DesignMeta> = {
  kinetic: {
    name: "Kinetic",
    blurb: "Giant moving type. Carbon, bone, hazard orange.",
    swatches: ["#0c0c0b", "#edeae3", "#ff3d00"],
  },
  editorial: {
    name: "Editorial",
    blurb: "A printed magazine on warm paper.",
    swatches: ["#f1ede4", "#151412", "#c8321b"],
  },
  blueprint: {
    name: "Blueprint",
    blurb: "Engineering drawing sheet with redline markup.",
    swatches: ["#0c2846", "#e6f0ff", "#ff5a4a"],
  },
  hazard: {
    name: "Hazard",
    blurb: "Brutalist. Safety yellow and black.",
    swatches: ["#f5d000", "#0b0b0b", "#ffffff"],
  },
  matchday: {
    name: "Matchday",
    blurb: "FRC broadcast graphics. Red and blue alliance.",
    swatches: ["#06080d", "#e3262c", "#1f6fe0"],
  },
};

export function isDesignId(value: unknown): value is DesignId {
  return typeof value === "string" && (DESIGN_IDS as readonly string[]).includes(value);
}

/** Anything that isn't a known design falls back to the default. */
export function resolveDesign(value: unknown): DesignId {
  if (!SHOW_DESIGN_SWITCHER) return DEFAULT_DESIGN;
  return isDesignId(value) ? value : DEFAULT_DESIGN;
}
