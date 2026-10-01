import { SponsorsPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "sponsors");

export default function Page() {
  return <SponsorsPage locale="tr" />;
}
