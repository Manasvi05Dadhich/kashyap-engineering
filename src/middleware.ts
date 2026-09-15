import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

// jsonwebtoken needs Node's crypto module, so this middleware must run
// on the Node.js runtime rather than the default Edge runtime.
export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin/login");
  
  if (!pathname.startsWith("/admin") || isLoginPage) {
    return NextResponse.next();
  }
  if (isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
