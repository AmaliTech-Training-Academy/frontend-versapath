"use client";

import { quickActions } from "@/lib/api/quick-actions";
import { QuickActionCard } from "./quick-action-card";
import { canSee } from "@/components/custom/app-sidebar";
import { Roles } from "@/lib/types";
import { useSession } from "next-auth/react";

export const QuickActions = () => {
    const { data: session } = useSession();
    const userRole = session?.user?.role as Roles;
    const filteredQuickActions = quickActions.filter(action => canSee(userRole, action.allowedRoles));
    return (
        <section className='bg-sidebar rounded-xl p-5 space-y-4'>
            <p className="font-semibold text-lg">Quick Actions</p>
            <article className="grid grid-cols-4 gap-6">
                {
                    filteredQuickActions.map((action, i) => (
                        <QuickActionCard key={`${action.title} ${i}`} title={action.title} description={action.description} icon={action.icon} />
                    ))
                }
            </article>
        </section>
    );
}