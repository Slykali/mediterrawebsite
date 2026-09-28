import { BootOverlay } from "@/components/boot/boot-overlay";
import { KineticBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
