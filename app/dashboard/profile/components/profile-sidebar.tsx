'use client';

import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarItems = [
    {
        title: "My Profile",
        url: "/dashboard/profile"
    },
    {
        title: "Account Settings",
        url: "#"
    },
    {
        title: "Account Settings",
        url: "#"
    },
    {
        title: "Account Settings",
        url: "#"
    },

];

export const ProfileSidebar = () => {
    const pathname = usePathname();

    return (
        <article className="rounded-xl p-2.5 space-y-2.5 h-fit">
            <SidebarContent></SidebarContent>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="p-4 text-gray-text-weak"
                                    >
                                        <Link href={item.url} aria-label={`${item.title} page`}>
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </article>
    );
};