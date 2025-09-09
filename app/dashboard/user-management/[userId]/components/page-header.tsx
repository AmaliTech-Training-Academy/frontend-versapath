"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const PageHeader: React.FC<{
  firstName?: string;
  lastName?: string;
}> = ({ firstName, lastName }) => {
  const { state } = useSidebar();
  return (
    <article className="flex  items-center gap-2 mt-2 mb-4">
      {state === "collapsed" && <SidebarTrigger />}
      <Link
        href="/dashboard/user-management"
        className="inline-block text-xs leading-tight transition-all text-gray-text-strong hover:underline underline-offset-2"
      >
        User Management
      </Link>
      <ChevronRight className="w-4 h-4 text-neutral-900/30" />
      <p className="justify-start text-xs font-semibold leading-tight text-center text-brand-primary-text">
        {firstName ?? "N/A"} {lastName ?? "N/A"}
      </p>
    </article>
  );
};
