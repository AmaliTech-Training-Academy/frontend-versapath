"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { actionSelector } from "@/components/custom/action-selector";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { timeSelectData } from "@/lib/api/analytics";

export const DashboardHeader = ({ title }: { title: string }) => {
  const pathname = usePathname();
  return (
    <section className="w-full text-3xl font-semibold">
      <SidebarMenuItem className="flex items-center justify-between py-2 rounded-lg md:hidden bg-base-light-white ps-4 pe-2">
        <SidebarTrigger />
        <Link
          href={"/"}
          className="flex items-center justify-center w-full gap-1"
        >
          <Image
            src={"/Logo.svg"}
            height={50}
            width={50}
            alt="VersaPathAI logo"
          />
          <span className="text-2xl font-black ">VersaPath</span>
        </Link>
      </SidebarMenuItem>
      <article className="flex items-center justify-between">
        <span className="block mt-4">{title}</span>
        {
          pathname === '/dashboard/analytics' && (
            <div className="flex items-center gap-2">
              {actionSelector(timeSelectData)}
              <Button className="bg-brand-primary-text text-base-white">
                <Download size={24} />
                <span className="font-medium text-sm tracking-normal">Export</span>
              </Button>
            </div>
          )
        }
      </article>
    </section>
  );
};
