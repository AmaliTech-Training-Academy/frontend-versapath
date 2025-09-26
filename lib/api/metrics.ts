import { Activity, BadgeCheck, BookOpen, CheckCircle, CircleCheckBig, FileText, Flame, UsersIcon } from "lucide-react";
import { apiRequest } from "./api-request";
import { Roles } from "../types";

export const apiGetMetrics = async () => {
    const [userCount, learnerCount] = await Promise.all([
        apiRequest<number>("/users/count", "GET"),
        apiRequest<number>("/users/learners/count", "GET"),
    ]);

    return [
        {
            title: 'Total Users',
            value: userCount.data ?? 0,
            icon: UsersIcon,
            allowedRoles: [Roles.ADMIN]
        },
        {
            title: 'Active Learners',
            value: learnerCount.data ?? 0,
            icon: UsersIcon,
            allowedRoles: [Roles.ADMIN]
        },
        {
            title: 'Completed Skills',
            value: 0,
            icon: CheckCircle,
            allowedRoles: [Roles.ADMIN]
        },
        {
            title: 'Active Growth Tracks',
            value: 0,
            icon: Activity,
            allowedRoles: [Roles.ADMIN]
        },
        {
            title: 'Total Skills',
            value: 0,
            icon: BookOpen,
            allowedRoles: [Roles.LEARNER]
        },
        {
            title: 'Skills Completed',
            value: 0,
            icon: CircleCheckBig,
            allowedRoles: [Roles.LEARNER]
        },
        {
            title: 'Badges Earned',
            value: 0,
            icon: BadgeCheck,
            allowedRoles: [Roles.LEARNER]
        },
        {
            title: 'Learning Streaks',
            value: 0,
            icon: Flame,
            allowedRoles: [Roles.LEARNER]
        },
        {
            title: 'Assigned Learners',
            value: 0,
            icon: UsersIcon,
            allowedRoles: [Roles.MENTOR]
        },
        {
            title: 'Pending Reviews',
            value: 0,
            icon: FileText,
            allowedRoles: [Roles.MENTOR]
        },
        {
            title: 'Completed Reviews',
            value: 0,
            icon: CircleCheckBig,
            allowedRoles: [Roles.MENTOR]
        },
        {
            title: 'Active Assessments',
            value: 0,
            icon: BookOpen,
            allowedRoles: [Roles.MENTOR]
        }
    ];
}