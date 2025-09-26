"Use client";
import { Metrics } from "../components/metrics";
import { TopActions } from "../components/top-actions";

export default function AssessmentsPage() {
    return (
        <>
            <Metrics />
            <TopActions
                searchPlaceholder="Search by assessments"
                isRoleFilterable={false}
                isStatusFilterable={false}
                isAssessmentFilterable={true}
            />
        </>
    );
}