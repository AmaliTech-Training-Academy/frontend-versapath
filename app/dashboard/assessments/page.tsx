"Use client";
import { DashboardHeader } from "../components/header";
import { Metrics } from "../components/metrics";
import { TopActions } from "../components/top-actions";
import { AssessmentList } from "./components/assessment-list";

export default function AssessmentsPage() {
    return (
        <>
            <DashboardHeader title="Assessments" />
            <Metrics />
            <TopActions
                searchPlaceholder="Search by assessments"
                isRoleFilterable={false}
                isStatusFilterable={false}
                isAssessmentFilterable={true}
            />
            <AssessmentList />
        </>
    );
}