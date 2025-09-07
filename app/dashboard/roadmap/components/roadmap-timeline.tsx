"use client";
import React, { useEffect, useRef } from "react";
import { CapsuleBox } from "./capsule-box";
import { cn } from "@/lib/utils";

type Capsule = { name: string, description: string, progress?: number };

export function RoadmapTimeline({ capsules }: { capsules: Capsule[] }) {
  const overallHeightRef = useRef<HTMLElement | null>(null);
  const [lineHeight, setLineHeight] = React.useState(1);
  // Trigger cards when in view
  useEffect(() => {
    if (overallHeightRef.current) {
      const activeCards = capsules.filter(c => c.progress && c.progress > 0).length;
      setLineHeight((overallHeightRef.current.offsetHeight * (activeCards / capsules.length)) - (163 / 2));
    }
  }, []);


  return (
    <section className="bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom rounded-md overflow-hidden bg-brand-primary-fill" >
      <div className="bg-[#00708a]/20 px-20 py-16">
        <article className=" w-full flex flex-col relative h-full " ref={overallHeightRef}>
          <div className="w-1 h-full absolute left-1/2 -translate-x-1/2 top-0 bg-gray-text-strong/20">
            <div className="w-full relative bg-brand-primary-text" style={{ height: `${lineHeight}px` }}>
              <div className="p-1 bg-brand-primary-text/20 rounded-full inline-flex justify-start items-center gap-2.5 top-[100%] absolute left-1/2 -translate-1/2">
                <div className="p-1 bg-brand-primary-stroke-strong/80 rounded-full flex justify-start items-center gap-2.5">
                  <div className="w-4 h-4 bg-brand-primary-text rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {
            capsules.map((capsule, i) => (
              <div className={cn("w-full flex", (i + 1) % 2 === 0 ? 'justify-end' : 'justify-start')} key={i}>
                <CapsuleBox capsule={capsule} />
              </div>
            ))
          }
        </article>
      </div>
    </section>
  );
}