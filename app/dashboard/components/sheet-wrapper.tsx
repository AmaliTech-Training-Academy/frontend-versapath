import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { PropsWithChildren } from "react";

export function SheetWrapper({
  trigger,
  headerTitle,
  headerDescription,
  children,
}: PropsWithChildren<{
  trigger: React.ReactNode | React.ReactElement;
  saveChangeButton?: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
}>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">{headerTitle}</SheetTitle>
          <SheetDescription>{headerDescription}</SheetDescription>
        </SheetHeader>
        <div className="px-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
