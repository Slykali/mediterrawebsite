import type { ComponentType } from "react";

import type { DesignId } from "@/lib/designs";
import * as blueprint from "./blueprint";
import { SheetFrame } from "./blueprint/ui";
import * as editorial from "./editorial";
import * as hazard from "./hazard";
import * as kinetic from "./kinetic";
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

/**
 * All five share one client chunk (~27 KB gzipped for the lot), so every design
 * listed here ships to every visitor. Fine while choosing. For launch, delete
 * the folders you didn't pick and their lines below.
 */
export const DESIGNS: Record<DesignId, DesignParts> = {
  kinetic: { Home: kinetic.KineticDesign, ...kinetic, pad: "px-4 sm:px-6" },
  editorial: { Home: editorial.EditorialDesign, ...editorial, pad: "px-5 sm:px-8 lg:px-12" },
  blueprint: {
    Home: blueprint.BlueprintDesign,
    ...blueprint,
    frameClassName: "bp-grid",
    Frame: SheetFrame,
    pad: "px-6 sm:px-12",
  },
  hazard: { Home: hazard.HazardDesign, ...hazard, pad: "px-4 sm:px-6" },
  matchday: { Home: matchday.MatchdayDesign, ...matchday, pad: "px-4 sm:px-6" },
};
