import { BootOverlay } from "@/components/boot/boot-overlay";
import { Faq } from "@/components/shared/faq";
import { BlueprintBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";
import { SheetFrame } from "./ui";

export { Backers, Contact, Footer, Garage, Timeline };

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
        <Faq className="px-6 py-20 sm:px-12" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
