import { Activity, CheckCircle, UsersIcon } from "lucide-react";
import { apiRequest } from "./api-request";

export const apiGetMetrics = async () => {
    const [userCount, learnerCount] = await Promise.all([
        apiRequest<number>("/users/count", "GET"),
        apiRequest<number>("/users/learners/count", "GET"),
    ]);

    return [
        {
            title: 'Total Users',
            value: userCount.data ?? 0,
            icon: UsersIcon
        },
        {
            title: 'Active Learners',
            value: learnerCount.data ?? 0,
            icon: UsersIcon
        },
        {
            title: 'Completed Skills',
            value: 0,
            icon: CheckCircle
        },
        {
            title: 'Active Growth Tracks',
            value: 0,
            icon: Activity
        }
    ];
}