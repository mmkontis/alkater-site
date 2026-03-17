import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const BYPASS_COOKIE = "site_preview";

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  if (searchParams.get("test") === "true") {
    const response = await updateSession(request);
    response.cookies.set(BYPASS_COOKIE, "1", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  if (request.cookies.get(BYPASS_COOKIE)?.value === "1") {
    return await updateSession(request);
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
