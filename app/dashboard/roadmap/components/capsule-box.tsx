import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export const CapsuleBox = ({ capsule }: { capsule: { name: string, description: string, progress?: number } }) => {
    return (
        <div className="bg-sidebar w-[344px] rounded-md space-y-4 border border-brand-primary-text-weak">
            <p className="font-semibold text-sm text-gray-text-strong py-1 px-2">{capsule.name}</p>
            <Separator className="bg-gray-fill" />
            <p className="text-xs text-gray-text-weak px-2 line-clamp-2">{capsule.description}</p>
            <div className="flex items-center justify-between p-2">
                {
                    capsule.progress === undefined && (
                        <Link href="#" className="ml-auto text-sm text-gray-text-strong font-medium tracking-normal px-3">Learn more</Link>
                    )
                }
                {
                    capsule.progress !== undefined && (
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-text-weak">{capsule.progress}%</span>
                            <Progress value={capsule.progress} className="w-[200px] h-3 rounded-full bg-green-text/20 [&>div]:bg-green-text" />
                        </div>
                    )
                }
                {
                    capsule.progress !== undefined && capsule.progress === 0 && (
                        <Link href="#" className="text-sm text-gray-text-strong font-medium tracking-normal px-3">Start</Link>
                    )
                }
                {
                    capsule.progress !== undefined && capsule.progress > 0 && (
                        <Link href="#">
                            <Button>
                                Resume
                            </Button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}