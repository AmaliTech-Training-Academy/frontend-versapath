import { BadgeCheck, BookOpen, CirclePlay, FileText, Map, MessageSquare, UsersIcon } from "lucide-react";
import { Roles } from "../types";

export const quickActions = [
    {
        title: 'Continue Learning',
        description: 'Pick up where you left off.',
        icon: CirclePlay,
        allowedRoles: [Roles.LEARNER]
    },
    {
        title: 'Browse Skills',
        description: 'Explore skill to learn next.',
        icon: BookOpen,
        allowedRoles: [Roles.LEARNER]
    },
    {
        title: 'Roadmaps',
        description: 'Track your skill journey.',
        icon: Map,
        allowedRoles: [Roles.LEARNER]
    },
    {
        title: 'My Badges',
        description: 'See your earned achievements',
        icon: BadgeCheck,
        allowedRoles: [Roles.LEARNER]
    },
    {
        title: 'Review Submissions',
        description: 'Evaluate learner work',
        icon: FileText,
        allowedRoles: [Roles.MENTOR]
    },
    {
        title: 'Create Assessment',
        description: 'Build tests or quizzes',
        icon: BookOpen,
        allowedRoles: [Roles.MENTOR]
    },
    {
        title: 'Manage Learners',
        description: 'Track learner details',
        icon: UsersIcon,
        allowedRoles: [Roles.MENTOR]
    },
    {
        title: 'Send Feedback',
        description: 'Share comments to help learners grow',
        icon: MessageSquare,
        allowedRoles: [Roles.MENTOR]
    }
];