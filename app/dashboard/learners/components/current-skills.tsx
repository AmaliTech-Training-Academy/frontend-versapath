import { MyTrackCapsule } from "@/lib/types/api"

export const CurrentSkills = ({ skills }: { skills: MyTrackCapsule[] | undefined }) => {
    return (
        <article className="space-y-2">
            <p className="font-semibold text-lg text-gray-text-strong">Current Skills</p>
            {
                (!skills || skills.length === 0) ? (
                    <>
                        {!skills && <span className="text-sm text-gray-text-weak">Failed to fetch skills.</span>}
                        {skills?.length === 0 && <span className="text-sm text-gray-text-weak">No skills acquired yet.</span>}
                    </>
                ) : (
                    <ul className="flex flex-wrap gap-1 items-center">
                        {
                            skills.map((capsule) => (
                                <li
                                    key={capsule.capsuleId}
                                    className="rounded-2xl border border-gray-stroke-weak py-0.5 px-2 bg-gray-stroke-weaker text-xs text-gray-text-weak"
                                >
                                    {capsule.capsuleName}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </article >
    )
}