import { MentorLearner } from "@/lib/api/use-mentor-learner";
import clsx from "clsx";
import Image from "next/image";
import placeholder from "@/public/images/user-placeholder.png";
import React from "react";

type LearnerCardProps = React.HTMLAttributes<HTMLDivElement> & {
    learner: MentorLearner;
    hover?: boolean;
};

export const LearnerCard = React.forwardRef<HTMLDivElement, LearnerCardProps>(
    (
        {
            learner,
            hover,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "rounded-xl border border-gray-stroke-weak bg-base-white p-5",
                    { "hover:border-brand-primary-text-weak hover:bg-brand-primary-fill": hover },
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-[11px]">
                    <Image
                        src={placeholder}
                        width={2457}
                        height={2460}
                        alt={learner.firstName + " " + learner.lastName}
                        className="w-[75px] h-[75px] rounded-full object-cover"
                    />
                    <div className="space-y-2.5">
                        <p className="font-semibold text-lg text-gray-text-strong">
                            {learner.firstName + " " + learner.lastName}
                        </p>
                        <p className="text-sm text-gray-text-weak">Learner</p>
                        <p className="text-sm text-gray-text-weak">{learner.email}</p>
                    </div>
                </div>
            </div>
        );
    }
);