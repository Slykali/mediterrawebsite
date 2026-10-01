import { AccessibilityPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "accessibility");

export default function Page() {
  return <AccessibilityPage locale="en" />;
}
