"use client"

import { actionSelector } from "@/components/custom/action-selector";
import { ScoreDistribution } from "../components/custom-barchart";
import { DashboardHeader } from "../components/header";
import { Metrics } from "../components/metrics";
import { PerformanceTrends } from "./components/performance-trends";
import { assessmentScoreData, chartSelectData, performanceData } from "@/lib/api/analytics";

export default function AnalyticsPage() {
    return (
        <>
            <DashboardHeader title="Analytics" />
            <Metrics />
            <PerformanceTrends
                data={performanceData}
                title="Performance Trends"
                yDomain={[0, 100]}
                showGrid
            />
            <ScoreDistribution
                data={assessmentScoreData}
                yLabel="No. of Learners"
                xLabel="Scores(%)"
                averageLine={48}
                actionSlot={actionSelector(chartSelectData)}
            />
        </>
    );
}