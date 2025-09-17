import Image from "next/image";
import React from "react";
export const StreakBanner = () => {
  return (
    <section className="flex flex-col md:flex-row gap-3 md:gap-1 justify-between items-center p-3 bg-base-white rounded-xl">
      <hgroup>
        <h3 className="text-2xl font-semibold leading-relaxed text-center md:text-start ">
          Start a weekly streak
        </h3>
        <h4 className="justify-start text-Text-Text-Weak/70 text-base leading-normal">
          Watch 5 minutes of video per day to reach your goals.
        </h4>
      </hgroup>
      <div className="p-2 bg-brand-primary-fill rounded-lg inline-flex flex-col justify-start items-center gap-1">
        <Image
          src={"/images/mdi_fire.svg"}
          alt="Fire image"
          width={44}
          height={44}
        />
        <h4 className="justify-start text-sm leading-snug">128 days</h4>
      </div>
    </section>
  );
};
