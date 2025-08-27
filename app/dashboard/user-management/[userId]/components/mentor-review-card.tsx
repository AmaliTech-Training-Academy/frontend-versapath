import React from "react";

export const MentorReviewCard = () => {
  return (
    <section className="w-full p-4 space-y-6 border bg-base-light-white rounded-2xl border-gray-stroke-weak">
      <header>
        <h1 className="text-lg font-semibold leading-relaxed text-gray-text-strong">
          Mentor Reviews & Feedback
        </h1>
        <p className="text-sm leading-snug text-gray-text-strong/70">
          Recent skill assessments and mentor feedback
        </p>
      </header>
      <section className="w-full space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={"Index~" + index}
              className="p-4 w-full rounded-lg outline-1 outline-offset-[-1px] outline-gray-stroke-weak inline-flex flex-col  items-start gap-2"
            >
              <div>
                <p className="w-full text-sm font-semibold leading-snug text-black ">
                  React Components
                </p>
                <p className="w-full text-xs font-normal leading-tight text-gray-text-strong/70">
                  Added by Charles Ndayisaba
                </p>
              </div>
              <p className="w-full text-base font-normal leading-normal text-gray-text-strong/70">
                Great progress on understanding component lifecycle. Continue
                practicing with hooks.
              </p>
            </div>
          ))}
      </section>
    </section>
  );
};
