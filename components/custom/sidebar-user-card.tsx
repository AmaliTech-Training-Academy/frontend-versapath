"use client";
import { MoreVertical, User } from "lucide-react";
import React from "react";
import { CustomPopover } from "./custom-popover";
import { Button } from "../ui/button";
import { handleLogOut } from "@/lib/api/logout";
import { useSession } from "next-auth/react";

export const SidebarUserCard = () => {
  const { data: user } = useSession();

  return (
    <div className="flex gap-2 py-6 justify-between items-center">
      <User size={50} className="rounded-full h-10 w-10 flex-shrink-0" />
      <hgroup className="">
        <h2 className="font-semibold text-gray-text-strong/90 capitalize">
          {user ? user.user.fullName || user.user.username : "N/A"}
        </h2>
        <h3 className="text-xs text-gray-text-weak/70">
          {user ? user.user.email : "unkwon"}
        </h3>
      </hgroup>

      <CustomPopover
        trigger={
          <Button size="icon" variant="ghost" aria-label="User options">
            <MoreVertical className="text-gray-text-weak" />
          </Button>
        }
      >
        <div>
          <Button
            variant="ghost"
            className="w-full text-left cursor-pointer"
            onClick={handleLogOut}
            aria-label="Sign out"
          >
            Sign out
          </Button>
        </div>
      </CustomPopover>
    </div>
  );
};
