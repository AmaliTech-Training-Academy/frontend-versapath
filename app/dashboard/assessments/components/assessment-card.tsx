import { MentorAssessment } from "@/lib/api/assesments";
import { AssessmentStatus } from "@/lib/types";
import { clsx } from "clsx";

export const AssessmentCard = ({
    assessment
}:{
    assessment: MentorAssessment
}) => {
    return (
        <article className="space-y-3 p-4 rounded-xl border border-gray-stroke-weak">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <span className="font-semibold text-gray-text-strong">{assessment.title}</span>
                    <div className=" flex items-center justify-center rounded-2xl border border-brand-primary-text-weak bg-brand-primary-stroke-strong px-2">
                        <span className="text-xs text-base-white">{assessment.type}</span>
                    </div>
                </div>
                <div className={clsx(
                    "rounded-xl py-0.5 px-3 text-xs flex items-center justify-center",
                    {
                        "bg-gray-stroke-weak border border-gray-stroke-strong text-gray-text-weak": assessment.status === AssessmentStatus.DRAFT,
                        "bg-brand-primary-text-weak border border-brand-primary-text text-brand-primary-text": assessment.status === AssessmentStatus.ACTIVE,
                        "bg-amber-stroke-weak border border-amber-stroke-strong text-gray-text-strong": assessment.status === AssessmentStatus.SCHEDULED,
                        "bg-red-stroke-weak border border-red-stroke-strong text-red-text": assessment.status === AssessmentStatus.ARCHIVED,
                    }
                )}>
                    <span className="">{assessment.status}</span>
                </div>
            </div>
            <div className="space-x-1 text-sm text-gray-text-weak">
                <span>Created:</span>
                <span>{assessment.createdAt}</span>
            </div>
            <div className="space-x-1">
                
            </div>
        </article>
    )
};