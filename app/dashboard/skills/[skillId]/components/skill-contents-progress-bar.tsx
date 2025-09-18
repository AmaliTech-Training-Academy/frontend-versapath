import React from "react";

export const SkillContentProgressBar = () => {
  return (
    <div className="self-stretch inline-flex justify-start items-center gap-4 my-2">
      <div className="w-80 h-2 relative bg-brand-primary-stroke-strong/20 rounded-[20px] overflow-hidden">
        <div className="w-0 h-5 left-0 top-[-5.50px] absolute bg-brand-primary-text" />
      </div>
      <p className="text-center justify-center text-base-white text-xs font-normal leading-none">
        0% complete
      </p>
    </div>
  );
};
