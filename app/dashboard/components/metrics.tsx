"use client";

import { Loader } from "lucide-react";
import { MetricsCard } from "./metrics-card";
import { useMetrics } from "@/lib/hooks/use-metrics";
import { Roles } from "@/lib/types";
import { useSession } from "next-auth/react";
import { canSee } from "@/components/custom/app-sidebar";

export const Metrics = () => {
    const { metrics, isLoading, error } = useMetrics();
    const { data: session } = useSession();
    const userRole = session?.user?.role as Roles;

    if (isLoading || error) {
        return (
            <section className="w-full flex items-center gap-2 text-muted-foreground">
                {
                    isLoading && (
                        <>
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </>
                    )
                }

                {
                    error && (
                        <span>Failed to feftch metrics. Please refresh the tab</span>
                    )
                }
            </section>
        )
    }

    const filteredMetrics = metrics
        .filter((item) => canSee(userRole, item.allowedRoles));

    return (
        <section className="w-full grid grid-cols-4 gap-6">
            {
                filteredMetrics.map(metric => (
                    <MetricsCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} />
                ))
            }
        </section>
    );
};