import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ako netko slučajno ode na /en/dashboard ili /hr/dashboard,
  // skidamo jezični prefiks i preusmjeravamo na čisti /dashboard put -
  // dashboard nikad ne smije imati locale prefiks.
  const localizedDashboardMatch = pathname.match(/^\/(hr|en)(\/dashboard.*)$/);
  if (localizedDashboardMatch) {
    return NextResponse.redirect(new URL(localizedDashboardMatch[2], request.url));
  }

  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    const token = request.cookies.get("access_token");
    if (!token) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};