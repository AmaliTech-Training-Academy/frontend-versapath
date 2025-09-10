"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "../components/header";
import { SheetWrapper } from "../components/sheet-wrapper";
import { TopActions } from "../components/top-actions";
import { AddSkillAtomForm } from "./components/add-skill-atom-form";
import { SkillAtomsList } from "./components/skill-atoms-list";
import { Loader, Plus } from "lucide-react";
import { useSkillAtoms } from "@/lib/hooks/use-skill-atoms";

export default function SkillAtomListPage() {
  const { skillAtoms, loading, error, refreshLessons, setSkillAtoms } =
    useSkillAtoms();

  const handleDelete = (id: string) => {
    setSkillAtoms((prev) => prev.filter((atom) => atom.id !== id));
  };

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
              <AddSkillAtomForm onSuccess={refreshLessons} />
            </SheetWrapper>
          }
        />
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader className="animate-spin" size={28}/> <span className="text-gray-text-strong text-lg px-2 font-semibold">Lesson Loading</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center min-h-[200px]">{error}</div>
        ) : (
          <SkillAtomsList
            skillAtoms={skillAtoms}
            onView={(id) => console.log("View lesson:", id)}
            onEdit={refreshLessons}
            onDelete={handleDelete}
            onRefresh={refreshLessons}
          />
        )}
      </section>
    </>
  );
}
