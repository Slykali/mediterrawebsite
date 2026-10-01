import { HistoryPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "history");

export default function Page() {
  return <HistoryPage locale="en" />;
}
