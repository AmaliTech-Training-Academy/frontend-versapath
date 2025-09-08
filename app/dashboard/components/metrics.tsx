import { metrics } from "@/lib/api/metrics";
import { MetricsCard } from "./metrics-card";

export const Metrics = () => {
    return (
        <section className="w-full grid grid-cols-4 gap-6">
            {
                metrics.map(metric => (
                    <MetricsCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} />
                ))
            }
        </section>
    );
};