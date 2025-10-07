import {
  Activity,
  BadgeCheck,
  BookOpen,
  CheckCircle,
  FileText,
  Flame,
  UsersIcon,
  LucideIcon,
} from "lucide-react";
import { apiRequest } from "./api-request";
import { Roles } from "@/lib/types";
import { ListData } from "../types/api";
import { MentorLearner } from "./use-mentor-learner";

export const apiGetMetrics = async (userRole: Roles, mentorId?: string) => {
  const metricConfigs: Record<
    Roles,
    { title: string; value: number; icon: LucideIcon }[]
  > = {
    [Roles.ADMIN]: [
      {
        title: "Total Users",
        value: (await apiRequest<number>("/users/count", "GET")).data ?? 0,
        icon: UsersIcon
      },
      {
        title: "Active Learners",
        value: (await apiRequest<number>("/users/learners/count", "GET")).data ?? 0,
        icon: UsersIcon,
      },
      {
        title: "Completed Skills",
        value: 0,
        icon: CheckCircle
      },
      {
        title: "Active Growth Tracks",
        value: 0,
        icon: Activity
      },
    ],
    [Roles.LEARNER]: [
      {
        title: "Total Skills",
        value: 0,
        icon: BookOpen,
      },
      {
        title: "Completed Skills",
        value: 0,
        icon: CheckCircle
      },
      {
        title: "Badges Earned",
        value: 0,
        icon: BadgeCheck
      },
      {
        title: "Learning Streaks",
        value: 0,
        icon: Flame
      },
    ],
    [Roles.MENTOR]: [
      {
        title: "Assigned Learners",
        value: (await apiRequest<ListData<MentorLearner>>(`/roadmap/mentors/assigned-learners/${mentorId}`, "GET")).data?.items.length ?? 0,
        icon: UsersIcon,
      },
      {
        title: "Pending Reviews",
        value: 8,
        icon: FileText
      },
      {
        title: "Completed Reviews",
        value: 156,
        icon: CheckCircle
      },
      {
        title: "Active Assessments",
        value: 12,
        icon: BookOpen
      },
    ],
    [Roles.MANAGER]: [
      {
        title: "Team Learners",
        value: 25,
        icon: UsersIcon
      },
      {
        title: "Skills Validated",
        value: 81,
        icon: FileText
      },
      {
        title: "High Readiness",
        value: 12,
        icon: BookOpen
      },
      {
        title: "Avg. Assessment Score",
        value: 81,
        icon: UsersIcon
      },
    ],
  };
  // Default to LEARNER if role not found
  const metrics = metricConfigs[userRole];
  return metrics;
};
