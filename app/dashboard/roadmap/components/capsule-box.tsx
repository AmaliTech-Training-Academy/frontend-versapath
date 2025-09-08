import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"
import Link from "next/link"

export const CapsuleBox = ({
    capsule,
    isActive,
    isNextInline
}: {
    capsule: { name: string, description: string, progress?: number },
    isActive: boolean,
    isNextInline: boolean
}) => {
    const rawProgress = capsule.progress ?? undefined;
    const isComplete = rawProgress === 100;
    const isInProgress = rawProgress !== undefined && rawProgress > 0 && rawProgress < 100;
    const isNotStarted = rawProgress === undefined || rawProgress === 0;

    // Show progress if:
    //  - we already have a numeric progress, OR
    //  - this is the next inline unlocked capsule (show 0%)
    const showProgress = rawProgress !== undefined || (isNextInline && isActive);
    const progress = rawProgress ?? 0;

    return (
        <div className="bg-sidebar w-[344px] rounded-md space-y-4 border border-brand-primary-text-weak">
            <div className="flex items-center justify-between py-1 px-2">
                <span className="font-semibold text-sm text-gray-text-strong">{capsule.name}</span>
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
                            <Link href="#">
                                <Button>Start</Button>
                            </Link>
                        ) : (
                            <Link href="#" className="ml-auto text-sm text-gray-text-strong font-medium tracking-normal">
                                <GrayButton>Learn More</GrayButton>
                            </Link>
                        )}
                    </>
                )}

                {/* Action on the right */}
                {/* Completed → Retake */}
                {isComplete && (
                    <Link href="#">
                        <GrayButton>Retake</GrayButton>
                    </Link>
                )}

                {/* In-progress → Resume */}
                {isInProgress && (
                    <Link href="#">
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