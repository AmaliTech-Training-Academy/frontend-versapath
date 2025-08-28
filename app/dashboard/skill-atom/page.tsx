'use client'
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import {SkillAtomsList}   from "./components/skill-atoms-list";
import { dummyLessons } from "@/lib/api/skill-atom-dummydata";

export default function LessonListPage() {
  return (
    <>
      <DashboardHeader title="Lessons" />
      <section className="bg-sidebar p-3 rounded-lg  h-full">
        <TopActions />
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
