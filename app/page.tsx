import { HomePage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomePage locale="en" />;
}
