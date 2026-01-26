"Use client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../components/header";
import { Metrics } from "../components/metrics";
import { SheetWrapper } from "../components/sheet-wrapper";
import { TopActions } from "../components/top-actions";
import { AssessmentList } from "./components/assessment-list";
import { CreateAssesmentForm } from "./components/create-assesment-form";
import { Plus } from "lucide-react";

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
        rightActions={
          <SheetWrapper
            trigger={
              <Button>
                <Plus /> Create Assesment
              </Button>
            }
            headerTitle="Create assesment"
            headerDescription="Submit essential data to create an assesment on moodle"
          >
            <CreateAssesmentForm />
          </SheetWrapper>
        }
      />
      <AssessmentList />
    </>
  );
}
