"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import React, { useEffect } from "react";
import { TabSkillContents } from "./tab-skill-contents";
import { TabAIContents } from "./tab-ai-contents";
import { useChangeSearchParams } from "@/lib/hooks/use-change-searchparams";

export const TabsWrapper = () => {
  const [openTab, setOpenTab] = React.useState("details");
  const { searchParams, setSearchParam } = useChangeSearchParams();

  useEffect(() => {
    const open = searchParams.get("subsection");
    if (open) setOpenTab(open);
    //eslint-disable-next-line
  }, [open]);
  const handleTabsVauleChange = (value: string) => {
    setOpenTab(value);
    setSearchParam("subsection", value);
  };
  return (
    <Tabs
      className="max-w-[350px] w-full h-full overflow-y-auto"
      onValueChange={handleTabsVauleChange}
      defaultValue={openTab}
      value={openTab}
    >
      <TabsList className="bg-inherit">
        <TabsTrigger
          value="details"
          className="font-semibold tabs_list_header text-gray-text-weak"
        >
          Skill Content
        </TabsTrigger>
        <TabsTrigger
          value="ai"
          className="font-semibold tabs_list_header text-gray-text-weak"
        >
          <Sparkles strokeWidth={1.7} /> AI assistance
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="overflow-y-auto tabs_scrollbar">
        <TabSkillContents />
      </TabsContent>
      <TabsContent value="ai" className="h-full px-2">
        <TabAIContents />
      </TabsContent>
    </Tabs>
  );
};
