import { Activity, CheckCircle, UsersIcon } from "lucide-react";
import { DashboardHeader } from "./components/header";
import { MetricsCard } from "./components/metrics-card";

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader title="Dashboard" />
            <section className="bg-sidebar w-full grid grid-cols-4 gap-6">
                <MetricsCard title="Total Users" value={1000} icon={UsersIcon} />
                <MetricsCard title="Active Learners" value={900} icon={UsersIcon} />
                <MetricsCard title="Completed Skills" value={200} icon={CheckCircle} />
                <MetricsCard title="Active Growth Tracks" value={100} icon={Activity} />
            </section>
        </>
    );
}
