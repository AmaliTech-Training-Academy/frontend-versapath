"use client";
import {
  BookOpenIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MoreVertical, User } from "lucide-react";
import { CustomPopover } from "./custom-popover";
import { Button } from "../ui/button";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="border-none ">
      <SidebarHeader className="pt-10">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-1">
              {" "}
              <Image
                src={"/logo.svg"}
                height={50}
                width={50}
                alt="VersaPathAI logo"
              />
              <span className="text-2xl font-black ">VersaPath</span>
            </Link>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-[52.5px] "
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon strokeWidth={2} />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-10">
        <div className="flex gap-2 p-2 justify-between items-center rounded-xl bg-base-light-overlay">
          <User
            size={50}
            className="rounded-full h-10 w-10  border aspect-square "
            strokeWidth={1.2}
          />
          <p className="flex flex-col gap-1">
            <span className="font-bold text-base">Brooklyn Simons </span>
            <span className="text-xs text-gray-text-weak font-light">
              brooklyn@simmons.com
            </span>
          </p>
          <CustomPopover
            trigger={
              <Button size={"icon"} variant={"ghost"}>
                <MoreVertical className="text-gray-text-strong" />
              </Button>
            }
          >
            <div>Popover contents will be here</div>
          </CustomPopover>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const sidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Squares2X2Icon,
  },
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: UsersIcon,
  },
  {
    title: "Skills & Learning",
    url: "#",
    icon: BookOpenIcon,
  },
];
