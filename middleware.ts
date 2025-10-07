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
function handlePublicRoute(req: any, pathname: string, isAuthenticated: boolean, authenticatedRole: string | undefined, requiresOnboarding: boolean) {
  const isPublic = publicPaths.some((pub) =>
    pathname === pub || pathname.startsWith(pub + "/")
  );

  if (!isPublic) return null;

  if (isAuthenticated) {
    const target =
      authenticatedRole === "LEARNER" && requiresOnboarding
        ? "/onboarding"
        : "/dashboard";
    if (["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL(target, req.url));
    }
  }
  return NextResponse.next();
}

function handleLearnerOnboarding(req: any, pathname: string, authenticatedRole: string | undefined, requiresOnboarding: boolean) {
  if (authenticatedRole !== "LEARNER") return null;

  if (requiresOnboarding && !isBoundaryMatch(pathname, "/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (!requiresOnboarding && isBoundaryMatch(pathname, "/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return null;
}

function handleProtectedRoute(req: any, pathname: string, authenticatedRole: string | undefined) {
  const matches = protectedPaths.filter(({ url }) => isBoundaryMatch(pathname, url));
  const matchedRoute = [...matches].sort((a, b) => b.url.length - a.url.length)[0];

  if (!matchedRoute) {
    return NextResponse.next();
  }

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

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAuthenticated = req.auth?.user;
  const rawRole = req.auth?.user?.role;
  const authenticatedRole = typeof rawRole === "string" ? rawRole.toUpperCase() : undefined;
  const requiresOnboarding = req.auth?.user?.requiresOnboarding;

  // 1. Allow public routes
  const publicResult = handlePublicRoute(req, pathname, !!isAuthenticated, authenticatedRole, !!requiresOnboarding);
  if (publicResult) return publicResult;

  // 2. Protected routes
  if (isAuthenticated) {
    const onboardingResult = handleLearnerOnboarding(req, pathname, authenticatedRole, !!requiresOnboarding);
    if (onboardingResult) return onboardingResult;

    return handleProtectedRoute(req, pathname, authenticatedRole);
  }

  // 3. User is not authenticated
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf)$).*)',
  ],
};
