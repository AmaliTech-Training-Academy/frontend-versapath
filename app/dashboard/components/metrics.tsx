"use client";

import { Loader } from "lucide-react";
import { MetricsCard } from "./metrics-card";
import { useMetrics } from "@/lib/hooks/use-metrics";
import { Roles } from "@/lib/types";
import { useSession } from "next-auth/react";

export const Metrics = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Roles;
  const { metrics, isLoading, error } = useMetrics(userRole);

  if (isLoading || error) {
    return (
      <section className="w-full flex items-center justify-center gap-2 text-muted-foreground">
        {isLoading && (
          <>
            <Loader className="animate-spin" />
            <span>Loading...</span>
          </>
        )}

        {error && <span>Failed to feftch metrics. Please refresh the tab</span>}
      </section>
    );
  }

  return (
    <section className="w-full grid grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricsCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </section>
  );
};
