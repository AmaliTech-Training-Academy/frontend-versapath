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
import { updateUserStatus } from "@/lib/api/users";
import { cn } from "@/lib/utils";

import { Loader, PowerCircle } from "lucide-react";
import React, {  useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const ChangeStatusDialog: React.FC<{
  userStatus: string;
  userId: string;
}> = ({ userStatus, userId }) => {
  const [status, setStatus] = useState("");
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const response = await updateUserStatus({ userId, status });
    if (!response.success) {
      setError(
        response.errors?.[0] ||
          response.message ||
          "Unable to change status. Please try again"
      );
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    toast.success(response.message || "Status updated successfully");
    mutate(`/users/${userId}`);
    mutate((key) => typeof key === "string" && key.startsWith("/users"));
    closeDialogRef.current?.click();
  };
  const filteredStatus = ["ACTIVE", "INACTIVE"].filter((r) => r !== userStatus);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <PowerCircle />
          Update status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update user's status</DialogTitle>
            <DialogDescription>
              Make changes to the user's status here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Select defaultValue={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full h-auto py-2">
                <SelectValue placeholder={"Select status"} />
              </SelectTrigger>
              <SelectContent className="border-none bg-base-light-white">
                {filteredStatus?.map((item) => (
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
              disabled={!status || isSubmitting}
              className={cn(isSubmitting && "cursor-not-allowed")}
            >
              {isSubmitting && (
                <Loader className="animate-spin me-2" size={16} />
              )}
              {isSubmitting ? "Updating" : " Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
