"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { apiRequest } from "@/lib/api/api-request";
import { useFetchSingleSkill } from "@/lib/api/skills";
import { useSkillAtoms } from "@/lib/hooks/use-skill-atoms";
import { Loader, PlayCircle } from "lucide-react";
import { useEffect, useState, FC } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const LessonsList: FC<{ skillId: string }> = ({ skillId }) => {
  const { skillAtoms, loading, error } = useSkillAtoms();
  const [checkedLessons, setCheckedLessons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { skill } = useFetchSingleSkill(skillId);
  const handleLessonCheck = (lessonId: string, checked: boolean) => {
    setCheckedLessons((prev) =>
      checked
        ? [...new Set([...prev, lessonId])]
        : prev.filter((id) => id !== lessonId)
    );
  };
  const handleAddLessons = async () => {
    // Logic to add selected lessons to the skill

    setIsSubmitting(true);
    const response = await apiRequest(
      `/capsules/assignAtom/${skillId}`,
      "PATCH",
      {
        atomIds: checkedLessons,
      }
    );
    if (!response.success) {
      setIsSubmitting(false);
      toast.error(
        response.errors?.[0] ||
          response.message ||
          "Failed to add lessons. Please try again"
      );
      return;
    }
    toast.success("Lessons updated successfully");
    setIsSubmitting(false);
    mutate(`/capsules/${skillId}`);
  };
  useEffect(() => {}, [checkedLessons]);
  useEffect(() => {
    if (skill?.data?.item.skillAtoms) {
      setCheckedLessons([
        ...new Set(skill.data.item.skillAtoms.map((atom) => atom.id)),
      ]);
    }
  }, [skill]);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-[100px]">
          <Loader strokeWidth={1.5} className="animate-spin" size={28} />
          <span className="text-gray-text-strong text-lg px-2 font-semibold">
            Lessons Loading
          </span>
        </div>
      )}
      {error && !loading && (
        <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
          <p>
            {error || "There was an error loadin lessons. Please try again"};
          </p>
        </div>
      )}
      {!error && !loading && (
        <section className="flex flex-col gap-2 w-full px-3 ">
          <form className="sticky left-0 w-full top-1 ">
            <Input
              placeholder={"Search by name"}
              name="searchLessonInput"
              className="w-full bg-base-light-white"
            />
          </form>

          <article className="h-full mt-1 space-y-1 mb-2">
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
                  className="inline-flex flex-col items-start justify-center"
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
          <div className="flex justify-end mb-5 space-x-3">
            <SheetClose asChild>
              <Button variant={"outline"} className="cursor-pointer">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" className="px-5" onClick={handleAddLessons}>
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2" size={16} />{" "}
                  Submitting...
                </>
              ) : (
                "Add Lessons"
              )}
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
