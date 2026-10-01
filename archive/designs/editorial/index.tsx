import { BootOverlay } from "@/components/boot/boot-overlay";
import { Faq } from "@/components/shared/faq";
import { EditorialBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

export { Backers, Contact, Footer, Garage, Timeline };

/** 02 — A printed magazine on warm paper. */
export function EditorialDesign() {
  return (
    <>
      <BootOverlay exit="lift">
        <EditorialBoot />
      </BootOverlay>
      <Hero />
      <main>
        <Timeline />
        <Garage />
        <Backers />
        <Faq className="border-t border-ink px-5 py-16 sm:px-8 lg:px-12 lg:py-24" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
