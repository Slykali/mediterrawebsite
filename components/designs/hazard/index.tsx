import { BootOverlay } from "@/components/boot/boot-overlay";
import { HazardBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

/** 04 — Brutalist. Safety yellow and black. */
export function HazardDesign() {
  return (
    <>
      <BootOverlay exit="wipe">
        <HazardBoot />
      </BootOverlay>
      <main>
        <Hero />
        <Timeline />
        <Garage />
        <Backers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
