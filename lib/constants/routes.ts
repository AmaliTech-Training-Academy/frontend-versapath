import { Roles } from "../types";
export const  protectedPaths = [
  {
    title: "Onboarding",
    url: "/onboarding",
    role: [Roles.LEARNER],
  },
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
  {
    title: "Skill Categories",
    url: "/dashboard/skill-categories",
    role: [Roles.ADMIN],
  },
  {
    title: "Skills",
    url: "/dashboard/skills",
    role: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    title: "Lessons",
    url: "/dashboard/lessons",
    role: [Roles.ADMIN],
  },
  {
    title: "Roadmap",
    url: "/dashboard/roadmap",
    role: [Roles.LEARNER],
  },
  {
    title: "Submissions",
    url: "/dashboard/submissions",
    role: [Roles.MENTOR]
  },
  {
    title: "Assessments",
    url: "/dashboard/assessments",
    role: [Roles.MENTOR]
  },
  {
    title: "Learners",
    url: "/dashboard/learners",
    role: [Roles.MENTOR]
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    role: [Roles.ADMIN, Roles.MANAGER, Roles.MENTOR, Roles.LEARNER]
  }
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
