import { vi, describe, test, expect, beforeAll, beforeEach, afterEach } from "vitest";
import type { NextRequest, NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

type AuthInfo = { user?: { role?: string } };

interface AuthenticatedRequest extends NextRequest {
    auth?: {
        user?: {
            role?: string;
        };
    };
}

vi.mock("../auth", () => ({
    auth: (fn: NextMiddleware): NextMiddleware => fn,
}));

const PUBLIC_PATHS = ["/", "/login", "/register", "/unauthorized"] as const;
const PROTECTED_PATHS = [
    { url: "/dashboard/user-management", role: ["ADMIN"] as const }, // specific FIRST
    { url: "/dashboard", role: ["ADMIN", "LEARNER", "MENTOR", "MANAGER"] as const },
];

// Deterministic routes (specific-first) and /unauthorized allowed as public.
vi.mock("../lib/constants/routes", () => ({
    publicPaths: PUBLIC_PATHS,
    protectedPaths: PROTECTED_PATHS,
}));

let middleware: any;

beforeAll(async () => {
    ({ default: middleware } = await import("../middleware"));
});

const context = {
    params: Promise.resolve({}),
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
    toString() {
        return this.href;
    }
}

const createRequest = (pathname: string, auth?: AuthInfo): AuthenticatedRequest => {
    const request = new Request(`http://localhost:3000${pathname}`, { method: "GET" });
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

beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(NextResponse, "redirect").mockImplementation((url: unknown) => {
        return new NextResponse(null, {
            status: 307,
            headers: { Location: String(url) },
        });
    });

    vi.spyOn(NextResponse, "next").mockImplementation(() => {
        return new NextResponse(null, { status: 200 });
    });
});

afterEach(() => {
    vi.clearAllMocks();
});

describe("Middleware", () => {
    describe("Public Routes", () => {
        test("allows unauthenticated access to all public paths", async () => {
            for (const path of PUBLIC_PATHS) {
                const request = createRequest(path);
                const response = (await middleware(request as any, context as any)) as Response;
                expect(response.status).toBe(200);
            }
        });

        test("redirects authenticated user from /login to /dashboard with 307", async () => {
            const request = createRequest("/login", { user: { role: "LEARNER" } });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe("http://localhost:3000/dashboard");
        });
    });

    describe("Protected Routes", () => {
        test("redirects unauthenticated user to /login with 307", async () => {
            const request = createRequest("/dashboard");
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe("http://localhost:3000/login");
        });

        test.each([
            { role: "ADMIN", path: "/dashboard/user-management" },
            { role: "LEARNER", path: "/dashboard" },
            { role: "MENTOR", path: "/dashboard" },
            { role: "MANAGER", path: "/dashboard" },
        ])("allows access for $role to $path", async ({ role, path }) => {
            const request = createRequest(path, { user: { role } });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(200);
        });

        test("redirects unauthorized role to /unauthorized with 307", async () => {
            const request = createRequest("/dashboard/user-management", { user: { role: "LEARNER" } });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe(
                "http://localhost:3000/unauthorized?error=You%20don%27t%20have%20permission%20to%20access%20this%20page"
            );
        });

        test("redirects authenticated user with no role to /unauthorized with 307", async () => {
            const request = createRequest("/dashboard", { user: {} });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe(
                "http://localhost:3000/unauthorized?error=You%20don%27t%20have%20permission%20to%20access%20this%20page"
            );
        });

        test("redirects authenticated user with invalid role to /unauthorized with 307", async () => {
            const request = createRequest("/dashboard", { user: { role: "INVALID" } });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe(
                "http://localhost:3000/unauthorized?error=You%20don%27t%20have%20permission%20to%20access%20this%20page"
            );
        });
    });

    describe("Unmatched Routes", () => {
        test("allows access to authenticated user for unmatched routes", async () => {
            const request = createRequest("/some-random-path", { user: { role: "LEARNER" } });
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(200);
        });

        test("redirects unauthenticated user to /login for unmatched routes with 307", async () => {
            const request = createRequest("/some-random-path");
            const response = (await middleware(request as any, context as any)) as Response;
            expect(response.status).toBe(307);
            const location = response.headers.get("Location");
            expect(location).toBe("http://localhost:3000/login");
        });
    });
});
