import { BootOverlay } from "@/components/boot/boot-overlay";
import { Faq } from "@/components/shared/faq";
import { HazardBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

export { Backers, Contact, Footer, Garage, Timeline };

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
        <Faq className="border-t-4 border-ink px-4 py-16 sm:px-6 sm:py-24" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
