"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SkillAtomCard } from "./skill-atom-card";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { SkillAtom } from "@/lib/types/skill-atom";
import { deleteAtom } from "@/lib/api/skill-atom-api";
import { toast } from "sonner";

interface SkillAtomListProps {
  skillAtoms: SkillAtom[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

export const SkillAtomsList: React.FC<SkillAtomListProps> = ({
  skillAtoms,
  onView,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<SkillAtom | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!selectedLesson) return;

    setLoading(true);
    const success = await deleteAtom(selectedLesson.id);

    if (success) {
      onDelete?.(selectedLesson.id);
      toast.success("Lesson deleted successfully");
    } else {
      alert("Failed to delete lesson. Please try again.");
    }

    setLoading(false);
    setSelectedLesson(null);
  };

  if (skillAtoms.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="No skillAtom found"
          height={100}
          width={100}
        />
        <p className="text-sm text-gray-500 mt-2">No Lesson found</p>
      </section>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {skillAtoms.map((skillatom) => (
          <SkillAtomCard
            key={skillatom.id}
            skillatom={skillatom}
            onView={onView}
            onEdit={onEdit}
            onDelete={() => setSelectedLesson(skillatom)}
            onRefresh={onRefresh}
          />
        ))}
      </div>

      <ConfirmDialog
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        title="Delete Lesson?"
        description="Are you sure you want to delete this lesson? This action will delete the respective lesson permanently. You might want to achieve it."
        confirmLabel={loading ? "Deleting..." : "Delete"}
        alternativeLabel="Archive"
        destructive
        onConfirm={handleDeleteConfirm}
        onAlternative={() => {
          setSelectedLesson(null);
        }}
      />
    </>
  );
};
