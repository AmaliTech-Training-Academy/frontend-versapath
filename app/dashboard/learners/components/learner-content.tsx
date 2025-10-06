import { Learner } from "@/lib/api/mentor-learners";
import { LearnerCard } from "./learner-card";
import { GrowthTrackInfo } from "./growth-track-info";
import { MentorReviewsCard } from "./mentor-reviews";
import { CurrentSkills } from "./current-skills";

export const LearnerContent = ({ learner }: { learner: Learner }) => {
    return (
        <section className="pb-4 space-y-6">
            <LearnerCard learner={learner} />
            <GrowthTrackInfo />
            <CurrentSkills skills={learner.skills} />
            <MentorReviewsCard />
        </section>
    )
};