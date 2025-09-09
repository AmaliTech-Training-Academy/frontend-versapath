"use client";

import React, { useEffect } from "react";
import { AIChattingSection } from "./ai-chatting-section";
import { AIChatHistorySection } from "./ai-chat-history";
import { useChangeSearchParams } from "@/lib/hooks/use-change-searchparams";

export const TabAIContents = () => {
  const { searchParams, setSearchParam } = useChangeSearchParams();
  useEffect(() => {
    if (!searchParams.get("aiOpenSection")) {
      setSearchParam("aiOpenSection", "chat");
    }
  }, [searchParams, setSearchParam]);

  return (
    <section className="flex flex-col flex-1 w-full h-full gap-0 px-2 ps-0">
      {searchParams.get("aiOpenSection") === "chat" && <AIChattingSection />}
      {searchParams.get("aiOpenSection") === "history" && (
        <AIChatHistorySection />
      )}
    </section>
  );
};
