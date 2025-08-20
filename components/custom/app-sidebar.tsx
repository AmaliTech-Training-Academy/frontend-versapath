"use client";
import {
  Bars4Icon,
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
              <span className=" font-black text-2xl">VersaPath</span>
            </Link>
            <Bars4Icon fontSize={20} className="h-6 w-6 " strokeWidth={2} />
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
            {/* <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-10">
        <div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Versapath. All rights reserved.
          </p>
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
