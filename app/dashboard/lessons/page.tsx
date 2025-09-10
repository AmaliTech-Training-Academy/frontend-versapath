"use client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../components/header";
import { SheetWrapper } from "../components/sheet-wrapper";
import { TopActions } from "../components/top-actions";
import { AddSkillAtomForm } from "./components/add-skill-atom-form";
import { SkillAtomsList } from "./components/skill-atoms-list";
import { dummyLessons } from "@/lib/api/skill-atom-dummydata";
import { Plus } from "lucide-react";

export default function LessonListPage() {
  return (
    <>
      <DashboardHeader title="Lessons" />
      <section className="bg-sidebar p-3 rounded-lg flex-grow">
        <TopActions
          searchPlaceholder="Search by lesson"
          rightActions={
            <SheetWrapper
              headerTitle="Add New Lesson"
              headerDescription="Add a new skill category to organize your tags"
              trigger={
                <Button>
                  <Plus /> Add Lesson
                </Button>
              }
            >
              <AddSkillAtomForm/>
            </SheetWrapper>
          }
        />
        <SkillAtomsList
          lessons={dummyLessons}
          onView={(id) => console.log("View lesson:", id)}
          onEdit={(id) => console.log("Edit lesson:", id)}
          onDelete={(id) => console.log("Delete lesson:", id)}
        />
      </section>
    </>
  );
}
