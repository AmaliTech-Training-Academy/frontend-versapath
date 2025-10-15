import React from "react";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const TagsSheet = () => {
  return (
    <SheetWrapper
      trigger={
        <button className="text-brand-primary-text me-10">See all</button>
      }
      headerTitle="Filter by Tags"
      headerDescription=""
    >
      <section className="w-full overflow-y-auto h-full max-h-[350px] grid grid-cols-2 p-6 tabs_scrollbar">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <Label
              className="space-x-4 text-gray-text-weak text-base font-normal py-2"
              key={index + ""}
            >
              <Checkbox /> Tag {index + 1}
            </Label>
          ))}
      </section>
      <div className="flex justify-end space-x-3 border-none outline-none">
        <SheetClose asChild>
          <Button variant={"outline"}>Clear all</Button>
        </SheetClose>
        <Button type="submit">Save</Button>
      </div>
    </SheetWrapper>
  );
};
