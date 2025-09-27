import { MentorAssessments } from "@/lib/api/assesments";
import { AssessmentCard } from "./assessment-card";

export const AssessmentList = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                MentorAssessments.map((assessment) => (
                    <AssessmentCard key={assessment.id} assessment={assessment} />
                ))
            }
        </section>
    );
};