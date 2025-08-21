import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
  trigger: React.ReactNode;
  saveChangeButton?: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
}>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">{headerTitle}</SheetTitle>
          <SheetDescription>{headerDescription}</SheetDescription>
        </SheetHeader>
        <div className="px-3">{children}</div>
      
        {/* <SheetFooter>
          {saveChangeButton || <Button type="submit">Save changes</Button>}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
