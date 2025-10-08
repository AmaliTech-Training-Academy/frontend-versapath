"use client";

import { useTrack } from "@/lib/api/use-track";
import { DashboardHeader } from "../components/header";
import { GrowthTrackOverview } from "./components/growth-track-overview";
import { RoadmapTimeline } from "./components/roadmap-timeline";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SkillClustersPage() {
    const { data: session } = useSession();
    const id = session?.user.userId ?? "";
    const { track, loading, error } = useTrack(id);

    return (
        <div className="space-y-6">
            <DashboardHeader title="Roadmap" />
            {
                (loading || error || !track) ? (
                    <section className="bg-sidebar p-4 rounded-md flex items-center justify-center text-muted-foreground h-48">
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
                ) : (
                    <>
                        <GrowthTrackOverview track={track} />
                        <RoadmapTimeline capsules={track.capsules} />
                    </>
                )
            }
        </div>
    );
}
