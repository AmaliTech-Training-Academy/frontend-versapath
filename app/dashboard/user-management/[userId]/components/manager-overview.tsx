import React from "react";
import StatCard from "./stat-card";

interface ManagerOverviewProps {
  stats: {
    activeMentees: number;
    reviewsGiven: number;
    avgRating: number;
  };
}

export const ManagerOverview: React.FC<ManagerOverviewProps> = ({
  stats,
}) => (
  <section className="bg-[#ffffff] rounded-lg border-gray-text-strong/10 shadow p-6 flex flex-col gap-2 min-w-[320px]">
    <h2 className="text-lg font-semibold mb-2">Team Management Overview</h2>
    <p className="text-sm text-gray-text-weak mb-4">Team performance and project management metrics</p>
    <div className="flex gap-6">
      <StatCard value={stats.activeMentees} title="Team Members" />
      <StatCard value={stats.reviewsGiven} title="Active Project" />
      <StatCard value={stats.avgRating} title="Team Progress" />
    </div>
  </section>
);

export const DemoManagerOverview = () => (
  <ManagerOverview
    stats={{
      activeMentees: 8,
      reviewsGiven: 3,
      avgRating: 87,
    }}
  />
);
