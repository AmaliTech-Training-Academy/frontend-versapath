import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { CustomDropdown } from "@/components/custom/custom-dropdown";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/api-request";
import { Status, User } from "@/lib/types/api";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Eye, MoreVertical, Send } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export const UserTableMenu: React.FC<{
  user: User;
}> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isResending, startResending] = React.useTransition();
  const handleResendVerification = () =>
    startResending(async () => {
      const response = await apiRequest(`/register/resend-invitation?email=${user.email}`, "POST");
      if (!response.success) {
        toast.error(
          response.message ||
            "Failed to resend verification email. Please try again."
        );
        return;
      }
      toast.success(
        response.message || "Verification email resent successfully"
      );
    });
  return (
    <>
      <CustomDropdown
        trigger={
          <Button variant={"ghost"} className="p-1" size={"icon"}>
            <MoreVertical />
          </Button>
        }
      >
        {user.status === Status.PENDING && (
          <DropdownMenuItem asChild>
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => setDialogOpen(true)}
            >
              <Send />
              Resend
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            href={"/dashboard/user-management/" + user.id}
            className="w-full"
          >
            <Button variant={"ghost"} className="w-full justify-start">
              <Eye />
              View user
            </Button>
          </Link>
        </DropdownMenuItem>
      </CustomDropdown>
      <ConfirmDialog
        open={dialogOpen}
        title="Resend verification Email"
        confirmLabel="Resend"
        description="Are you sure you want to resend invitation to this user?"
        onClose={() => setDialogOpen(false)}
        onConfirm={handleResendVerification}
        loading={isResending}
        preventCloseOnConfirm={true}
        dialogClose={true}
      />
    </>
  );
};
