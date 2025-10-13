"use client";
import { useGetQuickActions } from "@/lib/api/quick-actions";
import { QuickActionCard } from "./quick-action-card";
import { Roles } from "@/lib/types";

type QuickActionsProps = {
  role: Roles;
};

export const QuickActions = ({ role }: QuickActionsProps) => {
  const quickActions = useGetQuickActions(role);
  return (
    <section className="bg-sidebar rounded-xl p-5 space-y-4">
      <p className="font-semibold text-lg">Quick Actions</p>
      <article className="grid grid-cols-4 gap-6">
        {quickActions.map((action, i) => (
          <QuickActionCard
            key={`${action.title} ${i}`}
            title={action.title}
            description={action.description}
            icon={action.icon}
            url={action.url}
          />
        ))}
      </article>
    </section>
  );
};
