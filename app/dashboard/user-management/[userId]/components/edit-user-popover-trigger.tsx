"use client";
import { CustomDropdown } from "@/components/custom/custom-dropdown";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, PenBox, UserIcon } from "lucide-react";
import React from "react";
import { ChangeRoleDialog } from "./change-role-dialog";
import { ChangeStatusDialog } from "./change-status-dialog";
import { User } from "@/lib/types/api";
import { SheetWrapper } from "@/app/dashboard/components/sheet-wrapper";
import { EditUserForm } from "./edit-user-form";

export const EditUserPopoverTrigger: React.FC<{ user: User }> = ({ user }) => {
  return (
    <CustomDropdown
      trigger={
        <Button variant={"ghost"} className="bg-gray-stroke-weak/50">
          <PenBox />
          <span className="border-e-2  pe-2 border-base-light-white">
            Edit user
          </span>{" "}
          <ChevronDown />
        </Button>
      }
    >
      <DropdownMenuItem asChild>
        <ChangeRoleDialog userRole={user.role} userId={user.id} />
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <ChangeStatusDialog userId={user.id} userStatus={user.status} />
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <SheetWrapper
          headerDescription="Edit user's information"
          headerTitle="Edit user"
          trigger={
            <Button variant={"ghost"} className="w-full justify-start">
              <UserIcon />
              Edit user info
            </Button>
          }
        >
          <EditUserForm initialData={user} />
        </SheetWrapper>
      </DropdownMenuItem>
    </CustomDropdown>
  );
};
