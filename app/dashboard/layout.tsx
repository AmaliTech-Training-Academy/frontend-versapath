import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <main className="bg-inherit w-full min-h-screen p-4">{children}</main>
    </SidebarProvider>
  );
}
