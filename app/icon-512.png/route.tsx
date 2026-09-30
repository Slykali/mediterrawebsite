import { iconImage } from "@/lib/icon-art";

export const dynamic = "force-static";

/** PNG icon for the web manifest and the structured-data logo. */
export function GET() {
  return iconImage(512);
}
