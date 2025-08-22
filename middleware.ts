import { NextResponse } from "next/server";
import { auth } from "./auth";
import { protectedPaths, publicPaths } from "./lib/constants/routes";

// Authenticated middleware wrapper
export default auth(async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isAuthenticated = !!req.auth;
  const authenticatedRole = req.auth?.user?.role 

  // 1. Allow public routes
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login/register, redirect to dashboard
    if (isAuthenticated && ["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Protected routes
  const matchedRoute = protectedPaths.find(({ url }) => url === pathname);

  if (isAuthenticated) {
    if (matchedRoute) {
      // Check if user has the correct role
      if (matchedRoute.role.includes(authenticatedRole!)) {
        return NextResponse.next();
      } else {
        // Authenticated but unauthorized
        const errorMessage = encodeURIComponent(
          "You don't have permission to access this page"
        );
        return NextResponse.redirect(
          new URL(`/unauthorized?error=${errorMessage}`, req.url)
        );
      }
    } else {
      // If no specific match, allow access (optional — can be restricted if you prefer)
      return NextResponse.next();
    }
  }

  // 3. User is not authenticated
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};