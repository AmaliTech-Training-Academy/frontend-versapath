"use client";
import { Button } from "@/components/ui/button";
import { useFetchLessonContents } from "@/lib/api/skills";
import { useCheckRole } from "@/lib/hooks/use-check-role";
import { Loader, PenBox } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { renderLink } from "./render-link";

export const MainSkillContents = () => {
  const searchParams = useSearchParams();
  const { isAdmin } = useCheckRole();
  const lessonId = searchParams.get("activeLesson") as string;
  const moodleId = searchParams.get("moodleId") as string;
  const { lessonContents, isFetchingLessonContents, fetchLessonContentsError } =
    useFetchLessonContents(moodleId);
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
  const parts =
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
      <div className="min-h-[calc(100vh-250px)] space-y-4 text-start">
        {parts?.map(({ content: part, id }) =>
          urlRegex.test(part) ? (
            <div key={id}>{renderLink(part)}</div>
          ) : (
            <div key={id} dangerouslySetInnerHTML={{ __html: part }} />
          )
        )}
      </div>
      {/* This is currently set to invisible, because these functionalities are yet to be implemented from the bakcend */}
      <div className="flex justify-end gap-4 invisible">
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
