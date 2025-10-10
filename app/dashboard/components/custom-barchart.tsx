"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { cn } from "@/lib/utils";

type Bucket = {
  label: string;
  count: number;
};

type CustomPayload = {
  payload: Bucket;
  value: number;
  name: string;
  color: string;
  dataKey: string;
};

type CustomTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: CustomPayload[];
};

export type ScoreDistributionProps = {
  readonly title?: string;
  readonly data: Bucket[];
  readonly yLabel?: string;    // Y axis label
  readonly xLabel?: string;    // X axis label
  readonly yDomain?: [number, number];
  readonly averageLine?: number;   // Draw a dashed horizontal average line at this value (e.g., 48)
  readonly highlightRange?: { fromLabel: string; toLabel: string };    // Optional shaded area: pass the inclusive range on the x-axis (category labels)
  readonly height?: number;    // Height of the chart container (px)
  readonly actionSlot?: React.ReactNode;   // Right-corner action (e.g., a <Select /> for “Talent”)
  readonly className?: string;
};

const TooltipContent = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return (
    <div className="flex items-center">
      {/* Left arrow */}
      <div
        className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[12px] border-t-transparent border-b-transparent border-r-base-white shadow-lg"
      />

      {/* Info container */}
      <div className="rounded-xl py-2 px-4 bg-base-white shadow-lg">
        <div className="space-y-2 text-sm text-gray-text-weak">
          <p>{label}%</p>
          <div className="border-l-4 border-brand-primary-text py-0.5 px-1">
            <p>{val}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export function ScoreDistribution({
  title = "Assessment Scores Distribution",
  data,
  yLabel = "No. of Learners",
  xLabel = "Scores(%)",
  yDomain = [0, 100],
  averageLine,
  highlightRange,
  height = 360,
  actionSlot,
  className,
}: ScoreDistributionProps) {
  return (
    <section className={cn("w-full rounded-2xl bg-base-white p-6 space-y-4", className)}>
      <article className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1f2937]">{title}</h3>
        {actionSlot}
      </article>

      <article style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            barCategoryGap={30}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ fill: "#1A10151A" }}
            />
            <YAxis
              domain={yDomain}
              tickLine={false}
              axisLine={false}
              width={60}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#1A1015B2", fontSize: 12, textAnchor: "middle" },
              }}
            />
            <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(0,0,0,0.06)" }} />

            {/* Optional shaded area behind one or more categories. Works with categorical x-axis by specifying the label bounds */}
            {highlightRange && (
              <ReferenceArea
                x1={highlightRange.fromLabel}
                x2={highlightRange.toLabel}
                y1={0}
                y2="auto"
                fill="rgba(0,0,0,0.06)"
                ifOverflow="extendDomain"
              />
            )}

            {/* Optional dashed average line */}
            {typeof averageLine === "number" && (
              <ReferenceLine
                y={averageLine}
                stroke="#00708ACC"
                strokeDasharray="6 6"
                ifOverflow="extendDomain"
                label={{
                  value: "",
                }}
              />
            )}

            <Bar dataKey="count" fill="#00708ACC" />
          </BarChart>
        </ResponsiveContainer>
      </article>

      {/* Axis labels */}
      <div className="flex items-center justify-between text-xs text-gray-text-weak">
        <span className="invisible" />
        <span>{xLabel}</span>
        <span className="invisible" />
      </div>
    </section>
  );
}