"use client";
import { LearnerCard } from "./learner-card";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { LearnerContent } from "./learner-content";
import { useMentorLearners } from "@/lib/api/use-mentor-learner";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import Image from "next/image";

export const LearnerList = () => {
    const { data: session } = useSession();
    const mentorId = session?.user.userId || "";
    const { learners, loading, error } = useMentorLearners(mentorId);

    if (loading) {
        return (
            <section className="flex items-center justify-center w-full h-96 text-muted-foreground">
                <Loader className="animate-spin" />
                <span>Loading...</span>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex flex-col items-center justify-center gap-2 w-full h-96">
                <Image
                    src={"/not-found.png"}
                    alt="Error loading learner list"
                    height={500}
                    width={500}
                />
                <span>{error}</span>
            </section>
        );
    }

    return (
        <article className="grid grid-cols-2 gap-4">
            {
                learners.map((learner, i) => (
                    <SheetWrapper
                        key={learner.firstName + learner.lastName + i}
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