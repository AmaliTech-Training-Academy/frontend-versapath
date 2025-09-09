import React from "react";
import { AISectionDropdown } from "./ai-section-dropdown";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const AIChattingSection = () => {
  return (
    <>
      <article className="flex justify-between w-full pb-2">
        <h3 className="text-lg font-semibold text-start">Versapath AI</h3>
        <AISectionDropdown />
      </article>
      <div className="flex-1 w-full h-full px-2 my-3 overflow-y-auto text-sm text-start tabs_scrollbar text-gray-text-strong/70">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
        incidunt cupiditate nulla tempore quisquam praesentium culpa
        consequuntur rerum aliquid ipsam nihil mod
      </div>
      <article className="flex h-fit flex-col w-full gap-1 border rounded-xl border-gray-stroke-strong max-w-[calc(100%-15px)]">
        <textarea
          placeholder="Chat with Versapath AI "
          className="w-full p-2 text-sm resize-y focus:outline-none max-h-20"
        />
        <div className="items-end self-end p-2 pt-0 ">
          <Button variant={"outline"} size={"icon"}>
            <Send size={24} />
          </Button>
        </div>
      </article>
    </>
  );
};
