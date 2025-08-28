import React from 'react'

export const GrowthTrack = () => {
  return (
    <section className="w-full space-y-6 p-4 bg-base-light-white rounded-2xl border border-gray-stroke-weak">
      <header>
        <h1 className=" text-gray-text-strong text-lg font-semibold leading-relaxed">
          Growth Track
        </h1>
        <p className="text-gray-text-strong/70 text-sm  leading-snug">
          Current learning path and skill development
        </p>
      </header>
      <article className="w-full flex justify-between items-center">
        <div>
          <p className="text-gray-text-strong/70 text-sm leading-snug">
            Current Track
          </p>
          <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
            Full Stack Developter
          </p>
        </div>
        <div>
          <p className="text-gray-text-strong/70 text-sm leading-snug">
            Assigned Mentor
          </p>
          <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
            Fiifi Titus Appiah
          </p>
        </div>
        <div>
          <p className="text-gray-text-strong/70 text-sm leading-snug">
            Manager
          </p>
          <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
            Charles Ndayisaba
          </p>
        </div>
        <div>
          <p className="text-gray-text-strong/70 text-sm leading-snug">
            Skills Completed
          </p>
          <p className="text-gray-text-strong/90 text-base font-semibold  leading-normal">
            12
          </p>
        </div>
      </article>
      <article>
        <p className="text-gray-text-strong/70 text-sm leading-snug">
          Current Progress
        </p>
        <div className="w-full flex gap-2 items-center">
          <div className="w-full h-2 relative bg-green-text/20 rounded-[20px] overflow-hidden">
            <div
              className=" h-5 left-0 top-[-6px] absolute bg-green-text"
              style={{ width: "65%" }}
            />
          </div>
          <div className=" text-gray-text-strong/70 text-xs text-nowrap  leading-tight">
            65% complete
          </div>
        </div>
      </article>
    </section>
  );
}
