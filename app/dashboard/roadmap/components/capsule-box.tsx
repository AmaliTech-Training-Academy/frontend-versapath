import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MyTrackCapsule } from "@/lib/types/api"
import { Check } from "lucide-react"
import Link from "next/link"

export const CapsuleBox = ({
    capsule,
    isActive,
    isNextInline
}: {
    capsule: MyTrackCapsule,
    isActive: boolean,
    isNextInline: boolean
}) => {
    const progress = capsule.progressPercentage;
    const isComplete = capsule.status === "COMPLETED";
    const isInProgress = capsule.status === "IN_PROGRESS";
    const isNotStarted = capsule.status === "NOT_STARTED";
    const showProgress = capsule.status === "IN_PROGRESS" || (isNextInline && isActive);

    return (
        <div className="bg-sidebar w-[344px] rounded-md space-y-4 border border-brand-primary-text-weak">
            <div className="flex items-center justify-between py-1 px-2">
                <span className="font-semibold text-sm text-gray-text-strong">{capsule.capsuleName}</span>
                {
                    isComplete && (
                        <div className="flex items-center gap-1 text-brand-primary-text">
                            <Check size={16} />
                            <span className="text-xs">Completed</span>
                        </div>
                    )
                }
            </div>
            <Separator className="bg-gray-fill" />
            <p className="text-xs text-gray-text-weak px-2 line-clamp-2">{capsule.description}</p>
            <div className="flex items-center justify-between p-2">
                {
                    showProgress && (
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-text-weak">{progress}%</span>
                            <Progress value={progress} className="w-[200px] h-3 rounded-full" />
                        </div>
                    )
                }

                {/* Not started → Start only for *next inline*; otherwise Learn More */}
                {isNotStarted && !isComplete && !isInProgress && (
                    <>
                        {isNextInline && isActive ? (
                            <Link href={`/dashboard/skills/${capsule.capsuleId}`}>
                                <Button>Start</Button>
                            </Link>
                        ) : (
                            <Link href={`/dashboard/skills/${capsule.capsuleId}`} className="ml-auto text-sm text-gray-text-strong font-medium tracking-normal">
                                <GrayButton>Learn More</GrayButton>
                            </Link>
                        )}
                    </>
                )}

                {/* Action on the right */}
                {/* Completed → Retake */}
                {isComplete && (
                    <Link href={`/dashboard/skills/${capsule.capsuleId}`} className="ml-auto text-sm text-gray-text-strong font-medium tracking-normal">
                        <GrayButton>Retake</GrayButton>
                    </Link>
                )}

                {/* In-progress → Resume */}
                {isInProgress && (
                    <Link href={`/dashboard/skills/${capsule.capsuleId}`} className="ml-auto text-sm text-gray-text-strong font-medium tracking-normal">
                        <Button>Resume</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

const GrayButton = ({ children }: { children: React.ReactNode }) => (
    <Button className="bg-[#F1F5F9] text-gray-text-strong hover:bg-[#e1e8f3] cursor-pointer">
        {children}
    </Button>
)