"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { useFetchSingleSkill, updateSKillAtoms } from "@/lib/api/skills";
import { useSkillAtoms } from "@/lib/hooks/use-skill-atoms";
import { Loader, PlayCircle } from "lucide-react";
import { useEffect, useState, FC, useRef } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const LessonsList: FC<{ skillId: string }> = ({ skillId }) => {
  const { skillAtoms, loading, error } = useSkillAtoms();
  const [checkedLessons, setCheckedLessons] = useState<string[]>([]);
  const [originalLessons, setOriginalLessons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { skill } = useFetchSingleSkill(skillId);
  const closeFormRef = useRef<HTMLButtonElement>(null);
  const handleLessonCheck = (lessonId: string, checked: boolean) => {
    setCheckedLessons((prev) =>
      checked
        ? [...new Set([...prev, lessonId])]
        : prev.filter((id) => id !== lessonId)
    );
  };

  const handleAddLessons = async () => {
    setIsSubmitting(true);

    try {
      const response = await updateSKillAtoms({
        existingIds: originalLessons,
        selectedIds: checkedLessons,
        skillId,
      });

      if (!response.success) {
        toast.error(
          response.errors?.[0] ||
            response.message ||
            "Failed to update lessons. Please try again"
        );
        return;
      }

      toast.success(response.message || "Lessons updated successfully");
      closeFormRef.current?.click();
      setOriginalLessons([...checkedLessons]);

      mutate(`/capsules/${skillId}`);
    } catch (error) {
      console.error("Error updating lessons:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (skill?.data?.item.skillAtoms) {
      const skillAtomIds = skill.data.item.skillAtoms.map((atom) => atom.id);
      setCheckedLessons([...new Set(skillAtomIds)]);
      setOriginalLessons([...new Set(skillAtomIds)]);
    }
  }, [skill]);

  const hasChanges = () => {
    if (originalLessons.length !== checkedLessons.length) return true;
    return !originalLessons.every((id) => checkedLessons.includes(id));
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-[100px]">
          <Loader strokeWidth={1.5} className="animate-spin" size={28} />
          <span className="px-2 text-lg font-semibold text-gray-text-strong">
            Lessons Loading
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
          <p>
            {error || "There was an error loading lessons. Please try again"}
          </p>
        </div>
      )}

      {!error && !loading && (
        <section className="flex flex-col w-full gap-2 px-3">
          <form className="sticky left-0 w-full top-1">
            <Input
              placeholder="Search by name"
              name="searchLessonInput"
              className="w-full bg-base-light-white"
            />
          </form>

          <article className="h-full mt-1 mb-2 space-y-1">
            {skillAtoms.map(({ id, name, estimatedHours }) => (
              <div
                className="flex items-center gap-4 p-3 rounded-sm lesson_card_selector"
                key={id}
              >
                <Checkbox
                  className="text-gray-text-strong lesson_checkbox"
                  id={id}
                  onCheckedChange={(checked) =>
                    handleLessonCheck(id, Boolean(checked))
                  }
                  checked={checkedLessons.includes(id)}
                />
                <Label
                  htmlFor={id}
                  className="inline-flex flex-col items-start justify-center flex-1 cursor-pointer"
                >
                  <h3 className="text-base leading-normal text-gray-text-strong/90 line-clamp-1">
                    {name}
                  </h3>
                  <div className="inline-flex items-center justify-start gap-1">
                    <PlayCircle
                      size={10}
                      className="text-gray-text-strong/30"
                    />
                    <h4 className="text-xs leading-tight text-gray-text-strong/50">
                      {estimatedHours} {estimatedHours === 1 ? "hour" : "hours"}
                    </h4>
                  </div>
                </Label>
              </div>
            ))}
          </article>

          <div className="flex items-center justify-between mb-5">
            {/* Show changes summary */}
            <div className="text-sm text-gray-text-weak">
              {hasChanges() && (
                <span>
                  {checkedLessons.length - originalLessons.length > 0 &&
                    `+${
                      checkedLessons.filter(
                        (id) => !originalLessons.includes(id)
                      ).length
                    } to add`}
                  {checkedLessons.length - originalLessons.length > 0 &&
                    originalLessons.filter((id) => !checkedLessons.includes(id))
                      .length > 0 &&
                    ", "}
                  {originalLessons.filter((id) => !checkedLessons.includes(id))
                    .length > 0 &&
                    `-${
                      originalLessons.filter(
                        (id) => !checkedLessons.includes(id)
                      ).length
                    } to remove`}
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              <SheetClose asChild ref={closeFormRef}>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                type="button"
                className="px-5"
                onClick={handleAddLessons}
                disabled={isSubmitting || !hasChanges()}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 animate-spin" size={16} />
                    Updating...
                  </>
                ) : (
                  "Update Lessons"
                )}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
