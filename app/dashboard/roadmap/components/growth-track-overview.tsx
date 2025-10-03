import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";
import { MyTrack } from "@/lib/types/api";

export const GrowthTrackOverview = ({
    track,
    loading,
    error
}: {
    track: MyTrack | undefined,
    loading: boolean,
    error: string | null
}) => {

    if (loading || error || !track) {
        return (
            <section className="bg-sidebar p-4 rounded-md flex items-center justify-center text-muted-foreground">
                {
                    loading && (
                        <>
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </>
                    )
                }

                {error && <span>{error}</span>}

                {!track && <span>Failed to fetch your track. Please refresh the tab</span>}
            </section>
        );
    }

    return (
        <section className="bg-sidebar p-4 rounded-md flex items-center justify-between">
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-strong">{track.trackName}</p>
                <p className="text-sm text-gray-text-weak max-w-[519px] w-full">{track.description}</p>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-weak text-center">{track.progressPercentage}%</p>
                <Progress value={track.progressPercentage} className="w-[200px] h-3 rounded-full" />
            </div>
        </section>
    );
}
