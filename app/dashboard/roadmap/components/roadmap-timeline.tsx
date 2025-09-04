import React from "react";
import { CapsuleBox } from "./capsule-box";

type Capsule = { name: string, description: string, progress?: number };

export function RoadmapTimeline({ capsules }: { capsules: Capsule[] }) {
  // Split into left/right columns based on index parity
  const left = capsules.filter((_, i) => i % 2 === 0);
  const right = capsules.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative rounded-lg overflow-hidden bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom">
      {/* Cyan overlay to match template */}
      <div className="bg-cyan-700/20">
        {/* Timeline container */}
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          {/* Center divider */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-[color:var(--Brand-Stroke-Weak,theme(colors.gray.200))]/20"
          >
            {/* Strong top segment + knob, like your template */}
            <div className="relative h-20 w-full bg-[color:var(--Brand-Stroke-Strong,theme(colors.gray.400))]/80">
              <div className="absolute left-1/2 top-[68px] -translate-x-1/2 rounded-full bg-[color:var(--Brand-Stroke-Weak,theme(colors.gray.200))]/20 p-1">
                <div className="rounded-full bg-[color:var(--Brand-Stroke-Strong,theme(colors.gray.400))]/80 p-1">
                  <div className="h-4 w-4 rounded-full bg-[color:var(--Brand-Default,theme(colors.cyan.600))]" />
                </div>
              </div>
            </div>
          </div>

          {/* Two columns; right column gets a staggered offset for the “stepped” feel */}
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16">
            {/* LEFT column */}
            <div className="space-y-12">
              {left.map((capsule: Capsule, idx: number) => (
                <CardWithDot key={`L-${idx}`} side="left">
                  <CapsuleBox capsule={capsule} />
                </CardWithDot>
              ))}
            </div>

            {/* RIGHT column */}
            <div className="space-y-12 md:mt-16">
              {right.map((capsule: Capsule, idx: number) => (
                <CardWithDot key={`R-${idx}`} side="right">
                  <CapsuleBox capsule={capsule} />
                </CardWithDot>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Wraps each CapsuleBox in a styled card shell, adds outline & the timeline dot
 * that connects to the center divider.
 */
function CardWithDot({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) {
  // Where to place the dot relative to the card
  const dotPosition =
    side === "left"
      ? "left-[calc(100%+2rem)] md:left-[calc(100%+2rem)]"
      : "right-[calc(100%+2rem)] md:right-[calc(100%+2rem)]";

  // Edge connector line from card to center divider
  const edgeLine =
    side === "left"
      ? "after:left-full after:translate-x-0"
      : "after:right-full after:translate-x-0";

  return (
    <div
      className={[
        "relative",
        // Card shell (matches template vibe)
        "rounded-lg outline outline-offset-[-1px]",
        "bg-white",
        "outline-[color:var(--Brand-Stroke-Weak,theme(colors.gray.200))]/20",
        // Horizontal connector
        "after:absolute after:top-10 after:h-px after:w-8",
        "after:bg-[color:var(--Brand-Stroke-Weak,theme(colors.gray.200))]/20",
        edgeLine,
      ].join(" ")}
    >
      {/* Timeline dot aligned with connector */}
      <span
        aria-hidden
        className={[
          "absolute top-8 h-4 w-4 -translate-y-1/2 rounded-full border",
          "border-[color:var(--Brand-Stroke-Strong,theme(colors.gray.400))]/80",
          "bg-[color:var(--Brand-Default,theme(colors.cyan.600))]",
          dotPosition,
          "hidden md:inline-block", // hide on mobile
        ].join(" ")}
      />

      {/* Inner content (your CapsuleBox) */}
      <div className="inline-flex w-80 flex-col items-end justify-end gap-4 overflow-hidden rounded-lg bg-white md:w-80">
        {/* You already style inner parts inside CapsuleBox; this outer shell just
            gives the outline + spacing consistent with the template */}
        {children}
      </div>
    </div>
  );
}