import { SponsorsPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "sponsors");

export default function Page() {
  return <SponsorsPage locale="en" />;
}
