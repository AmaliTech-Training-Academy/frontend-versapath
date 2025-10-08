"use client";

import { CardHeader } from "./card-header";
import { RoadmapCard } from "./roadmap-card";
import { useAllTracks } from "@/lib/api/use-track";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

export const RoadmapList = () => {
    const { data: session } = useSession();
    const id = session?.user.userId ?? "";
    const { tracks, loading, error } = useAllTracks(id);
    return (
        <article className="rounded-xl p-5 space-y-4 bg-sidebar col-span-2">
            <CardHeader title="My Learning Roadmaps" url="#" />
            {
                (loading || error || !tracks) ? (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader className="animate-spin" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {
                            tracks.map((track) => (
                                <RoadmapCard key={track.trackId} track={track} />
                            ))
                        }
                    </div>
                )
            }
        </article>
    );
}