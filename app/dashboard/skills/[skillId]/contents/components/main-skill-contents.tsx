"use client";
import { Button } from "@/components/ui/button";
import {
  handleSKillProgress,
  useFetchLessonContents,
  useGetRoadmapCapsuleLessons,
} from "@/lib/api/skills";
import { useCheckRole } from "@/lib/hooks/use-check-role";
import { CheckCircle, Loader, PenBox } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { renderLink } from "./render-link";
import { useProgressMetadata } from "@/lib/hooks/use-progress-metadata";
import { toast } from "sonner";
import { SKillStatus } from "@/lib/types/api";
import { cn } from "@/lib/utils";

export const MainSkillContents = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const { isAdmin, isLearner } = useCheckRole();
  const lessonId = searchParams.get("activeLesson") as string;
  const moodleId = searchParams.get("moodleId") as string;
  const { skillId } = params as { skillId: string };
  const { lessonContents, isFetchingLessonContents, fetchLessonContentsError } =
    useFetchLessonContents(moodleId);
  const { roadmap, track } = useProgressMetadata(skillId);
  const { capsuleLessons, revalidateCapsuleLessons } =
    useGetRoadmapCapsuleLessons(skillId);
  const matchingLesson = capsuleLessons?.data?.find(
    (l) => l.atomId === lessonId
  );
  const lessonStatus = matchingLesson?.status;
  const handleUpdateLessonStatus = () => {
    const res = handleSKillProgress(
      {
        capsuleId: skillId,
        talentRouteId: roadmap?.data?.talentRouteId || "",
        atomId: lessonId,
        learnerId: roadmap?.data?.learnerId || "",
        trackId: track?.trackId || "",
      },
      true
    );
    toast.promise(res, {
      loading: "Marking as complete...",
      success: (data) => {
        revalidateCapsuleLessons();
        return data?.message || "Lesson status updated successfully!";
      },
      error: (err) => err.message || "There was an error marking lesson.",
    });
  };
  if (fetchLessonContentsError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 text-center border-s-2 border-gray-stroke-weak/70">
        <Image
          src={"/not-found.png"}
          alt="No lesson data found"
          height={100}
          width={100}
        />
        <p>
          {fetchLessonContentsError.message ||
            "There was an error loading lesson data. Please try again"}
        </p>
      </div>
    );
  }
  if (isFetchingLessonContents) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full py-5 border-s-2 border-gray-stroke-weak/70">
        <Loader className="animate-spin" size={18} />
        <p className="text-gray-text-weak">Loading lesson data...</p>
      </div>
    );
  }
  const lesson = lessonContents?.data?.item;
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  const lessonContentsParts =
    lesson?.content
      .split(urlRegex)
      .map((val) => ({ id: crypto.randomUUID(), content: val })) || [];
  if (!lessonId || !lesson)
    return (
      <section className="border-s-2 border-gray-stroke-weak/70 flex flex-col items-center justify-center w-full h-full mt-4 min-h-[400px]">
        <Image
          src={"/not-found.png"}
          alt="Error loading users"
          height={100}
          width={100}
        />
        <p className="mt-2">
          {" "}
          {lessonId && !lesson && "Lesson data cannot be found."}
          {!lessonId &&
            "No lesson selected. Please select a lesson to view its content."}
        </p>
      </section>
    );
  // Extract lesson status label
  let lessonStatusLabel = "Not Started";
  if (lessonStatus === SKillStatus.COMPLETED) {
    lessonStatusLabel = "Completed";
  } else if (lessonStatus === SKillStatus.IN_PROGRESS) {
    lessonStatusLabel = "In Progress";
  }

  return (
    <section className="w-full p-4 pt-0 space-y-6 overflow-y-auto tabs_scrollbar border-s-2 border-gray-stroke-weak/70">
      <article className="w-full flex justify-between items-center">
        <h2 className="justify-start text-lg font-semibold leading-relaxed text-start text-gray-text-strong/90">
          {lesson?.name || "N/A"}{" "}
          {isLearner && (
            <span
              className={cn(
                "text-xs p-1 px-2 rounded-lg border  uppercase ms-5",
                lessonStatus === SKillStatus.COMPLETED &&
                  "bg-green-fill text-green-text border-green-text",
                lessonStatus === SKillStatus.IN_PROGRESS &&
                  "bg-amber-fill text-amber-text border-amber-text"
              )}
            >
              {lessonStatusLabel}
            </span>
          )}
        </h2>
        {isAdmin && (
          <Button variant={"ghost"} className="px-4 bg-gray-stroke-weak/60">
            <PenBox size={16} />
            <span className="ml-2">Edit lesson</span>
          </Button>
        )}
      </article>
      <div className="min-h-[calc(100vh-250px)] space-y-4 text-start">
        {lessonContentsParts?.map(({ content, id }) =>
          urlRegex.test(content) ? (
            <div key={id}>{renderLink(content)}</div>
          ) : (
            <div key={id} dangerouslySetInnerHTML={{ __html: content }} />
          )
        )}
      </div>
      {isLearner && (
        <div className="flex justify-end gap-4 ">
          <Button
            variant={"outline"}
            onClick={handleUpdateLessonStatus}
            disabled={matchingLesson?.status === SKillStatus.COMPLETED}
          >
            {matchingLesson?.status === SKillStatus.COMPLETED ? (
              "Completed"
            ) : (
              <>
                <CheckCircle />
                Mark as complete
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};
