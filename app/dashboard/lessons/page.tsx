//
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
import { Pagination } from "@/components/custom/pagination";

export default function SkillAtomListPage() {
  const { skillAtoms, loading, error, refreshLessons, setSkillAtoms } =
    useSkillAtoms();

  const [activePage, setActivePage] = React.useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(skillAtoms.length / itemsPerPage);

  const paginatedSkillAtoms = React.useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return skillAtoms.slice(start, start + itemsPerPage);
  }, [skillAtoms, activePage]);

  const handleDelete = (id: string) => {
    setSkillAtoms((prev) => prev.filter((atom) => atom.id !== id));
  };
  const startIdx = (activePage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(activePage * itemsPerPage, skillAtoms.length);
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
            <Loader className="animate-spin" size={28} />{" "}
            <span className="text-gray-text-strong text-lg px-2 font-semibold">
              Lesson Loading
            </span>
          </div>
        ) : error ? (
          <div className="text-red/50 text-center min-h-[200px]">{error}</div>
        ) : (
          <>
            <SkillAtomsList
              skillAtoms={paginatedSkillAtoms}
              onView={(id) => console.log("View lesson:", id)}
              onEdit={refreshLessons}
              onDelete={handleDelete}
              onRefresh={refreshLessons}
            />
            <div className="flex items-center justify-between mt-7">
              <p className="text-sm text-gray-text-weak">
                Showing {startIdx} to {endIdx} of {skillAtoms.length} Resources
              </p>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                handlePaginationBtnClick={(pageIndex) =>
                  setActivePage(pageIndex + 1)
                }
                handleNext={() =>
                  setActivePage((prev) => Math.min(prev + 1, totalPages))
                }
                handlePrev={() =>
                  setActivePage((prev) => Math.max(prev - 1, 1))
                }
                nextDisabled={activePage === totalPages}
                prevDisabled={activePage === 1}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
