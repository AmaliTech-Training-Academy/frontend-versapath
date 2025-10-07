import React, { FC } from "react";

export const SkillProgressBar: FC<{
  progress?: number;
  isUnlocked?: boolean;
}> = ({ progress, isUnlocked }) => {
  return (
    <div className="w-full inline-flex justify-start items-center gap-4">
      <div className="w-full h-2 relative bg-brand-primary-stroke-strong/20 rounded-[20px] overflow-hidden">
        <div
          className="h-5 absolute bg-brand-primary-text"
          style={{ width: `${progress}%`, left: "0.33px", top: "-6px" }}
        />
      </div>
      <p className="text-center text-nowrap justify-center text-gray-text-weak text-xs font-normal leading-none">
        {isUnlocked ? `${progress}% progress` : "NOT STARTED"}
      </p>
    </div>
  );
};
