import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <main className="bg-inherit w-full min-h-screen space-y-6 p-6 flex flex-col">{children}</main>
    </SidebarProvider>
  );
}
