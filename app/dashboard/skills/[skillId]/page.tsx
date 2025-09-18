"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader, PenBox, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { SheetWrapper } from "../../components/sheet-wrapper";
import { SkillMoreInfo } from "./components/skill-more-info";
import { SingleLessonListCard } from "./components/single-lesson-list-card";
import { LessonsList } from "./components/lessons-list";
import { removeLessonDuplicates, useFetchSingleSkill } from "@/lib/api/skills";
import { useParams } from "next/navigation";
import { SingleSkillResponse } from "@/lib/types/api";
import { SkillAtom } from "@/lib/types/skill-atom";
import { SkillContentProgressBar } from "./components/skill-contents-progress-bar";
import { useCheckRole } from "@/lib/hooks/use-check-role";

function SingleSkillPage() {
  const { skillId } = useParams();
  const { isLearner, isAdmin } = useCheckRole();
  const [skill, setSkill] = React.useState<SingleSkillResponse | null>(null);
  const [lessons, setLessons] = React.useState<SkillAtom[] | null>(null);
  const {
    skill: fetchedSkill,
    isFetchingSkill,
    fetchSkillError,
  } = useFetchSingleSkill(skillId as string);

  useEffect(() => {
    if (fetchedSkill?.data) {
      setSkill(fetchedSkill.data.item);
      setLessons(removeLessonDuplicates(fetchedSkill.data.item.skillAtoms));
    }
  }, [fetchedSkill]);
  if (isFetchingSkill)
    return (
      <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
        <Loader className="animate-spin" size={40} />
        <p>Loading skill data...</p>
      </div>
    );
  if (!fetchedSkill?.success || fetchSkillError)
    return (
      <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
        <Image
          src={"/not-found.png"}
          alt="No such skill found"
          height={100}
          width={100}
        />
        <p>
          There were unexpected error. Please refresh the page or consider going
          back and trying again.
        </p>
        <div className="flex gap-2">
          <Link href={"/dashboard/skills"}>
            <Button variant={"ghost"} className="bg-base-light-overlay/50">
              Go back
            </Button>
          </Link>
          <Button
            variant={"outline"}
            className="bg-transparent"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      </div>
    );
  const imageUrl = skill?.image ? skill.image : "/images/javascript.png";
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
          {skill?.name}
        </p>
      </article>
      <section className="w-full p-5 text-center rounded-lg bg-base-light-white">
        <article className="w-full text-start  p-5 bg-base-light-white rounded-lg relative top-0 left-0 min-h-[290px] overflow-hidden">
          <div className="absolute top-0 left-0 block w-full h-full max-w-full aspect-video ">
            <Image
              src={imageUrl}
              fill
              alt={`${skill?.name}'s cover image`}
              className="object-cover "
            />
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-base-dark-overlay/40 " />
          </div>
          <div className="relative z-10 inline-flex flex-col mt-16 text-base-light-white">
            <h3 className="text-xs leading-tight ">Skill</h3>
            <h2 className="justify-start text-2xl font-semibold leading-loose">
              {skill?.name}
            </h2>
            {isLearner && <SkillContentProgressBar />}
            {isAdmin && (
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
            )}
            {isLearner && <Button className="max-w-fit px-4">Start</Button>}
          </div>
        </article>
        <div className="w-full px-4">
          <SkillMoreInfo />
        </div>
        <div className="mt-10 text-lg font-semibold leading-relaxed text-start">
          About this skill
        </div>
        <div className="text-base text-start text-gray-text-strong/70">
          {skill?.description}
        </div>
        <article className="w-full mt-10 border text-start rounded-xl border-gray-stroke-weak">
          <div className="inline-flex items-center self-stretch justify-between w-full px-4 py-2 overflow-hidden bg-gray-text-weak/10">
            <div className="inline-flex flex-col items-start justify-start">
              <h3 className="justify-start text-lg font-semibold leading-relaxed text-gray-text-strong/90">
                Lessons
              </h3>
              <div className="inline-flex items-start justify-start gap-4">
                <p className="justify-start text-xs leading-tight text-gray-text-weak/70">
                  {skill?.skillAtoms.length} Lessons
                </p>
                <p className="justify-start text-xs leading-tight text-gray-text-weak/70">
                  5 Quiz Assessments
                </p>
              </div>
            </div>
            {isAdmin && (
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
                <LessonsList skillId={skill?.id ?? ""} />
              </SheetWrapper>
            )}
          </div>
          <div className="w-full p-5 text-center text-gray-text-strong/70 ">
            {lessons && lessons.length === 0 ? (
              <p className="py-5">No lessons linked to this skill found</p>
            ) : (
              lessons?.map((data, i) => (
                <SingleLessonListCard
                  data={{ ...data, skillId: skill?.id ?? "" }}
                  key={data.id}
                  index={i}
                  total={skill?.skillAtoms.length ?? 0}
                />
              ))
            )}
          </div>
        </article>
      </section>
    </section>
  );
}

export default SingleSkillPage;
