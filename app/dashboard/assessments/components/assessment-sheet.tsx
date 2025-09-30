import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { PropsWithChildren } from "react";

export function AssessmentSheet({
  trigger,
  headerTitle,
  children
}: PropsWithChildren<{
  trigger: React.ReactNode | React.ReactElement;
  headerTitle: string;
}>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-semibold text-[32px] text-gray-text-strong">{headerTitle}</SheetTitle>
        </SheetHeader>
        <div className="h-full px-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
