"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoreVertical } from "lucide-react";
import React from "react";
import { AISectionDropdown } from "./ai-section-dropdown";
import { useChangeSearchParams } from "@/lib/hooks/use-change-searchparams";

export const AIChatHistorySection = () => {
  const { setSearchParam } = useChangeSearchParams();
  const handleGoBack = () => {
    setSearchParam("aiOpenSection", "chat");
  };
  return (
    <section className="space-y-2">
      <hgroup className="flex justify-between w-full pb-2">
        <header className="flex gap-2 w-fit items-center">
          <Button variant={"ghost"} size={"icon"} onClick={handleGoBack}>
            <ChevronLeft />
          </Button>
          <h3 className="text-lg font-semibold text-start">Versapath AI</h3>
        </header>
        <AISectionDropdown />
      </hgroup>
      <article className="w-full h-full">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <div
              className="flex items-center justify-between transition-all rounded-md cursor-pointer hover:bg-brand-primary-fill "
              key={"to_be_removed" + i}
            >
              <p className="p-2 text-xs line-clamp-1 text-gray-text-weak/90">
                What is Javascript?
              </p>
              <Button variant={"ghost"} size={"icon"} className="p-1">
                <MoreVertical size={19} />
              </Button>
            </div>
          ))}
      </article>
    </section>
  );
};
