import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_HEADER, splitLocale } from "@/lib/i18n";

/**
 * Tells the root layout which language the page is in, so <html lang> is right
 * in the server HTML. The layout can't see the path on its own.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, splitLocale(request.nextUrl.pathname).locale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Pages only: skip Next and Vercel internals and anything with a file extension.
  matcher: ["/((?!_next/|_vercel/|.*\\.[a-zA-Z0-9]+$).*)"],
};
