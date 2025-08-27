import { Activity, CheckCircle, UsersIcon } from "lucide-react";
import { DashboardHeader } from "./components/header";
import { MetricsCard } from "./components/metrics-card";

const metrics = [
    {
        title: 'Total Users',
        value: 0,
        icon: UsersIcon
    },
    {
        title: 'Active Learners',
        value: 0,
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
]

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader title="Dashboard" />
            <section className="bg-sidebar w-full grid grid-cols-4 gap-6">
                {
                    metrics.map(metric => (
                        <MetricsCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} />
                    ))
                }
            </section>
        </>
    );
}
