"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { SheetWrapper } from "../components/sheet-wrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSkillForm } from "./components/add-skill-form";
import { SKillsContentsSection } from "./components/skills-contents-section";

function SkillCapsulePage() {
  return (
    <>
      <DashboardHeader title="Skills" />
      <section className="mb-6">
        <TopActions
          searchPlaceholder="Search by skills"
          rightActions={
            <SheetWrapper
              headerTitle="Add a skill"
              headerDescription="Add a new skill to your learning path"
              trigger={
                <Button>
                  <Plus /> Add a Skill
                </Button>
              }
            >
              <AddSkillForm />
            </SheetWrapper>
          }
        />
      </section>
      <SKillsContentsSection />
    </>
  );
}

export default SkillCapsulePage;
