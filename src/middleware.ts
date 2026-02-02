import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const intlResponse = intlMiddleware(request);

  const isLoggedIn = Boolean(request.cookies.get('access_token'));

  const protectRoutes = ["/profile", "/history","/support"];
  const authRoutes = ["/login", "/register"];

  if (!isLoggedIn && protectRoutes.includes(pathname)) {
    const redirectTo = pathname === "/history" ? "/login" : pathname === "/profile" ? "register" : pathname === "/support" ? "login" : "login"

    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url);
  }

  if(isLoggedIn && authRoutes.includes(pathname)){
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return intlResponse;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
