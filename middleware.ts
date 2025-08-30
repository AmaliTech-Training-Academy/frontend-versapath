import { NextResponse } from "next/server";
import { auth } from "./auth";
import { protectedPaths, publicPaths } from "./lib/constants/routes";
import { Roles } from "./lib/types";

// Authenticated middleware wrapper
export default auth(async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isAuthenticated = req.auth && req.auth.user;
  const authenticatedRole = req.auth?.user?.role as Roles


  // 1. Allow public routes
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login/register, redirect to dashboard
    if (isAuthenticated && ["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Protected routes
  if (isAuthenticated) {
    const matchedRoute = protectedPaths.find(({ url }) => pathname.startsWith(url));
    if (matchedRoute) {
      if (matchedRoute.role.includes(authenticatedRole)) {

        return NextResponse.next();
      } else {
        const errorMessage = encodeURIComponent("You don't have permission to access this page");
        return NextResponse.redirect(new URL(`/unauthorized?error=${errorMessage}`, req.url));
      }
    }
    return NextResponse.next(); // Allow access for paths that are not matched in protectedPaths
  }

  // 3. User is not authenticated
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
