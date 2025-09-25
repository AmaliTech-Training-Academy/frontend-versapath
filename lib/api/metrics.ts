import { Activity, BadgeCheck, BookOpen, CheckCircle, CircleCheckBig, FileText, Flame, UsersIcon } from "lucide-react";
import { apiRequest } from "./api-request";
import { Roles } from "@/lib/types";

export const apiGetMetrics = async (userRole: Roles) => {
  const [userCount, learnerCount] = await Promise.all([
    apiRequest<number>("/users/count", "GET"),
    apiRequest<number>("/users/learners/count", "GET"),
  ]);
  const metricConfigs: Record<Roles, any[]> = {
    [Roles.ADMIN]: [
      { title: "Total Users", value: userCount.data ?? 0, icon: UsersIcon },
      {
        title: "Active Learners",
        value: learnerCount.data ?? 0,
        icon: UsersIcon,
      },
      { title: "Completed Skills", value: 0, icon: CheckCircle },
      { title: "Active Growth Tracks", value: 0, icon: Activity },
    ],
    [Roles.LEARNER]: [
      {
        title: "Total Skills",
        value: learnerCount.data ?? 0,
        icon: CheckCircle,
      },
      { title: "Completed Skills", value: 0, icon: CheckCircle },
      { title: "Badges Earned", value: 0, icon: UsersIcon },
      { title: "Learning Streaks", value: 0, icon: Activity },
    ],
    [Roles.MENTOR]: [
      { title: "Assigned Learners", value: learnerCount.data ?? 0, icon: UsersIcon },
      { title: "Pending Reviews", value: 8, icon: Activity },
      { title: "Completed Reviews", value: 200, icon: CheckCircle },
      { title: "Active Assessments", value: 30, icon: Activity },
    ],
    [Roles.MANAGER]: [
      { title: "Team Members", value: userCount.data ?? 0, icon: UsersIcon },
      { title: "Active Projects", value: 0, icon: Activity },
      { title: "Skills Developed", value: 0, icon: CheckCircle },
      { title: "Growth Tracks", value: 0, icon: Activity },
    ],
  };
  // Default to LEARNER if role not found
  const metrics =
    metricConfigs[userRole as Roles] || metricConfigs[Roles.MENTOR];
  return metrics;
};
