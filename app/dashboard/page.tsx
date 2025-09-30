import { auth } from "@/auth";
import { DashboardHeader } from "./components/header";
import { Metrics } from "./components/metrics";
import { QuickActions } from "./components/quick-actions";
import { RecentActivityList } from "./components/recent-activity-list";
import { RoadmapList } from "./components/roadmap-list";
import { Roles } from "@/lib/types";
import { RecentSubmissions } from "./components/recent-submissions";
import {
  dummySubmissions,
  sampleAssessments,
  sampleDays,
} from "@/lib/api/dummy-submissions";
import { UpcomingAssessments } from "./components/upcoming-assessments";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <Metrics />
      {session?.user.role === Roles.LEARNER && (
        <>
          <QuickActions role={Roles.LEARNER} />
          <section className="grid grid-cols-3 gap-6">
            <RoadmapList />
            <RecentActivityList />
          </section>
        </>
      )}
      {session?.user.role === Roles.MENTOR && (
        <>
          <QuickActions role={Roles.MENTOR} />
          <section className="grid grid-cols-2 gap-6">
            <RecentSubmissions submissions={dummySubmissions} />
            <UpcomingAssessments
              assessments={sampleAssessments}
              days={sampleDays}
            />
          </section>
        </>
      )}
    </>
  );
}
