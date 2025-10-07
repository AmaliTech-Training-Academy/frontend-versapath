export const CurrentSkills = ({ skills }: { skills: string[] }) => {
    return (
        <article className="space-y-2">
            <p className="font-semibold text-lg text-gray-text-strong">Current Skills</p>
            <ul className="flex flex-wrap gap-1 items-center">
                {
                    skills.map((skill, index) => (
                        <li
                            key={skill + index}
                            className="rounded-2xl border border-gray-stroke-weak py-0.5 px-2 bg-gray-stroke-weaker text-xs text-gray-text-weak"
                        >
                            {skill}
                        </li>
                    ))
                }
            </ul>
        </article>
    )
}