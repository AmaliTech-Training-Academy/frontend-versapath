import { SKill } from "@/lib/types/skills";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SkillCapsuleCardMenu } from "./skill-capsule-card-menu";

export const SkillCapsuleCard: React.FC<{ skill: SKill }> = ({ skill }) => {
  return (
    <section className="flex flex-col h-fit gap-0 shadow-lg rounded-bl-lg rounded-br-lg">
      <div className="relative w-full min-h-[168px] aspect-[330/168]">
        <Image
          src={"/images/javascript.png"}
          fill
          alt="SKill capsule image"
          className="object-cover w-full h-full"
        />
      </div>
      <article className="w-full p-3 space-y-4">
        <div className="w-full inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-1 h-12">
            <Link
              href={`/dashboard/skills/${skill.id}`}
              className="text-gray-text-strong/90 line-clamp-2  text-base font-semibold  leading-normal hover:underline hover:underline-offset-1 transition-all hover:text-brand-primary-text"
            >
              {skill.name}
            </Link>
            <p className="px-2 py-1 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-text-strong/10 flex items-center text-gray-text-strong/70 text-xs leading-tight">
              {skill.status === "ACTIVE" ? "Published" : "Draft"}
            </p>
          </div>
          <p className="text-center justify-center text-Text-Text-Weak/70 text-xs  leading-tight">
            23, Aug. 2024
          </p>
        </div>
        <div className="flex gap-2 w-full justify-between">
          <div className="space-x-2">
            <p className=" inline-block px-2 py-1 w-fit bg-gray-text-strong/5 rounded-2xl border border-gray-text-weak/10  text-gray-text-strong/70 text-xs leading-tight uppercase ">
              {skill.difficulty ?? "Beginner"}
            </p>
            <p className="inline-block px-2 py-1 w-fit bg-gray-text-strong/5 rounded-2xl border border-gray-text-weak/10  text-gray-text-strong/70 text-xs leading-tight">
              {skill.atomNumber} Lessons
            </p>
          </div>
          <SkillCapsuleCardMenu skill={skill} />
        </div>
      </article>
    </section>
  );
};
