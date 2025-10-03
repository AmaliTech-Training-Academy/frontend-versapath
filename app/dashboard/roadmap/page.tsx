"use client";

import { useTrack } from "@/lib/api/use-track";
import { DashboardHeader } from "../components/header";
import { GrowthTrackOverview } from "./components/growth-track-overview";
import { RoadmapTimeline } from "./components/roadmap-timeline";
import { Loader } from "lucide-react";

export default function SkillClustersPage() {
    const { track, loading, error } = useTrack();

    if (loading || error || !track) {
        return (
            <section className="bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom rounded-md overflow-hidden bg-brand-primary-fill">
                {
                    loading && (
                        <>
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </>
                    )
                }

                {error && <span>{error}</span>}
            </section>
        );
    }

    return (
        <div className="space-y-6">
            <DashboardHeader title="Roadmap" />
            <GrowthTrackOverview track={track} loading={loading} error={error} />
            <RoadmapTimeline capsules={track.capsules} />
        </div>
    );
}
