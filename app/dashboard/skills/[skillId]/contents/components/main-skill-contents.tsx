"use client";
import { Button } from "@/components/ui/button";
import { useFetchLesson } from "@/lib/api/skills";
import { useCheckRole } from "@/lib/hooks/use-check-role";
import { Loader, PenBox, Play } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export const MainSkillContents = () => {
  const searchParams = useSearchParams();
  const { isAdmin } = useCheckRole();
  const lessonId = searchParams.get("activeLesson") as string;
  const {
    lesson: fetchedLesson,
    isFetchingLesson,
    fetchLessonError,
  } = useFetchLesson(lessonId);

  if (fetchLessonError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 text-center border-s-2 border-gray-stroke-weak/70">
        <Image
          src={"/not-found.png"}
          alt="No lesson data found"
          height={100}
          width={100}
        />
        <p>
          {fetchLessonError.message ||
            "There was an error loading lesson data. Please try again"}
        </p>
      </div>
    );
  }
  if (isFetchingLesson) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full py-5 border-s-2 border-gray-stroke-weak/70">
        <Loader className="animate-spin" size={18} />
        <p className="text-gray-text-weak">Loading lesson data...</p>
      </div>
    );
  }
  const lesson = fetchedLesson?.data?.item;
  if (!lessonId || !lesson)
    return (
      <div className="w-full h-full py-10 border-s-2 border-gray-stroke-weak/70">
        {!lessonId &&
          "No lesson selected. Please select a lesson to view its details."}
        {lessonId && !lesson && "Lesson data not found."}
      </div>
    );
  return (
    <section className="w-full p-4 pt-0 space-y-6 overflow-y-auto tabs_scrollbar border-s-2 border-gray-stroke-weak/70">
      <article className="w-full flex justify-between items-center">
        <h2 className="justify-start text-lg font-semibold leading-relaxed text-start text-gray-text-strong/90">
          {lesson?.name || "N/A"}
        </h2>
        {isAdmin && (
          <Button variant={"ghost"} className="px-4 bg-gray-stroke-weak/60">
            <PenBox size={16} />
            <span className="ml-2">Edit lesson</span>
          </Button>
        )}
      </article>
      <div className="w-full aspect-video max-h-[500px] relative top-0 left-0">
        <Image
          src={"/images/javascript.png"}
          alt="Player image"
          fill
          priority={false}
          className=" blur-[3px]"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-base-dark-overlay/30 " />
        <div className="absolute z-20 inline-flex items-center justify-center p-3 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-base-light-white/40">
          <Play size={30} className="text-base-light-white" />
        </div>
      </div>
      <article className=" text-start text-gray-text-weak">
        {lesson?.description || "No description available for this lesson."}
      </article>
      <div className="flex justify-end gap-4">
        <Button variant={"ghost"} className="px-4">
          Previous
        </Button>
        <Button variant={"default"} className="px-4">
          Next
        </Button>
      </div>
    </section>
  );
};
