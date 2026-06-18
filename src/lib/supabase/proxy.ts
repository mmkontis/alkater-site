import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest, appLocale?: string) {
  // Optionally forward the resolved locale as a request header so the root
  // layout (which sits above the [locale] segment) can set <html lang>.
  // When appLocale is omitted, this behaves exactly like NextResponse.next({ request }).
  const nextWithLocale = () => {
    if (!appLocale) return NextResponse.next({ request });
    const headers = new Headers(request.headers);
    headers.set("x-app-locale", appLocale);
    return NextResponse.next({ request: { headers } });
  };

  let supabaseResponse = nextWithLocale();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = nextWithLocale();
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin/dashboard")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
