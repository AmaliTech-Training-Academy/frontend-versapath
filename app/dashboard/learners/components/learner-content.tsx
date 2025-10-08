"use client";
import { LearnerCard } from "./learner-card";
import { GrowthTrackInfo } from "./growth-track-info";
import { MentorReviewsCard } from "./mentor-reviews";
import { CurrentSkills } from "./current-skills";
import { MentorLearner } from "@/lib/api/use-mentor-learner";
import { useTrack } from "@/lib/api/use-track";

export const LearnerContent = ({ learner }: { learner: MentorLearner }) => {
    const { track } = useTrack(learner.userId);
    const skills_completed = track?.capsules.filter(capsule => capsule.status === "COMPLETED");

    return (
        <section className="pb-4 space-y-6">
            <LearnerCard learner={learner} />
            <GrowthTrackInfo track={track} />
            <CurrentSkills skills={skills_completed} />
            <MentorReviewsCard />
        </section>
    )
};