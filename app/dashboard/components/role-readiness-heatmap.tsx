import { roleReadinessData } from "@/lib/api/role-readiness";
import { RoleReadinessCard } from "./role-readiness-card";

export const RoleReadinessHeatmap = () => {
    return (
        <section className="rounded-xl p-4 space-y-4 bg-base-white">
            <article className="space-y-1">
                <p className="font-semibold text-gray-text-strong">Role Readiness Heatmap</p>
                <p className="text-gray-text-weak">Visual representation of readiness levels across learners</p>
            </article>
            <article className="grid grid-cols-3 gap-4">
                {
                    roleReadinessData.map((data) => (
                        <RoleReadinessCard key={data.id} data={data} />
                    ))
                }
            </article>
        </section>
    );
};