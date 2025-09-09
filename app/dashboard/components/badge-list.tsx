import { dashboardBadges } from "@/lib/api/badges";
import { CardHeader } from "./card-header";
import { BadgeCard } from "./badge-card";

export const BadgeList = () => {
    return (
        <article className="bg-sidebar rounded-md p-5 space-y-4">
            <CardHeader title="My Badges" url="#" />
            <div className="space-y-7">
                {
                    dashboardBadges.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                    ))
                }
            </div>
        </article>
    );
}