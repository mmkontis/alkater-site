import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Legacy preview/proposal prefixes that should redirect to the live landing.
// We strip the prefix and forward the remainder of the path so that
// e.g. /proposals/concept-1/about → /about and any deep links keep working.
const LEGACY_PREVIEW_PREFIXES = [
  "/proposals/concept-1",
  "/proposals/concept-2",
  "/proposals/concept-3",
  "/proposals/concept-4",
  "/proposals/concept-5",
  "/proposals/concept-6",
  "/proposals",
  "/proposal-logo",
  "/proposal",
  "/landing-gemini",
  "/concept-1",
  "/coming-soon",
  "/underconstruction",
  "/static-underconstruction",
];

function getLegacyRedirectPath(pathname: string): string | null {
  for (const prefix of LEGACY_PREVIEW_PREFIXES) {
    if (pathname === prefix) return "/";
    if (pathname.startsWith(prefix + "/")) {
      const rest = pathname.slice(prefix.length);
      // Drop nested concept slugs like /proposals/concept-1/services/[id] → /services/[id]
      return rest === "" ? "/" : rest;
    }
  }
  return null;
}

const EXCLUDED_PATHS = /^\/(api|_next|_vercel|auth|admin|progress|videos|vr)(\/|$)/;
const STATIC_FILE = /\.(svg|png|jpg|jpeg|gif|webp|mp4|ico|css|js|woff2?|ttf|eot|pdf|txt|xml|json)$/;

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Redirect legacy preview/proposal routes to the live landing (preserves locale prefix later)
  const legacyTarget = getLegacyRedirectPath(pathname);
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  if (STATIC_FILE.test(pathname)) {
    return await updateSession(request);
  }

  if (EXCLUDED_PATHS.test(pathname)) {
    return await updateSession(request);
  }

  const intlResponse = intlMiddleware(request);

  if (intlResponse.headers.get("x-middleware-rewrite") || intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
