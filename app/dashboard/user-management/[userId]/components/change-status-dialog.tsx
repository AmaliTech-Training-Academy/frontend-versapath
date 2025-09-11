"use client";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/lib/api/users";
import { PowerCircle } from "lucide-react";
import React from "react";
import { CommonUpdateDialog } from "./common-update-dialog";

export const ChangeStatusDialog: React.FC<{
  userStatus: string;
  userId: string;
}> = ({ userStatus, userId }) => {
  return (
    <CommonUpdateDialog
      title="Update user's status"
      description="Make changes to the user's status here. Click save when you're done."
      placeholder="Select status"
      options={["ACTIVE", "INACTIVE"]}
      currentValue={userStatus}
      userId={userId}
      updateFunction={() => updateUserStatus({ userId, status: userStatus })}
      updateKey="status"
      mutateKeys={`/users/${userId}`}
      successMessage="Status updated successfully"
      errorMessage="Unable to change status. Please try again"
      triggerButton={
        <Button variant="ghost" className="w-full justify-start">
          <PowerCircle />
          Update status
        </Button>
      }
    />
  );
};
