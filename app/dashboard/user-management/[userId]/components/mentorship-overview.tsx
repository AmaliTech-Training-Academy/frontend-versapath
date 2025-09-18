import React from "react";
import StatCard from "./stat-card";

interface MentorshipOverviewProps {
  stats: {
    activeMentees: number;
    reviewsGiven: number;
    avgRating: number;
  };
}

export const MentorshipOverview: React.FC<MentorshipOverviewProps> = ({
  stats,
}) => (
  <section className="bg-[#ffffff] rounded-lg border-gray-text-strong/10 shadow p-6 flex flex-col gap-2 min-w-[320px]">
    <h2 className="text-lg font-semibold mb-2">Mentorship Overview</h2>
    <p className="text-sm text-gray-text-weak mb-4"> Mentee management and performance metrics</p>
    <div className="flex gap-6">
      <StatCard value={stats.activeMentees} title="Active Mentees" />
      <StatCard value={stats.reviewsGiven} title="Reviews Given" />
      <StatCard value={stats.avgRating} title="Avg Rating" />
    </div>
  </section>
);

export const DemoMentorshipOverview = () => (
  <MentorshipOverview
    stats={{
      activeMentees: 5,
      reviewsGiven: 24,
      avgRating: 4.8,
    }}
  />
);
