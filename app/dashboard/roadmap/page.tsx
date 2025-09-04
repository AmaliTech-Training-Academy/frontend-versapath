import { DashboardHeader } from "../components/header";
import { roadmap } from "@/lib/api/roadmap";
import { GrowthTrackOverview } from "./components/growth-track-overview";

export default function SkillClustersPage() {
    const { name, description, progress, capsules } = roadmap;
    return (
        <>
            <DashboardHeader title="Roadmap" />
            <GrowthTrackOverview data={{ name, description, progress }} />
            <section>
            </section>
        </>
    );
}
