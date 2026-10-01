import { PrivacyPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "privacy");

export default function Page() {
  return <PrivacyPage locale="tr" />;
}
