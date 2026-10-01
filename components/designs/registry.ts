import type { ComponentType } from "react";

import type { DesignId } from "@/lib/designs";
import * as matchday from "./matchday";

export type DesignParts = {
  /** The full homepage: intro, hero, every section, FAQ, footer. */
  Home: ComponentType;
  /** The same sections on their own, for the subpages. */
  Timeline: ComponentType;
  Garage: ComponentType;
  Backers: ComponentType;
  Contact: ComponentType;
  Footer: ComponentType;
  /** Background/texture wrapper and fixed chrome some designs put around everything. */
  frameClassName?: string;
  Frame?: ComponentType;
  /** Side padding that lines up with the design's own sections. */
  pad: string;
};

export const DESIGNS: Record<DesignId, DesignParts> = {
  matchday: { Home: matchday.MatchdayDesign, ...matchday, pad: "px-4 sm:px-6" },
};
