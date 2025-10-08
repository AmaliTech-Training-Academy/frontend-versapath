import { Progress } from "@/components/ui/progress";
import { MyTrack } from "@/lib/types/api";

export const GrowthTrackOverview = ({
    track
}: {
    track: MyTrack
}) => {
    return (
        <section className="bg-sidebar p-4 rounded-md flex items-center justify-between">
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-strong">{track.trackName}</p>
                <p className="text-sm text-gray-text-weak max-w-[700px] w-full">
                    {track.description.split('.').slice(0, 2).join('.').trim() + '.'}
                </p>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-weak text-center">{track.progressPercentage}%</p>
                <Progress value={track.progressPercentage} className="w-[200px] h-3 rounded-full" />
            </div>
        </section>
    );
}
