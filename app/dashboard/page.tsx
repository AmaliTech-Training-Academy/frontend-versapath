import { BadgeList } from "./components/badge-list";
import { DashboardHeader } from "./components/header";
import { Metrics } from "./components/metrics";
import { QuickActions } from "./components/quick-actions";
import { RoadmapList } from "./components/roadmap-list";

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader title="Dashboard" />
            <Metrics />
            <QuickActions />
            <section className="grid grid-cols-3 gap-6">
                <RoadmapList />
                <BadgeList />
            </section>
        </>
    );
}
