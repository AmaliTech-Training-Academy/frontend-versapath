"use client";
import { Label } from "@/components/ui/label";
import {
  handleSKillProgress,
  removeLessonDuplicates,
  useFetchSingleSkill,
  useGetRoadmapCapsuleLessons,
} from "@/lib/api/skills";
import { useProgressMetadata } from "@/lib/hooks/use-progress-metadata";
import { SKillStatus } from "@/lib/types/api";
import { cn } from "@/lib/utils";
import { Loader, PlayCircle } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const TabSkillContents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { skillId } = useParams();
  const { skill, isFetchingSkill, fetchSkillError } = useFetchSingleSkill(
    skillId as string
  );
  const { roadmap, track } = useProgressMetadata(skillId as string);
  const { capsuleLessons, revalidateCapsuleLessons } =
    useGetRoadmapCapsuleLessons(skillId as string);

  const handleActivateSkill = (key: string, moodlePageId: string) => {
    const lessonToOpen = capsuleLessons?.data?.find((l) => l.atomId === key);
    const navigate = () => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("activeLesson", key);
      params.set("moodleId", moodlePageId);
      router.push(`?${params.toString()}`, { scroll: true });
    };
    if (
      lessonToOpen?.completed ||
      lessonToOpen?.status === SKillStatus.IN_PROGRESS
    ) {
      return navigate();
    }
    const res = handleSKillProgress({
      capsuleId: skillId as string,
      talentRouteId: roadmap?.data?.talentRouteId || "",
      atomId: key,
      learnerId: roadmap?.data?.learnerId || "",
      trackId: track?.trackId || "",
    });
    toast.promise(res, {
      loading: "Loading lesson...",
      success: (data) => {
        navigate();
        revalidateCapsuleLessons();
        return data?.message || "Enjoy starting the lesson successfully!";
      },
      error: (err) => err.message || "There was an error loading lesson.",
    });
  };
  const skillAtoms = skill?.data?.item.skillAtoms || [];
  return (
    <section className="w-full h-full max-w-full px-1 space-y-1 ">
      {fetchSkillError && (
        <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
          <p>
            {fetchSkillError ||
              "There was an error loading skill data. Please try again"}
          </p>
        </div>
      )}
      {isFetchingSkill && (
        <div className="flex flex-col items-center justify-center w-full h-full py-5">
          <Loader className="animate-spin" size={18} />
          <p className="text-gray-text-weak">Loading skill data...</p>
        </div>
      )}
      {removeLessonDuplicates(skillAtoms).map(
        ({ id, name, estimatedHours, moodlePageId }, index) => (
          <div
            className={cn(
              "flex items-center gap-4 p-3 rounded-sm ",
              searchParams.get("activeLesson") === String(id) &&
                "bg-brand-primary-fill"
            )}
            key={id}
          >
            <p className="w-6 h-6 aspect-square text-gray-text-strong/70 rounded-full outline outline-offset-[-1px] outline-gray-text-strong/70 text-xs font-semibold leading-snug flex items-center justify-center">
              {index + 1}
            </p>
            <Label
              className="inline-flex flex-col items-start justify-center cursor-pointer"
              onClick={() =>
                handleActivateSkill(String(id), String(moodlePageId))
              }
            >
              <h3 className="text-base leading-normal text-start text-gray-text-strong/90 line-clamp-1">
                {name}
              </h3>
              {!!estimatedHours && (
                <div className="inline-flex items-center justify-start gap-1">
                  <PlayCircle size={10} className="text-gray-text-strong/30" />
                  <h4 className="text-xs leading-tight text-gray-text-strong/50">
                    {estimatedHours ?? "0"}{" "}
                    {estimatedHours === 1 ? "hour" : "hours"}
                  </h4>
                </div>
              )}
            </Label>
          </div>
        )
      )}
    </section>
  );
};
