import { BootOverlay } from "@/components/boot/boot-overlay";
import { Faq } from "@/components/shared/faq";
import { MatchdayBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

export { Backers, Contact, Footer, Garage, Timeline };

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
        <Faq className="border-t border-rule px-4 py-20 sm:px-6" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
