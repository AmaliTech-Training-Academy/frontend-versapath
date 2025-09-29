import { NextResponse } from "next/server";
import { auth } from "./auth";
import { protectedPaths, publicPaths } from "./lib/constants/routes";
import { Roles } from "./lib/types";

function isBoundaryMatch(pathname: string, base: string) {
  if (!pathname.startsWith(base)) return false;
  if (pathname.length === base.length) return true;
  return pathname.charAt(base.length) === "/";
}

// Authenticated middleware wrapper
export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAuthenticated = req.auth?.user;
  const rawRole = req.auth?.user?.role;
  const authenticatedRole = typeof rawRole === "string" ? rawRole.toUpperCase() : undefined;

  // 1. Allow public routes
  const isPublic = publicPaths.some((pub) =>
    pathname === pub || pathname.startsWith(pub + "/")
  );

  if (isPublic) {
    if (isAuthenticated && ["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Protected routes
  if (isAuthenticated) {
    const matches = protectedPaths.filter(({ url }) => isBoundaryMatch(pathname, url));
    const matchedRoute = matches.toSorted((a, b) => b.url.length - a.url.length)[0];


    if (!matchedRoute) {
      return NextResponse.next();
    }

    // Guard if role missing
    if (!authenticatedRole) {
      const msg = encodeURIComponent("Your account role is missing.");
      return NextResponse.redirect(new URL(`/unauthorized?error=${msg}`, req.url));
    }

    if (matchedRoute.role.includes(authenticatedRole as Roles)) {
      return NextResponse.next();
    } else {
      const msg = encodeURIComponent("You don't have permission to access this page");
      return NextResponse.redirect(new URL(`/unauthorized?error=${msg}`, req.url));
    }
  }

  // 3. User is not authenticated
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf)$).*)',
  ],
};
