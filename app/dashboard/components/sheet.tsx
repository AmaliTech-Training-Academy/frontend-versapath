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
  saveChangeButton,
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
        {/* <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div> */}
        <SheetFooter>
          {saveChangeButton || <Button type="submit">Save changes</Button>}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
