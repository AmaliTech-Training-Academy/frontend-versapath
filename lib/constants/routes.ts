import { Roles } from "../types";
export const protectedPaths = [
  {
    title: "Dashboard",
    url: "/dashboard",
    role: [Roles.LEARNER, Roles.MENTOR, Roles.MANAGER, Roles.ADMIN],
  },
  {
    title: "User Management",
    url: "/dashboard/user-management",
    role: [Roles.ADMIN],
  },
];

export const publicPaths = [
  "/",
  "/login",
  "/register",
  "/unauthorized",
  "/reset-password",
  "/reset-password/new",
  "/reset-password/verify-email",
];
