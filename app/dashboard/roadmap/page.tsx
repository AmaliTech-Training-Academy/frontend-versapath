"use client";

import { useTrack } from "@/lib/api/use-track";
import { DashboardHeader } from "../components/header";
import { GrowthTrackOverview } from "./components/growth-track-overview";
import { RoadmapTimeline } from "./components/roadmap-timeline";

export default function SkillClustersPage() {
    const { track, loading, error } = useTrack();

    return (
        <div className="space-y-6">
            <DashboardHeader title="Roadmap" />
            <GrowthTrackOverview track={track} loading={loading} error={error} />           
            <RoadmapTimeline trackId={track?.trackId ?? ""} />
        </div>
    );
}
