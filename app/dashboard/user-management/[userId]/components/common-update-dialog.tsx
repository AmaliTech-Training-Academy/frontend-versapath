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
import { CommonUpdateDialogProps } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const CommonUpdateDialog: React.FC<CommonUpdateDialogProps> = ({
  title,
  description,
  placeholder,
  options,
  currentValue,
  userId,
  triggerButton,
  updateFunction,
  updateKey,
  mutateKeys = `/users/${userId}`,
  successMessage,
  errorMessage,
}) => {
  const [value, setValue] = useState("");
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredOptions = options.filter((option) => option !== currentValue);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const updateParams = { userId, [updateKey]: value };
    const response = await updateFunction(updateParams);

    if (!response.success) {
      setError(
        response.errors?.[0] ||
          response.message ||
          errorMessage ||
          `Unable to update ${updateKey}. Please try again`
      );
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    toast.success(
      response.message || successMessage || `${updateKey} updated successfully`
    );
    mutate(mutateKeys);
    closeDialogRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Select defaultValue={value} onValueChange={setValue}>
              <SelectTrigger className="w-full h-auto py-2">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="border-none bg-base-light-white">
                {filteredOptions?.map((item) => (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-red-text text-sm ps-2 transition-all">
                {error}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" ref={closeDialogRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!value || isSubmitting}
              className={cn(isSubmitting && "cursor-not-allowed")}
            >
              {isSubmitting && (
                <Loader className="animate-spin me-2" size={16} />
              )}
              {isSubmitting ? "Updating" : `Update ${updateKey}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
