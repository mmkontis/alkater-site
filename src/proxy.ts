import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const EXCLUDED_PATHS = /^\/(api|_next|_vercel|auth|admin|coming-soon|concept-1|landing-gemini|progress|proposal|proposal-logo|proposals|static-underconstruction|underconstruction|videos|vr)(\/|$)/;
const STATIC_FILE = /\.(svg|png|jpg|jpeg|gif|webp|mp4|ico|css|js|woff2?|ttf|eot|pdf|txt|xml|json)$/;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
