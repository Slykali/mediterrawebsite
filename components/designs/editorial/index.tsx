import { BootOverlay } from "@/components/boot/boot-overlay";
import { EditorialBoot } from "./boot";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { Backers, Footer, Garage, Timeline } from "./sections";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
