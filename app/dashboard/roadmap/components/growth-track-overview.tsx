import { Progress } from "@/components/ui/progress";

export const GrowthTrackOverview = ({ data } : { data: { name: string, description: string, progress: number }}) => {
    const { name, description, progress } = data;
    return (
        <section className="bg-sidebar p-4 rounded-md flex items-center justify-between">
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-strong">{name}</p>
                <p className="text-sm text-gray-text-weak max-w-[519px] w-full">{description}</p>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-lg text-gray-text-weak text-center">{progress}%</p>
                <Progress value={progress} className="w-[200px] h-3 rounded-full bg-green-text/20 [&>div]:bg-green-text" />
            </div>
        </section>
    );
}
