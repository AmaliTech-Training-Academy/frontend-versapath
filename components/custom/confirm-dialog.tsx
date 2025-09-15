"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  alternativeLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void | Promise<unknown>;
  onAlternative?: () => void;
  onClose: () => void;
  dialogClose?: boolean;
  loading?: boolean; // New prop for loading state
  preventCloseOnConfirm?: boolean; // New prop to prevent auto-close
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  alternativeLabel = "Achieve",
  destructive = false,
  onConfirm,
  onAlternative,
  onClose,
  dialogClose,
  loading = false,
  preventCloseOnConfirm = false,
}) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    // Only close automatically if preventCloseOnConfirm is false
    if (!preventCloseOnConfirm) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={loading ? undefined : onClose}>
      <DialogContent className="lg:w-[480px] rounded-xl p-6">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-2xl font-semibold text-gray-text-strong/85">
            {title}
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <DialogDescription className="text-sm font-normal ">
          {description}
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-3 mt-6">
          {dialogClose && (
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="p-6 text-md"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
          )}
          {onAlternative && (
            <Button
              variant="outline"
              className={
                destructive
                  ? "h-8 p-6 text-md bg-brand-primary-text/10 border-none"
                  : ""
              }
              disabled={loading}
              onClick={() => {
                onAlternative?.();
                onClose();
              }}
            >
              {alternativeLabel}
            </Button>
          )}

          <Button
            className="p-6 bg-brand-primary-text text-md"
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? (
              <>
                <Loader className="mr-2 animate-spin" size={16} />
                {confirmLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
