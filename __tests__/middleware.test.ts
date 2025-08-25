type AuthInfo = { user?: { role?: string } };
import { NextRequest, NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import middleware from "../middleware";
import { publicPaths } from "../lib/constants/routes";
import { vi, describe, test, expect, beforeEach } from 'vitest';

interface AuthenticatedRequest extends NextRequest {
    auth?: {
        user?: {
            role?: string;
        };
    };
}

// Mock auth middleware wrapper
vi.mock("../auth", () => ({
    auth: (fn: NextMiddleware): NextMiddleware => fn,
}));

describe("Middleware", () => {
    // Setup the context object with params that match AppRouteHandlerFnContext
    const context = {
        params: Promise.resolve({})
    } as const;

    class MockNextURL {
        pathname: string;
        href: string;
        search = "";
        searchParams = new URLSearchParams();
        origin = "http://localhost:3000";
        protocol = "http:";
        host = "localhost:3000";
        hostname = "localhost";
        port = "3000";
        hash = "";

        constructor(pathname: string) {
            this.pathname = pathname;
            this.href = `http://localhost:3000${pathname}`;
        }

        toString(): string { return this.href; }
    }

    beforeEach(() => {
        // Mock NextResponse
        vi.spyOn(NextResponse, "redirect").mockImplementation((url: URL | string) => {
            return new NextResponse(null, {
                status: 307,
                headers: { Location: url.toString() },
            });
        });

        vi.spyOn(NextResponse, "next").mockImplementation(() => {
            return new NextResponse(null, { status: 200 });
        });
    });

    const createRequest = (pathname: string, auth?: AuthInfo): AuthenticatedRequest => {
        const request = new Request(`http://localhost:3000${pathname}`, {
            method: 'GET',
        });

        return Object.assign(request, {
            nextUrl: new MockNextURL(pathname),
            auth,
            cookies: {
                get: () => undefined,
                getAll: () => [],
                has: () => false,
                delete: () => { },
                set: () => { },
            },
        }) as unknown as AuthenticatedRequest;
    };

    describe("Public Routes", () => {
        test.each(publicPaths)("allows unauthenticated access to public path %s", async (path) => {
            const request = createRequest(path);
            const response = await middleware(request, context);
            expect((response as NextResponse).status).toBe(200);
        });

        test("redirects authenticated user from login to dashboard with 307", async () => {
            const request = createRequest("/login", { user: { role: "LEARNER" } });
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toBe("http://localhost:3000/dashboard");
        });
    });

    describe("Protected Routes", () => {
        test("redirects unauthenticated user to login with 307", async () => {
            const request = createRequest("/dashboard");
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toBe("http://localhost:3000/login");
        });

        test.each([
            { role: "ADMIN", path: "/dashboard/user-management" },
            { role: "LEARNER", path: "/dashboard" },
            { role: "MENTOR", path: "/dashboard" },
            { role: "MANAGER", path: "/dashboard" },
        ])("allows access for $role to $path", async ({ role, path }) => {
            const request = createRequest(path, { user: { role } });
            const response = await middleware(request, context);
            expect((response as NextResponse).status).toBe(200);
        });

        test("redirects unauthorized role to unauthorized page with 307", async () => {
            const request = createRequest("/dashboard/user-management", { user: { role: "LEARNER" } });
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toContain("/unauthorized");
            expect(location).toContain("error=You");
        });

        test("redirects authenticated user with no role to login with 307", async () => {
            const request = createRequest("/dashboard", { user: {} });
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toBe("http://localhost:3000/unauthorized?error=You%20don%27t%20have%20permission%20to%20access%20this%20page");
        });

        test("redirects authenticated user with invalid role to login with 307", async () => {
            const request = createRequest("/dashboard", { user: { role: "INVALID" } });
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toBe("http://localhost:3000/unauthorized?error=You%20don%27t%20have%20permission%20to%20access%20this%20page");
        });
    });

    describe("Unmatched Routes", () => {
        test("allows access to authenticated user for unmatched routes", async () => {
            const request = createRequest("/some-random-path", { user: { role: "LEARNER" } });
            const response = await middleware(request, context);
            expect((response as NextResponse).status).toBe(200);
        });

        test("redirects unauthenticated user to login for unmatched routes with 307", async () => {
            const request = createRequest("/some-random-path");
            const response = await middleware(request, context);
            expect(response).toBeInstanceOf(Response);
            expect((response as Response).status).toBe(307);
            const location = (response as NextResponse).headers.get("Location");
            expect(location).toBe("http://localhost:3000/login");
        });
    });
});
