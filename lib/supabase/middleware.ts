import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isLogin = path === "/admin/login";

  let user = null;
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("supabase-timeout")), 4000),
      ),
    ]);
    user = result.data.user;
  } catch {
    // Unreachable / slow Supabase — still allow the login page to render.
    if (isAdminArea && !isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "unavailable");
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (isAdminArea && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/reviews";
    return NextResponse.redirect(url);
  }

  if (isAdminArea && !isLogin && user) {
    try {
      const { data: profile } = await Promise.race([
        supabase
          .from("admin_profiles")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("supabase-timeout")), 4000),
        ),
      ]);

      if (!profile) {
        await supabase.auth.signOut();
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(url);
      }
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "unavailable");
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
