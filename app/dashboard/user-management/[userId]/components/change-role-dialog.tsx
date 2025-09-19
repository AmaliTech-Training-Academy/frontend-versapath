"use client";
import { Button } from "@/components/ui/button";
import { updateUserRole } from "@/lib/api/users";
import { Roles } from "@/lib/types";
import { PenBox } from "lucide-react";
import React from "react";
import { CommonUpdateDialog } from "./common-update-dialog";

export const ChangeRoleDialog: React.FC<{
  userRole: string;
  userId: string;
  mutateKey?: string;
}> = ({ userRole, userId, mutateKey = `/users/${userId}` }) => {
  return (
    <CommonUpdateDialog
      title="Edit Role"
      description="Make changes to user's role here. Click save when you're done."
      placeholder="Select role"
      options={Object.values(Roles)}
      currentValue={userRole}
      userId={userId}
      mutateKeys={mutateKey}
      updateFunction={({ userId, role }) => updateUserRole({ userId, role })}
      updateKey="role"
      successMessage="Role updated successfully"
      errorMessage="Unable to change role. Please try again"
      triggerButton={
        <Button variant="ghost" className="w-full justify-start">
          <PenBox />
          Edit Role
        </Button>
      }
    />
  );
};
