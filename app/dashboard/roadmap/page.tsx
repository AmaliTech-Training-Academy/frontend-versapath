import { DashboardHeader } from "../components/header";
import { roadmap } from "@/lib/api/roadmap";
import { GrowthTrackOverview } from "./components/growth-track-overview";
import { CapsuleBox } from "./components/capsule-box";
import { RoadmapTimeline } from "./components/roadmap-timeline";

export default function SkillClustersPage() {
    const { name, description, progress, capsules } = roadmap;
    return (
        <div className="space-y-6">
            <DashboardHeader title="Roadmap" />
            <GrowthTrackOverview data={{ name, description, progress }} />
           
            <RoadmapTimeline capsules={capsules} />
        </div>
    );
}
