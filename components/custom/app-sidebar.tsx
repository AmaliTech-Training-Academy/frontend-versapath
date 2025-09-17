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
import { usePathname, useRouter } from "next/navigation";
import { MoreVertical, User, ChevronDown, TrendingUp, Bell, LifeBuoy, Settings, Search, LogOut } from "lucide-react";
import { CustomPopover } from "./custom-popover";
import { Button } from "../ui/button";
import { handleLogOut } from "@/lib/api/logout";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { ConfirmDialog } from "./confirm-dialog";
import { useState } from "react";
import { Roles } from "@/lib/types";

// Types
type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type LeafItem = {
  title: string;
  url: string;
  icon?: SvgIcon;
  allowedRoles?: Roles[];
};

type SubItem = Pick<LeafItem, "title" | "url"> & {
  allowedRoles?: Roles[];
};

type ParentItem = {
  title: string;
  url: string;
  icon: SvgIcon;
  items: SubItem[];
  allowedRoles?: Roles[];
};

type SidebarItem = LeafItem | ParentItem;

type FooterItem = {
  title: string;
  url: string;
  icon: SvgIcon;
  count?: number;
  allowedRoles?: Roles[];
};

type PopoverItem = {
  label: string;
  icon: SvgIcon;
  handleClick?: () => void;
}

// Static
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Squares2X2Icon,
    allowedRoles: [Roles.ADMIN, Roles.MANAGER, Roles.MENTOR, Roles.LEARNER]
  },
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: UsersIcon,
    allowedRoles: [Roles.ADMIN]
  },
  {
    title: "Skills & Learning",
    url: "#",
    icon: BookOpenIcon,
    allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER],
    items: [
      { title: "Skill Categories", url: "/dashboard/skill-categories?page=1&size=12", allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER] },
      { title: "Skills", url: "/dashboard/skills", allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER] },
      { title: "Lessons", url: "/dashboard/lessons", allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER] },
      { title: "Skill Tags", url: "#", allowedRoles: [Roles.ADMIN] },
      { title: "Roadmap", url: "/dashboard/roadmap", allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER] },
    ],
  },
  {
    title: "Growth Track",
    url: "#",
    icon: TrendingUp,
    allowedRoles: [Roles.ADMIN, Roles.MENTOR, Roles.LEARNER]
  },

];

const sidebarFooterItems: FooterItem[] = [
  { title: "Notifications", url: "#", icon: Bell, count: 0, allowedRoles: [Roles.ADMIN, Roles.MANAGER, Roles.MENTOR, Roles.LEARNER] },
  { title: "Support", url: "#", icon: LifeBuoy, allowedRoles: [Roles.ADMIN, Roles.MANAGER, Roles.MENTOR, Roles.LEARNER] },
  { title: "Settings", url: "#", icon: Settings, allowedRoles: [Roles.ADMIN, Roles.MANAGER, Roles.MENTOR, Roles.LEARNER] },
];

const canSee = (userRole: Roles, allowed?: Roles[]) =>
  !allowed || allowed.length === 0 || allowed.includes(userRole);

const isParent = (i: SidebarItem): i is ParentItem =>
  (i as ParentItem).items !== undefined;

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const popoverItems: PopoverItem[] = [
    {
      label: 'Profile',
      icon: User,
      handleClick: () => router.push('/dashboard/profile')
    },
    {
      label: 'Logout',
      icon: LogOut,
      handleClick: () => setIsOpen(true)
    }
  ];

  const userRole = session?.user?.role as Roles;

  const filteredSidebarItems = sidebarItems
    .map((item) => {
      if (isParent(item)) {
        // Filter children
        const children = item.items.filter((s) =>
          canSee(userRole, s.allowedRoles)
        );

        // If parent is visible OR any child is visible, keep it
        const parentVisible = canSee(userRole, item.allowedRoles);
        if (!parentVisible && children.length === 0) return null;

        return { ...item, items: children };
      } else {
        return canSee(userRole, item.allowedRoles) ? item : null;
      }
    });


  const filteredFooterItems = sidebarFooterItems.filter((f) => canSee(userRole, f.allowedRoles));

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

              {
                filteredSidebarItems.map((item) => {
                  if (!item) return null;
                  return (
                    isParent(item) ? (
                      // Only render group if parent visible or any child exists
                      (item.items.length > 0 || canSee(userRole, item.allowedRoles)) && (
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

                            {item.items.length > 0 && (
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
                            )}
                          </SidebarMenuItem>
                        </Collapsible>
                      )
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
                  )
                }
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-10 px-4 space-y-4">
        <div>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                filteredFooterItems.map((item) => (
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

        <div className="flex gap-2 py-6 justify-between items-center">
          <User size={30} className="rounded-full h-10 w-10 flex-shrink-0" />
          <div className="space-y-2">
            <p className="font-semibold text-gray-text-strong text-wrap">
              {`${session?.user.firstName} ${session?.user.lastName}`}
            </p>
            <p className="text-xs text-gray-text-weak text-wrap">
              {session?.user.email}
            </p>
          </div>

          <CustomPopover
            trigger={
              <Button size="icon" variant="ghost" aria-label="User options">
                <MoreVertical className="text-gray-text-weak" />
              </Button>
            }
            classes="rounded-xl border border-gray-stroke-weak py-2.5 px-2 bg-[#ffffff] shadow-lg w-[191px]"
          >
            <div className="text-gray-text-weak">
              {
                popoverItems.map(popover => {
                  const { label, icon: Icon, handleClick } = popover;
                  return (
                    <Button
                      key={label}
                      variant="ghost"
                      className="cursor-pointer w-full flex items-center justify-start"
                      aria-label={label}
                      onClick={handleClick ?? undefined}
                    >
                      <Icon />
                      <span>{label}</span>
                    </Button>
                  )
                })
              }
            </div>
          </CustomPopover>
        </div>
      </SidebarFooter>

      <SidebarRail />

      <ConfirmDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Logout"
        alternativeLabel="Cancel"
        destructive
        onConfirm={handleLogOut}
        onAlternative={() => setIsOpen(false)}
      />
    </Sidebar>
  );
};
