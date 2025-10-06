import { learners } from "@/lib/api/mentor-learners";
import { LearnerCard } from "./learner-card";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { LearnerContent } from "./learner-content";

export const LearnerList = () => {
    return (
        <article className="grid grid-cols-2 gap-4">
            {
                learners.map(learner => (
                    <SheetWrapper
                        key={learner.id}
                        trigger={<LearnerCard key={learner.id} learner={learner} hover />}
                        headerTitle="Learner Details"
                    >
                        <LearnerContent learner={learner} />
                    </SheetWrapper>
                ))
            }
        </article>
    );
};