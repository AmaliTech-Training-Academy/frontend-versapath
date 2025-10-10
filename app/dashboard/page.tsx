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
import { RoleReadinessHeatmap } from "./components/role-readiness-heatmap";
import { ScoreDistribution } from "./components/custom-barchart";
import { actionSelector } from "@/components/custom/action-selector";

const AssessmentScoreData = [
  { label: "90-100", count: 73 },
  { label: "80-89", count: 46 },
  { label: "70-79", count: 38 },
  { label: "60-69", count: 58 },
  { label: "<60", count: 37 },
];

const chartSelectData = {
  placeholder: "Talent",
  values: [
    {
      label: "Talent",
      val: "talent"
    },
    {
      label: "Growth",
      val: "growth"
    }
  ]
};

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user.role;  

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <Metrics />
      {(role === Roles.LEARNER || role === Roles.MENTOR) && (
        <QuickActions role={role} />
      )}

      {role === Roles.LEARNER && (
        <section className="grid grid-cols-3 gap-6">
          <RoadmapList />
          <RecentActivityList />
        </section>
      )}

      {role === Roles.MENTOR && (
        <section className="grid grid-cols-2 gap-6">
          <RecentSubmissions submissions={dummySubmissions} />
          <UpcomingAssessments
            assessments={sampleAssessments}
            days={sampleDays}
          />
        </section>
      )}
      {
        session?.user.role === Roles.MANAGER && (
          <>
            <ScoreDistribution
              data={AssessmentScoreData}
              yLabel="No. of Learners"
              xLabel="Scores(%)"
              averageLine={48}
              actionSlot={actionSelector(chartSelectData)}
            />
            <RoleReadinessHeatmap />
          </>
        )
      }
    </>
  );
}
