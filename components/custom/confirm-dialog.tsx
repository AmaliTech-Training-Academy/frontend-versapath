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
// import { X } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  alternativeLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onAlternative?: () => void;
  onClose: () => void;
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
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:w-[480px] rounded-xl p-6">
        <DialogHeader className="flex flex-row justify-between items-start">
          <DialogTitle className="text-2xl font-semibold text-gray-text-strong/85">
            {title}
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <DialogDescription className=" text-sm font-normal">
          {description}
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-3 mt-6">
          {onAlternative && (
            <Button
              variant="outline"
              className={
                destructive
                  ? "h-8 p-6 text-md bg-brand-primary-text/10 border-none"
                  : ""
              }
              onClick={() => {
                onAlternative?.();
                onClose();
              }}
            >
              {alternativeLabel}
            </Button>
          )}

          <Button
            className="bg-brand-primary-text p-6 text-md"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
