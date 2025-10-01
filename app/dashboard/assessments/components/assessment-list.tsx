import { MentorAssessments } from "@/lib/api/assesments";
import { AssessmentCard } from "./assessment-card";
import { AssessmentContent } from "./assessment-content";
import { SheetWrapper } from "../../components/sheet-wrapper";

export const AssessmentList = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                MentorAssessments.map((assessment) => (
                    <SheetWrapper
                        key={assessment.id}
                        trigger={<AssessmentCard key={assessment.id} assessment={assessment} />}
                        headerTitle={assessment.title}
                    >
                        <AssessmentContent assessment={assessment} />
                    </SheetWrapper>
                ))
            }
        </section>
    );
};