import { JoinPage } from "@/components/pages/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "join");

export default function Page() {
  return <JoinPage locale="en" />;
}
