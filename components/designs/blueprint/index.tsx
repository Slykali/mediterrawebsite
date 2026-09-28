import { BootOverlay } from "@/components/boot/boot-overlay";
import { BlueprintBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";
import { SheetFrame } from "./ui";

/** 03 — An engineering drawing sheet with redline markup. */
export function BlueprintDesign() {
  return (
    <div className="bp-grid">
      <BootOverlay exit="fade">
        <BlueprintBoot />
      </BootOverlay>
      <SheetFrame />
      <main>
        <Hero />
        <Timeline />
        <Garage />
        <Backers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
