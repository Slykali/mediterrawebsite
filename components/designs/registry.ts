import type { ComponentType } from "react";

import type { DesignId } from "@/lib/designs";
import { BlueprintDesign } from "./blueprint";
import { EditorialDesign } from "./editorial";
import { HazardDesign } from "./hazard";
import { KineticDesign } from "./kinetic";
import { MatchdayDesign } from "./matchday";

/**
 * All five share one client chunk (~27 KB gzipped for the lot), so every design
 * listed here ships to every visitor. Fine while choosing. For launch, delete
 * the folders you didn't pick and their lines below.
 */
export const DESIGN_COMPONENTS: Record<DesignId, ComponentType> = {
  kinetic: KineticDesign,
  editorial: EditorialDesign,
  blueprint: BlueprintDesign,
  hazard: HazardDesign,
  matchday: MatchdayDesign,
};
