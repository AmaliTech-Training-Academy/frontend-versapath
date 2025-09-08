import { DashboardHeader } from "./components/header";
import { Metrics } from "./components/metrics";
import { QuickActions } from "./components/quick-actions";

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader title="Dashboard" />
            <Metrics />
            <QuickActions />
        </>
    );
}
