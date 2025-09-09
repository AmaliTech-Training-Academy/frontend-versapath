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
import {
  ChevronDown,
  TrendingUp,
  Bell,
  LifeBuoy,
  Settings,
  Search,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { SidebarUserCard } from "./sidebar-user-card";

// Types
type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type LeafItem = {
  title: string;
  url: string;
  icon?: SvgIcon;
};

type ParentItem = {
  title: string;
  url: string;
  icon: SvgIcon;
  items: Array<Pick<LeafItem, "title" | "url">>;
};

type SidebarItem = LeafItem | ParentItem;

type FooterItem = {
  title: string;
  url: string;
  icon: SvgIcon;
  count?: number;
};

// Static
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
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
    items: [
      { title: "Skill Categories", url: "/dashboard/skill-categories" },
      { title: "Skills", url: "/dashboard/skills" },
      { title: "Lessons", url: "/dashboard/lessons" },
      { title: "Skill Tags", url: "#" },
      { title: "Roadmap", url: "/dashboard/roadmap" },
    ],
  },
  {
    title: "Growth Track",
    url: "#",
    icon: TrendingUp,
  },
];

const sidebarFooterItems: FooterItem[] = [
  { title: "Notifications", url: "#", icon: Bell, count: 0 },
  { title: "Support", url: "#", icon: LifeBuoy },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-none ">
      <SidebarHeader className="pt-10">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1"
              aria-label="Home"
            >
              <Image
                src="/Logo.svg"
                height={50}
                width={50}
                alt="VersaPathAI logo"
                priority
              />
              <span className="text-2xl font-black ">VersaPath</span>
            </Link>
            <SidebarTrigger aria-label="Toggle sidebar" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search"
                  aria-label="Search sidebar"
                  className="border p-4 pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-text-strong/30 cursor-pointer" />
              </SidebarMenuItem>

              {sidebarItems.map((item) =>
                "items" in item ? (
                  <Collapsible key={item.title} asChild>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="p-4 text-gray-text-weak font-semibold"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenu className="pl-8">
                          {item.items.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton
                                asChild
                                className="text-gray-text-weak font-semibold"
                                isActive={pathname === subItem.url}
                              >
                                <Link
                                  href={subItem.url}
                                  aria-label={`${subItem.title} page`}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="p-4 text-gray-text-weak"
                    >
                      <Link href={item.url} aria-label={`${item.title} page`}>
                        {item.icon ? <item.icon strokeWidth={2} /> : null}
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-10 px-4 space-y-4">
        <div>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarFooterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className=" text-gray-text-weak"
                  >
                    <Link href={item.url} aria-label={`${item.title} page`}>
                      <item.icon strokeWidth={2} />
                      <span className="font-semibold">{item.title}</span>
                      {item.count !== undefined && (
                        <span className="rounded-xs ml-auto py-1 px-2 bg-brand-primary-text text-base-light-white text-xs font-semibold">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        <SidebarUserCard />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
