import { MyTrack } from "@/lib/types/api";
import { useSession } from "next-auth/react";

export const GrowthTrackInfo = ({ track }: { track: MyTrack | undefined }) => {
    const { data: session } = useSession();
    const mentorName = `${session?.user.firstName} ${session?.user.lastName}`;
    const skills_completed = track?.capsules.filter(capsule => capsule.status === "COMPLETED").length;

    if(!track) return;

    return (
        <section className="w-full rounded-xl border border-gray-stroke-weak bg-base-white py-4 px-5 space-y-4">
            <header>
                <p className="text-gray-text-strong text-lg font-semibold">
                    Growth Track
                </p>
                <p className="text-gray-text-weak text-sm">
                    Current learning path and skill development
                </p>
            </header>
            <article className="w-full grid grid-cols-2 gap-3">
                <div>
                    <p className="text-gray-text-strong/70 text-sm leading-snug">
                        Current Track
                    </p>
                    <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
                        {track?.trackName}
                    </p>
                </div>
                <div>
                    <p className="text-gray-text-strong/70 text-sm leading-snug">
                        Assigned Mentor
                    </p>
                    <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
                        {mentorName}
                    </p>
                </div>
                <div>
                    <p className="text-gray-text-strong/70 text-sm leading-snug">
                        Manager
                    </p>
                    <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
                        Charles Ndayisaba
                    </p>
                </div>
                <div>
                    <p className="text-gray-text-strong/70 text-sm leading-snug">
                        Skills Completed
                    </p>
                    <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
                        {skills_completed}
                    </p>
                </div>
            </article>
            <article>
                <p className="text-gray-text-strong/70 text-sm leading-snug">
                    Current Progress
                </p>
                <div className="w-full flex gap-2 items-center">
                    <div className="w-full h-2 relative bg-green-text/20 rounded-[20px] overflow-hidden">
                        <div
                            className=" h-5 left-0 top-[-6px] absolute bg-green-text"
                            style={{ width: `${track?.progressPercentage}` }}
                        />
                    </div>
                    <div className=" text-gray-text-strong/70 text-xs text-nowrap  leading-tight">
                        {track?.progressPercentage}% complete
                    </div>
                </div>
            </article>
        </section>
    );
}
