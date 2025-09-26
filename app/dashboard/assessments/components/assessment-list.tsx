import { MentorAssessments } from "@/lib/api/assesments";
import { AssessmentCard } from "./assessment-card";

export const AssessmentList = () => {
    return (
        <section>
            {MentorAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
        </section>
    );
};