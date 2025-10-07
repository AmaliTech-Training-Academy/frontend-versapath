import { LearnerCard } from "./learner-card";
import { GrowthTrackInfo } from "./growth-track-info";
import { MentorReviewsCard } from "./mentor-reviews";
import { CurrentSkills } from "./current-skills";
import { MentorLearner } from "@/lib/api/use-mentor-learner";

export const LearnerContent = ({ learner }: { learner: MentorLearner }) => {
    return (
        <section className="pb-4 space-y-6">
            <LearnerCard learner={learner} />
            <GrowthTrackInfo />
            <CurrentSkills skills={["JWT", "React", "JavaScript"]} />
            <MentorReviewsCard />
        </section>
    )
};