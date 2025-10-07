"use client";
import { LearnerCard } from "./learner-card";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { LearnerContent } from "./learner-content";
import { useMentorLearners } from "@/lib/api/use-mentor-learner";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

export const LearnerList = () => {
    const { data: session } = useSession();
    const mentorId = session?.user.userId || "";
    const { learners, loading, error } = useMentorLearners(mentorId);

    if (loading || error) {
        return (
            <section className="flex items-center justify-center w-full h-96">
                {
                    loading && (
                        <>
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </>
                    )
                }

                {error && <span>{error}</span>}
            </section>
        );
    }

    return (
        <article className="grid grid-cols-2 gap-4">
            {
                learners.map(learner => (
                    <SheetWrapper
                        key={learner.email + learner.firstName}
                        trigger={<LearnerCard learner={learner} hover />}
                        headerTitle="Learner Details"
                    >
                        <LearnerContent learner={learner} />
                    </SheetWrapper>
                ))
            }
        </article>
    );
};