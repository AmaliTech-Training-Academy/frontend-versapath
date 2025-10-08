import { BadgeCheck, BookOpen, CirclePlay, LucideIcon, Map, MessageCircle,  Users } from "lucide-react";
import { Roles } from "@/lib/types";

type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
  url: string
};

const quickActionsConfig: Record<Roles, QuickAction[]> = {
  [Roles.LEARNER]: [
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
      url: "#"
    },
    {
      title: "Browse Skills",
      description: "Explore skill to learn next.",
      icon: BookOpen,
      url: "/dashboard/skills"
    },
    {
      title: "Roadmaps",
      description: "Track your skill journey.",
      icon: Map,
      url: "/dashboard/roadmap"
    },
    {
      title: "My Badges",
      description: "See your earned achievements",
      icon: BadgeCheck,
      url: "/dashboard/badges"
    }
  ],
  [Roles.MENTOR]: [
    {
      title: "Review Submissions",
      description: "Evaluate learner work.",
      icon: Map,
      url: "/dashboard/submissions"
    },
    {
      title: "Create Assessment",
      description: "Track learner details.",
      icon: BookOpen,
      url: "#"
    },
    {
      title: "Manage Learners",
      description: "Track learner details.",
      icon: Users,
      url: "/dashboard/learners"
    },
    {
      title: "Send Feedback",
      description: "Share comments to help learners grow.",
      icon: MessageCircle,
      url: "#"
    },
  ],
  [Roles.MANAGER]: [
    {
      title: "Team Overview",
      description: "Manage your team’s progress.",
      icon: Map,
      url: ""
    },
    {
      title: "Browse Skills",
      description: "Assign skills to team members.",
      icon: BookOpen,
      url: ""
    },
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
      url: ""
    },
  ],
  [Roles.ADMIN]: [
    {
      title: "Admin Panel",
      description: "Manage platform settings.",
      icon: Map,
      url: ""
    },
    {
      title: "User Management",
      description: "View and manage all users.",
      icon: BookOpen,
      url: ""
    },
    {
      title: "Continue Learning",
      description: "Pick up where you left off.",
      icon: CirclePlay,
      url: ""
    },
  ],
};

export const getQuickActions = (userRole: Roles): QuickAction[] => {
  return quickActionsConfig[userRole] || quickActionsConfig[Roles.LEARNER];
};
