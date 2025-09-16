import { RecentActivityCard } from "./recent-activity-card";

export const RecentActivityList = () => {
    return (
        <section className="rounded-xl p-5 space-y-4 bg-[#ffffff]">
            <p className="font-semibold text-lg text-gray-text-strong">My Recent Activities</p>
            <div className="space-y-2">
                {
                    activities.map((activity) => (
                        <RecentActivityCard key={activity.id} activity={activity} />
                    ))
                }
            </div>
        </section>
    );
};

const activities = [
    { id: 1, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
    { id: 2, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
    { id: 3, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
    { id: 4, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
    { id: 5, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
    { id: 6, title: "Started TypeScript Fundamentals", date: "23 hours ago" },
];