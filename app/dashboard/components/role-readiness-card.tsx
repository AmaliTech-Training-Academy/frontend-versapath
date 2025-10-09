import { RoleReadinessData } from "@/lib/api/role-readiness";
import { clsx } from "clsx";
import { Target, UsersIcon } from "lucide-react";

type RoleReadinessCardProps = {
    data: RoleReadinessData;
};

export const RoleReadinessCard = ({ data }: RoleReadinessCardProps) => {
    return (
        <div className={
            clsx(
                "rounded-[10px] p-5 space-y-4",
                {
                    "bg-brand-primary-fill": data.progress >= 80,
                    "bg-brand-secondary-fill": data.progress < 80 && data.progress >= 60,
                    "bg-red-fill": data.progress < 60
                }
            )
        }>
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold text-gray-text-strong tracking-normal">{data.title}</p>
                    <p className="text-gray-text-weak">{data.department}</p>
                </div>
                <div className={
                    clsx(
                        "rounded-2xl border px-3 py-0.5 h-fit",
                        {
                            "border-brand-primary-stroke-strong bg-brand-primary-stroke-strong": data.progress >= 80,
                            "border-brand-secondary-stroke-strong bg-brand-secondary-stroke-strong": data.progress < 80 && data.progress >= 60,
                            "border-red-stroke-strong bg-red-stroke-strong": data.progress < 60
                        }
                    )
                }>
                    <p className={
                        clsx(
                            "text-xs tracking-normal",
                            {
                                "text-gray-text-strong": data.progress < 80 && data.progress >= 60,
                                "text-base-white": data.progress >= 80 || data.progress < 60
                            }
                        )
                    }>
                        {data.progress}%
                    </p>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <UsersIcon size={20} />
                    <p className="text-sm text-gray-text-weak">{data.learnerCount} Learners</p>
                </div>
                <div className="flex items-center gap-1">
                    <Target size={20} />
                    <p className="text-sm text-gray-text-weak">Avg Score: {data.averageScore}%</p>
                </div>
            </div>
        </div>
    );
};