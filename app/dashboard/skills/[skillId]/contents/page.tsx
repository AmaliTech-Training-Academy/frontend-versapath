import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MainSkillContents } from "./components/main-skill-contents";
import { TabsWrapper } from "./components/tabs-wrapper";
import { SkillHeader } from "./components/skill-header";

function SingleSKillContentsPage() {
  return (
    <section className="h-[calc(100vh-32px)] overflow-y-hidden text-start">
      <SkillHeader />

      <section className="flex w-full gap-2 text-center rounded-lg h-[calc(100%-45px)] p-3 bg-base-light-white">
        <TabsWrapper />
        <MainSkillContents />
      </section>
    </section>
  );
}

export default SingleSKillContentsPage;
