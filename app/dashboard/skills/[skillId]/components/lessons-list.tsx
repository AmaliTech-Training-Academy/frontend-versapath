import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { PlayCircle } from "lucide-react";
import React from "react";

export const LessonsList = () => {
  return (
    <section className="flex flex-col w-full px-3 ">
      <form className="sticky left-0 w-full top-1">
        <Input
          placeholder={"Search by name"}
          name="searchLessonInput"
          className="w-full bg-base-light-white"
        />
      </form>
      <article className="h-full mt-1 space-y-1">
        {Array.from({ length: 20 }, () => crypto.randomUUID()).map((key) => (
          <div
            className="flex items-center gap-4 p-3 rounded-sm lesson_card_selector"
            key={key}
          >
            <Checkbox
              className="text-gray-text-strong lesson_checkbox"
              id={key}
            />
            <Label
              htmlFor={key}
              className="inline-flex flex-col items-start justify-center"
            >
              <h3 className="text-base leading-normal text-gray-text-strong/90 line-clamp-1">
                What is JavaScript?
              </h3>
              <div className="inline-flex items-center justify-start gap-1">
                <PlayCircle size={10} className="text-gray-text-strong/30" />
                <h4 className="text-xs leading-tight text-gray-text-strong/50">
                  3min
                </h4>
              </div>
            </Label>
          </div>
        ))}
      </article>
      <div className="flex justify-end mb-5 space-x-3">
        <SheetClose asChild>
          <Button variant={"outline"} className="cursor-pointer">
            Cancel
          </Button>
        </SheetClose>
        <Button type="submit" className="px-5">
          Save
        </Button>
      </div>
    </section>
  );
};
