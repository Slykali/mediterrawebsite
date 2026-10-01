import { JoinPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "join");

export default function Page() {
  return <JoinPage locale="tr" />;
}
