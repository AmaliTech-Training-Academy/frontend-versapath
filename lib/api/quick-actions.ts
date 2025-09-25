import { BookOpen, CirclePlay, Map, MessageCircle,  Users } from "lucide-react";
import { Roles } from "@/lib/types";

type QuickAction = {
  title: string;
  description: string;
  icon: any;
};

const quickActionsConfig: Record<Roles, QuickAction[]> = {
  [Roles.LEARNER]: [
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
    },
    {
      title: "Browse Skills",
      description: "Explore skill to learn next.",
      icon: BookOpen,
    },
    {
      title: "Roadmaps",
      description: "Track your skill journey.",
      icon: Map,
    },
  ],
  [Roles.MENTOR]: [
    {
      title: "Review Submissions",
      description: "Evaluate learner work.",
      icon: Map,
    },
    {
      title: "Create Assessment",
      description: "Track learner details.",
      icon: BookOpen,
    },
    {
      title: "Manage Learners",
      description: "Track learner details.",
      icon: Users,
    },
    {
      title: "Send Feedback",
      description: "Share comments to help learners grow.",
      icon: MessageCircle,
    },
  ],
  [Roles.MANAGER]: [
    {
      title: "Team Overview",
      description: "Manage your team’s progress.",
      icon: Map,
    },
    {
      title: "Browse Skills",
      description: "Assign skills to team members.",
      icon: BookOpen,
    },
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
    },
  ],
  [Roles.ADMIN]: [
    {
      title: "Admin Panel",
      description: "Manage platform settings.",
      icon: Map,
    },
    {
      title: "User Management",
      description: "View and manage all users.",
      icon: BookOpen,
    },
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
    },
  ],
};

export const getQuickActions = (userRole: Roles): QuickAction[] => {
  return quickActionsConfig[userRole] || quickActionsConfig[Roles.LEARNER];
};
