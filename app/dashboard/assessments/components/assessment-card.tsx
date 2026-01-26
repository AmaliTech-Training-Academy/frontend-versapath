import { MentorAssessment } from "@/lib/api/assesments";
import { AssessmentStatus } from "@/lib/types";
import { clsx } from "clsx";
import Image from "next/image";

export const AssessmentCard = ({
    assessment
}: {
    assessment: MentorAssessment
}) => {
    return (
        <article
            role="button"
            tabIndex={0}
            className="space-y-3 p-4 rounded-xl border border-gray-stroke-weak cursor-pointer hover:bg-brand-primary-fill hover:border-brand-primary-text-weak"
        >
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
            {/* This are commmented out for now, because the assigned field is not available in the API response */}
            
            {/* <div className="flex items-center gap-1">
                <span className="text-sm text-gray-text-weak">Assigned:</span>
                <div className="flex -space-x-2">
                    {
                        assessment.assigned.slice(0, 4).map((assignee) => (
                            <Image
                                src={assignee.profilePictureUrl}
                                alt={assignee.firstName}
                                key={assignee.id}
                                width={400}
                                height={400}
                                className="w-6 h-6 rounded-full border-[0.6px] border-[#dcdcdc]"
                            />
                        ))
                    }
                </div>
                
            </div> */}
            
            <p className="text-sm text-gray-text-weak">{assessment.description}</p>
            <div className="flex flex-wrap gap-1">
                {
                    assessment.tags.map((tag) => (
                        <div key={tag} className="rounded-2xl border border-gray-stroke-weak bg-gray-stroke-weaker text-gray-text-weak px-2 flex items-center justify-center text-xs">
                            {tag}
                        </div>
                    ))
                }
            </div>
        </article>
    )
};