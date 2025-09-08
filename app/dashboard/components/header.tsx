import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
export const DashboardHeader = ({ title }: { title: string }) => {
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
      <span className="block mt-4">{title}</span>
    </section>
  );
};
