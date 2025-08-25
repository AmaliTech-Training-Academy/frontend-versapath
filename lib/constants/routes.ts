export const protectedPaths = [
  {
    title: "Dashboard",
    url: "/dashboard",
    role: ["LEARNER", "MENTOR", "MANAGER", "ADMIN"],
  },
  {
    title: "User Management",
    url: "/dashboard/user-management",
    role: ["ADMIN"],
  }
];

export const publicPaths = ["/", "/login", "/register", "/unauthorized"];