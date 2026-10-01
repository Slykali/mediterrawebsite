import { HistoryPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "history");

export default function Page() {
  return <HistoryPage locale="tr" />;
}
