import { BootOverlay } from "@/components/boot/boot-overlay";
import { Faq } from "@/components/shared/faq";
import { KineticBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

export { Backers, Contact, Footer, Garage, Timeline };

/** 01 — Giant moving type. Carbon, bone, hazard orange. */
export function KineticDesign() {
  return (
    <>
      <BootOverlay exit="collapse">
        <KineticBoot />
      </BootOverlay>
      <main>
        <Hero />
        <Timeline />
        <Garage />
        <Backers />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
