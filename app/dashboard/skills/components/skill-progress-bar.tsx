import React from "react";

export const SkillProgressBar = () => {
  return (
    <div className="w-full inline-flex justify-start items-center gap-4">
      <div className="w-full h-2 relative bg-brand-primary-stroke-strong/20 rounded-[20px] overflow-hidden">
        <div className="w-1 h-5 left-[0.33px] top-[-6px] absolute bg-brand-primary-text" />
      </div>
      <p className="text-center text-nowrap justify-center text-gray-text-weak text-xs font-normal leading-none">
        0% complete
      </p>
    </div>
  );
};
