"use client";
import { useFetchSingleSkill, updateSKillAtoms } from "@/lib/api/skills";
import { useSkillAtoms } from "@/lib/hooks/use-skill-atoms";
import { FC } from "react";
import { SelectableItemsList } from "@/components/custom/selectable-items-list";

export const LessonsList: FC<{ skillId: string }> = ({ skillId }) => {
  const { skillAtoms, loading, error } = useSkillAtoms();
  const { skill } = useFetchSingleSkill(skillId);

  const selectedLessonIds =
    skill?.data?.item.skillAtoms?.map((atom) => atom.id) || [];
  return (
    <SelectableItemsList
      items={skillAtoms}
      selectedItemIds={selectedLessonIds}
      loading={loading}
      error={error}
      parentId={skillId}
      itemType="Lessons"
      itemTypeSingular="lesson"
      onUpdate={({ existingIds, selectedIds }) =>
        updateSKillAtoms({ existingIds, selectedIds, skillId })
      }
      mutateKey={`/capsules/${skillId}`}
      searchPlaceholder="Search lessons by name"
      showEstimatedHours={true}
    />
  );
};
