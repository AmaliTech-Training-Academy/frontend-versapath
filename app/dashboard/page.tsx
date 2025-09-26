import { auth } from "@/auth";
import { DashboardHeader } from "./components/header";
import { Metrics } from "./components/metrics";
import { QuickActions } from "./components/quick-actions";
import { RecentActivityList } from "./components/recent-activity-list";
import { RoadmapList } from "./components/roadmap-list";
import { Roles } from "@/lib/types";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <Metrics />
      {(session?.user.role === Roles.LEARNER || session?.user.role === Roles.MENTOR) && (
        <>
          <QuickActions />
          <section className="grid grid-cols-3 gap-6">
            <RoadmapList />
            <RecentActivityList />
          </section>
        </>
      )}
    </>
  );
}
