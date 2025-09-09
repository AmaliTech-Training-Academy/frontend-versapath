import { Progress } from "@/components/ui/progress";
import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";

interface RoadmapCardProps {
    roadmap: {
        id: string;
        title: string;
        description: string;
        progress: number;
        lessons_completed: string;
        clusters: string[];
    };
}

export const RoadmapCard = ({
    roadmap: {
        title,
        description,
        progress,
        lessons_completed,
        clusters
    }
}: RoadmapCardProps) => {
    return (
        <div className="rounded-md border border-text-gray-stroke-weak p-4 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-text-strong">{title}</span>
                <span className="text-sm text-gray-text-weak">{progress}% complete</span>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Progress value={progress} className="rounded-full" />
                <p className="text-sm text-gray-text-weak">{description}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <span className="text-sm text-gray-text-weak">{lessons_completed} Lessons</span>
                    <Dot />
                    <div className="flex items-center gap-1">
                        {clusters.map((cluster) => (
                            <div key={cluster} className="rounded-2xl border border-gray-stroke-weak px-2 bg-gray-stroke-weaker">
                                <span className="text-xs text-gray-text-weak">
                                    {cluster}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <Link href="#" className="h-8 rounded-md px-3 flex items-center gap-2 bg-[#f1f5f9]">
                    <span className="font-medium text-sm leading-5 tracking-normal text-gray-text-strong">Continue</span>
                    <ChevronRight className="text-[#0f172b]" />
                </Link>
            </div>
        </div>
    );
};