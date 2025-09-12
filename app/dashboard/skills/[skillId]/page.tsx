import { Button } from "@/components/ui/button";
import { ChevronRight, PenBox, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { SkillMoreInfo } from "./components/skill-more-info";
import { SingleLessonListCard } from "./components/single-lesson-list-card";
import { lessonsMocks } from "@/lib/mocks/lessons";
import { LessonsList } from "./components/lessons-list";

async function SingleSkillPage({
  params,
}: {
  readonly params: Promise<{ skillId: string }>;
}) {
  const { skillId } = await params;
  console.log("Skill ID:", skillId); // For debugging purposes - To be removed later once dynamic data are integrated
  return (
    <section>
      <h1 className="text-3xl font-semibold leading-10">Skills</h1>
      <article className="flex items-start gap-2 mt-2 mb-4">
        <Link
          href="/dashboard/skills"
          className="inline-block text-xs leading-tight transition-all text-gray-text-strong hover:underline underline-offset-2"
        >
          Skills
        </Link>
        <ChevronRight className="w-4 h-4 text-neutral-900/30" />
        <p className="justify-start text-xs font-semibold leading-tight text-center text-brand-primary-text">
          Javascript Essentials
        </p>
      </article>
      <section className="w-full p-5 text-center rounded-lg  bg-base-light-white">
        <article className="w-full text-start  p-5 bg-base-light-white rounded-lg relative top-0 left-0 min-h-[290px] overflow-hidden">
          <div className="absolute top-0 left-0 block w-full h-full max-w-full aspect-video ">
            <Image
              src={"/images/javascript.png"}
              fill
              alt="Skill capsule image"
              className="object-cover "
            />
          </div>
          <div className="relative z-10 inline-flex flex-col mt-16 text-base-light-white">
            <h3 className="text-xs leading-tight ">Skill Capsule</h3>
            <h2 className="justify-start text-2xl font-semibold leading-loose">
              JavaScript Essentials
            </h2>
            <SheetWrapper
              headerDescription="Update skill information"
              headerTitle="Edit Skill"
              trigger={
                <Button
                  variant={"ghost"}
                  className="bg-base-light-white text-brand-primary-text hover:bg-base-light-white/90 w-fit"
                >
                  <PenBox />
                  Edit Skill
                </Button>
              }
            >
              <div className="w-full h-96">Form goes here</div>
            </SheetWrapper>
          </div>
        </article>
        <SkillMoreInfo />
        <div className="mt-10 text-lg font-semibold leading-relaxed  text-start">
          About this skill
        </div>
        <div className="text-base text-start text-gray-text-strong/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <article className="w-full mt-10 border text-start rounded-xl border-gray-stroke-weak">
          <div className="inline-flex items-center self-stretch justify-between w-full px-4 py-2 overflow-hidden bg-gray-text-weak/10">
            <div className="inline-flex flex-col items-start justify-start">
              <h3 className="justify-start text-lg font-semibold leading-relaxed text-gray-text-strong/90">
                Lessons
              </h3>
              <div className="inline-flex items-start justify-start gap-4">
                <p className="justify-start text-xs leading-tight text-gray-text-weak/70">
                  15 Lessons
                </p>
                <p className="justify-start text-xs leading-tight text-gray-text-weak/70">
                  5 Quiz Assessments
                </p>
              </div>
            </div>
            <SheetWrapper
              headerDescription="Add at least one lesson to this skill capsule"
              headerTitle="Add Lesson"
              trigger={
                <Button
                  variant="ghost"
                  className=" bg-base-light-white hover:bg-base-light-white/80"
                >
                  <Plus />
                  Add Lesson
                </Button>
              }
            >
              <LessonsList />
              
            </SheetWrapper>
          </div>
          <div className="w-full p-5 text-center text-gray-text-strong/70 ">
            {lessonsMocks.map((data, i) => (
              <SingleLessonListCard
                key={data.id}
                data={data}
                index={i}
                total={lessonsMocks.length}
              />
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}

export default SingleSkillPage;
