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
  headerTitle: string;
  headerDescription?: string;
}>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{headerTitle}</SheetTitle>
          {headerDescription && (<SheetDescription>{headerDescription}</SheetDescription>)}
        </SheetHeader>
        <div className="h-full px-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
