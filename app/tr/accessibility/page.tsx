import { AccessibilityPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "accessibility");

export default function Page() {
  return <AccessibilityPage locale="tr" />;
}
