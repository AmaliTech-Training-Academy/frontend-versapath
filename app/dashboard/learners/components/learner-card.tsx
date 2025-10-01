import { Learner } from "@/lib/api/mentor-learners";
import Image from "next/image";

export const LearnerCard = ({ learner }: { learner: Learner }) => {
    return (
        <div className="rounded-xl border border-gray-stroke-weak hover:border-brand-primary-text-weak bg-base-white hover:bg-brand-primary-fill p-5">
            <div className="flex items-center gap-[11px]">
                <Image
                    src={learner.image}
                    width={2457}
                    height={2460}
                    alt={learner.fullName}
                    className="w-[75px] h-[75px] rounded-full object-cover"
                />
                <div className="space-y-2.5"></div>
            </div>
        </div>
    );
};