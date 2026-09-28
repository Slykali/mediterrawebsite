import { BootOverlay } from "@/components/boot/boot-overlay";
import { MatchdayBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

/** 05 — FRC broadcast graphics. Red and blue alliance. */
export function MatchdayDesign() {
  return (
    <>
      <BootOverlay exit="collapse">
        <MatchdayBoot />
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
