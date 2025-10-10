"use client"

import { actionSelector } from "@/components/custom/action-selector";
import { ScoreDistribution } from "../components/custom-barchart";
import { DashboardHeader } from "../components/header";
import { Metrics } from "../components/metrics";
import { PerformanceTrends } from "./components/performance-trends";

const performanceData = [
    { label: "Jan", career: 56, skills: 22 },
    { label: "Feb", career: 54, skills: 21 },
    { label: "Mar", career: 33, skills: 13 },
    { label: "Apr", career: 56, skills: 22 },
    { label: "May", career: 53, skills: 20 },
    { label: "Jun", career: 40, skills: 18 },
    { label: "Jul", career: 39, skills: 17 },
    { label: "Aug", career: 41, skills: 19 },
    { label: "Sep", career: 52, skills: 23 },
    { label: "Oct", career: 59, skills: 25 },
    { label: "Nov", career: 48, skills: 21 },
    { label: "Dec", career: 32, skills: 12 },
];

const AssessmentScoreData = [
    { label: "90-100", count: 73 },
    { label: "80-89", count: 46 },
    { label: "70-79", count: 38 },
    { label: "60-69", count: 58 },
    { label: "<60", count: 37 },
];

const chartSelectData = {
    placeholder: "Talent",
    values: [
        {
            label: "Talent",
            val: "talent"
        },
        {
            label: "Growth",
            val: "growth"
        }
    ]
}

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
                data={AssessmentScoreData}
                yLabel="No. of Learners"
                xLabel="Scores(%)"
                averageLine={48}
                actionSlot={actionSelector(chartSelectData)}
            />
        </>
    );
}