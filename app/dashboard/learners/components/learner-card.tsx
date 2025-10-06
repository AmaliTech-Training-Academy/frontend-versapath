import { Learner } from "@/lib/api/mentor-learners";
import clsx from "clsx";
import Image from "next/image";

export const LearnerCard = ({ learner, hover }: { learner: Learner, hover?: boolean }) => {
    return (
        <div className={clsx(
            "rounded-xl border border-gray-stroke-weak bg-base-white p-5",
            {
                "hover:border-brand-primary-text-weak hover:bg-brand-primary-fill": hover,
            }
        )}>
            <div className="flex items-center gap-[11px]">
                <Image
                    src={learner.image}
                    width={2457}
                    height={2460}
                    alt={learner.fullName}
                    className="w-[75px] h-[75px] rounded-full object-cover"
                />
                <div className="space-y-2.5">
                    <p className="font-semibold text-lg text-gray-text-strong">{learner.fullName}</p>
                    <p className="text-sm text-gray-text-weak">{learner.role}</p>
                    <p className="text-sm text-gray-text-weak">{learner.email}</p>
                </div>
            </div>
        </div>
    );
};