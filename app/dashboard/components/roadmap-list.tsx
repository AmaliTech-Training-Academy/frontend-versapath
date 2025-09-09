import { dashboardRoadmaps } from "@/lib/api/roadmap";
import { CardHeader } from "./card-header";
import { RoadmapCard } from "./roadmap-card";

export const RoadmapList = () => {
    return (
        <article className="rounded-xl p-5 space-y-4 bg-sidebar col-span-2">
            <CardHeader title="My Learning Roadmaps" url="#" />
            <div className="space-y-2">
                {
                    dashboardRoadmaps.map((roadmap) => (
                        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                    ))
                }
            </div>
        </article>
    );
}