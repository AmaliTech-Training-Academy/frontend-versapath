import { SingleSkillResponse } from "@/lib/types/api";
import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { BookOpen } from "lucide-react";
import { FC } from "react";

export const SkillMoreInfo: FC<{ skill: SingleSkillResponse | null }> = ({
  skill,
}) => {
  return (
    <div className="max-w-[850px] w-full text-center mx-auto -mt-10 relative z-10  px-7 py-6  bg-base-light-white rounded-lg shadow-lg inline-flex flex-col md:flex-row gap-2 justify-between items-start md:items-center ">
      <div className="flex justify-start items-center gap-4">
        <ChartBarIcon className="size-6" />
        <div className="w-16 inline-flex flex-col justify-start items-start">
          <h3 className="text-gray-text-weak/70 text-xs leading-tight">
            Skill Level
          </h3>
          <h2 className="text-gray-text-strong/90 text-base font-semibold leading-normal">
            {skill?.proficiencyLevel ?? "N/A"}
          </h2>
        </div>
      </div>
      <div className="flex justify-start items-center gap-4">
        <ClockIcon className="size-6" />
        <div className="inline-flex flex-col justify-start items-start">
          <h3 className="justify-start text-gray-text-weak/70 text-xs leading-tight">
            Estimated time to complete
          </h3>
          <h2 className="text-gray-text-strong/90 text-base font-semibold leading-normal">
            {skill?.estimatedHours ?? "N/A"}{" "}
            {!skill?.estimatedHours
              ? ""
              : skill.estimatedHours > 1
              ? "hours"
              : "hour"}
          </h2>
        </div>
      </div>
      <div className="flex justify-start items-center gap-4">
        <BookOpen size={24} />
        <div className="inline-flex flex-col justify-start items-start">
          <h3 className="justify-start text-gray-text-weak/90 text-xs leading-tight">
            Skill difficulty
          </h3>
          <h2 className="justify-start text-gray-text-strong/90 text-base font-semibold leading-normal">
            {skill?.difficulty ?? "N/A"}
          </h2>
        </div>
      </div>
      <div className="flex justify-start items-center gap-4">
        <BookOpen size={24} />
        <div className="inline-flex flex-col justify-start items-start">
          <h3 className="justify-start text-gray-text-weak/90 text-xs leading-tight">
            Skill category
          </h3>
          <h2 className="justify-start text-gray-text-strong/90 text-base font-semibold leading-normal">
            {skill?.categoryType ?? "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};
