import { DashboardHeader } from "./components/header";
import { MetricsCard } from "./components/metrics-card";
import { metrics } from "@/lib/api/metrics";

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
