"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CapsuleBox } from "./capsule-box";
import { cn } from "@/lib/utils";
import { MyTrackCapsule } from "@/lib/types/api";
const CARD_HALF = 163 / 2;

export function RoadmapTimeline({ capsules }: { readonly capsules: MyTrackCapsule[] }) {
  const overallHeightRef = useRef<HTMLElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Count the number of *leading* fully-completed capsules
  const leadingCompleted = useMemo(() => {
    let count = 0;
    for (const c of capsules) {
      if (c.progressPercentage === 100) count++;
      else break;
    }
    return count;
  }, [capsules]);

  // Unlocked only if all previous capsules are 100%
  const isUnlocked = (index: number) => capsules.slice(0, index).every((c) => c.progressPercentage === 100);

  // first capsule that isn't fully complete
  const nextInlineIndex = useMemo(() => {
    return leadingCompleted < capsules.length ? leadingCompleted : -1;
  }, [leadingCompleted, capsules.length]);

  useEffect(() => {
    const el = overallHeightRef.current;
    if (!el || capsules.length === 0) {
      setLineHeight(0);
      return;
    }
    const h = el.offsetHeight;

    // Cover completed capsules + the next inline (cap at total count)
    const visibleCount = Math.min(leadingCompleted + 1, capsules.length);
    const ratio = visibleCount / capsules.length;

    const next = Math.max(0, Math.min(h, h * ratio) - CARD_HALF);
    setLineHeight(next);
  }, [capsules, leadingCompleted]);

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
              <div className={cn("w-full flex", (i + 1) % 2 === 0 ? 'justify-end' : 'justify-start')} key={capsule.capsuleId}>
                <CapsuleBox capsule={capsule} isActive={isUnlocked(i)} isNextInline={i === nextInlineIndex} />
              </div>
            ))
          }
        </article>
      </div>
    </section>
  );
}