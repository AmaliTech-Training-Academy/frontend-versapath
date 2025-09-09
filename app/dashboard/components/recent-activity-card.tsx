export const RecentActivityCard = ({
    activity: { title, date },
}: {
    activity: { id: number; title: string; date: string }
}) => {
    return (
        <article className="rounded-md p-3 bg-gray-fill">
            <p className="font-semibold text-sm text-gray-text-strong">{title}</p>
            <p className="text-xs text-gray-text-weak">{date}</p>
        </article>
    );
};