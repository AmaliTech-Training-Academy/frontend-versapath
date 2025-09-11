"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/lib/api/users";
import { Roles } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Loader, PenBox } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const ChangeRoleDialog: React.FC<{
  userRole: string;
  userId: string;
}> = ({ userRole, userId }) => {
  const [role, setRole] = useState("");
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {}, [role]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const response = await updateUserRole({ userId, role });
    if (!response.success) {
      setError(
        response.errors?.[0] ||
          response.message ||
          "Unable to change role. Please try again"
      );
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    toast.success(response.message || "Role updated successfully");
    mutate(`/users/${userId}`);
    closeDialogRef.current?.click();
  };
  const filteredRoles = Object.values(Roles).filter((r) => r !== userRole);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <PenBox />
          Edit Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Make changes to user's role here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Select defaultValue={role} onValueChange={setRole}>
              <SelectTrigger className="w-full h-auto py-2">
                <SelectValue placeholder={"Select role"} />
              </SelectTrigger>
              <SelectContent className="border-none bg-base-light-white">
                {filteredRoles?.map((item) => (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-red-text text-sm ps-2 transition-all">
              {error ?? ""}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" ref={closeDialogRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!role || isSubmitting}
              className={cn(isSubmitting && "cursor-not-allowed")}
            >
              {isSubmitting && (
                <Loader className="animate-spin me-2" size={16} />
              )}
              {isSubmitting ? "Updating" : " Update role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
