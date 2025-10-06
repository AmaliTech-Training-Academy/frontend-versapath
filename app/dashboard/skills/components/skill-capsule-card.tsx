import { SKill } from "@/lib/types/skills";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SkillCapsuleCardMenu } from "./skill-capsule-card-menu";
import { SkillProgressBar } from "./skill-progress-bar";
import { useCheckRole } from "@/lib/hooks/use-check-role";
import { LearningMetricsProps } from "@/lib/types/growth-track";

export const SkillCapsuleCard: React.FC<{
  skill: SKill;
  learningMetrics?: LearningMetricsProps;
}> = ({ skill, learningMetrics }) => {
  const { isLearner } = useCheckRole();
  const imageUrl = skill?.image ? skill.image : "/images/javascript.png";
  return (
    <section className="flex flex-col gap-0 rounded-bl-lg rounded-br-lg shadow-lg h-fit">
      <div className="relative w-full min-h-[168px] aspect-[330/168]">
        <Image
          src={imageUrl}
          fill
          alt={`${skill?.name}'s cover image`}
          className="object-cover w-full h-full"
        />
        {isLearner && !learningMetrics?.isUnlocked && (
          <div className="absolute inset-0 bg-[#000]/50 z-20 border flex items-center justify-center">
            <Image
              src={"/images/material-symbols_lock.svg"}
              width={64}
              height={64}
              alt="lock"
            />
          </div>
        )}
      </div>
      <article className="w-full p-3 space-y-4">
        <div className="inline-flex items-center justify-between w-full">
          <div className="flex items-center justify-start h-12 gap-1">
            <Link
              href={`/dashboard/skills/${skill.id}`}
              className="text-base font-semibold leading-normal transition-all text-gray-text-strong/90 line-clamp-2 hover:underline hover:underline-offset-1 hover:text-brand-primary-text"
            >
              {skill.name}
            </Link>
            {!isLearner && (
              <p className="px-2 py-1 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-text-strong/10 flex items-center text-gray-text-strong/70 text-xs leading-tight">
                {skill.status === "ACTIVE" ? "Published" : "Draft"}
              </p>
            )}
          </div>
          <p className="justify-center text-xs leading-tight text-center text-Text-Text-Weak/70">
            {new Date(skill.createdAt).toLocaleDateString("en-RW", {})}
          </p>
        </div>
        {isLearner && (
          <SkillProgressBar
            progress={learningMetrics?.progress}
            isUnlocked={learningMetrics?.isUnlocked}
          />
        )}
        <div className="flex justify-between w-full gap-2">
          <div className="space-x-2">
            <p className="inline-block px-2 py-1 text-xs leading-tight uppercase border w-fit bg-gray-text-strong/5 rounded-2xl border-gray-text-weak/10 text-gray-text-strong/70">
              {skill.difficulty ?? "Beginner"}
            </p>
            <p className="inline-block px-2 py-1 text-xs leading-tight border w-fit bg-gray-text-strong/5 rounded-2xl border-gray-text-weak/10 text-gray-text-strong/70">
              {skill.atomNumber} Lessons
            </p>
          </div>
          <SkillCapsuleCardMenu skill={skill} />
        </div>
      </article>
    </section>
  );
};
