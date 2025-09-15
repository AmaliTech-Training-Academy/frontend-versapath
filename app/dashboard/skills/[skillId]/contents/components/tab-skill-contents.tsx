"use client";
import { Label } from "@/components/ui/label";
import { lessonsMocks } from "@/lib/mocks/lessons";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const TabSkillContents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleActivateSkill = (key: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("activeLesson", key);
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="w-full max-w-full px-1 space-y-1 ">
      {lessonsMocks.map(({ id: key, title }, index) => (
        <div
          className={cn(
            "flex items-center gap-4 p-3 rounded-sm ",
            searchParams.get("activeLesson") === String(key) &&
              "bg-brand-primary-fill"
          )}
          key={key}
        >
          <p className="w-6 h-6 aspect-square text-gray-text-strong/70 rounded-full outline outline-offset-[-1px] outline-gray-text-strong/70 text-xs font-semibold leading-snug flex items-center justify-center">
            {index + 1}
          </p>
          <Label
            className="inline-flex flex-col items-start justify-center cursor-pointer"
            onClick={() => handleActivateSkill(String(key))}
          >
            <h3 className="text-base leading-normal text-start text-gray-text-strong/90 line-clamp-1">
              {title}
            </h3>
            <div className="inline-flex items-center justify-start gap-1">
              <PlayCircle size={10} className="text-gray-text-strong/30" />
              <h4 className="text-xs leading-tight text-gray-text-strong/50">
                3min
              </h4>
            </div>
          </Label>
        </div>
      ))}
    </section>
  );
};
