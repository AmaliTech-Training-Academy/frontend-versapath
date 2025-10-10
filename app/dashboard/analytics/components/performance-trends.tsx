"use client";

import { monthMapping } from "@/lib/api/analytics";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LegendPayload
} from "recharts";

export type Datum = {
  readonly label: string;
  readonly career: number;
  readonly skills: number;
};

type CustomPayload = {
  payload: Datum;
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

type DotItem = Pick<LegendPayload, "value" | "color">;

type DotLegendProps = { payload?: ReadonlyArray<DotItem>; }

type PerformanceTrendProps = {
  readonly data: Datum[];
  readonly title?: string;
  readonly height?: number;
  readonly yDomain?: [number, number];
  readonly curve?: "monotone" | "linear";
  readonly showGrid?: boolean;
  readonly className?: string;
  readonly colors?: {
    career: string; // stroke color
    careerFill?: string; // gradient stop (top)
    skills: string;
    skillsFill?: string;
  };
};

const defaultColors = {
  career: "#00708ACC",
  careerFill: "#00708ACC",
  skills: "#FFC857CC",
  skillsFill: "#FFC857CC",
};

const DefaultTooltip = ({
  active,
  payload,
  label
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const entries = payload.map((p) => ({
    name: p.name,
    value: p.value,
    color: p.color,
  }));
  const toolTipLabel = monthMapping[label ?? "Jan"];

  return (
    <div className="flex items-center">
      {/* Left arrow */}
      <div
        className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[12px] border-t-transparent border-b-transparent border-r-base-white shadow-lg"
      />

      {/* Info container */}
      <div className="w-[105px] rounded-xl py-2 px-4 bg-base-white shadow-lg">
        <div className="space-y-2 text-sm text-gray-text-weak">
          <p>{toolTipLabel}</p>
          {
            entries.map((e) => (
              <div key={e.name} className={`border-l-4 py-0.5 px-1`} style={{ borderLeftColor: e.color }}>
                <p>{e.value}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

// Legend
const DotLegend = (props: DotLegendProps) => {
  const items = props.payload ?? [];

  return (
    <div className="w-full mt-6 flex items-center justify-center gap-8">
      {items.map((item) => (
        <div key={item.value} className="w-fit flex items-center text-gray-text-weak">
          <Dot size={30} style={{ color: item.color }} />
          <span className="text-base text-gray-text-weak whitespace-nowrap">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export function PerformanceTrends({
  data,
  title = "Performance Trends",
  height = 360,
  yDomain = [0, 100],
  curve = "monotone",
  showGrid = true,
  className,
  colors = defaultColors
}: PerformanceTrendProps) {
  const c = { ...defaultColors, ...colors };
  return (
    <section className={cn("rounded-xl p-6 space-y-6 bg-base-white", className)}>
      {title && (
        <h3 className="font-semibold text-lg text-gray-text-strong">{title}</h3>
      )}

      <div className="overflow-hidden rounded-2xl bg-white p-2">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            {/* clip for rounded corners */}
            <defs>
              <clipPath id="roundedClip">
                <rect x="0" y="0" width="100%" height="100%" rx="24" ry="24" />
              </clipPath>
            </defs>

            <g clipPath="url(#roundedClip)">
              {showGrid && (
                <CartesianGrid strokeDasharray="4 8" stroke="#E6E8EB" />
              )}

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                stroke="#1A1015B2"
              />
              <YAxis
                domain={yDomain}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                stroke="#1A1015B2"
              />

              <Tooltip
                cursor={{ stroke: "#FFFFFF", strokeWidth: 2, opacity: 0.8 }}
                content={<DefaultTooltip />}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                content={<DotLegend />}
              />

              {/* Order matters for stacked look: base (career) first */}
              <Area
                type={curve}
                dataKey="career"
                name="Career Readiness"
                stackId="1"
                stroke={c.career}
                fill={c.careerFill}
                strokeWidth={0}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Area
                type={curve}
                dataKey="skills"
                name="Skills Developed"
                stackId="1"
                stroke={c.skills}
                fill={c.skillsFill}
                strokeWidth={0}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </g>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}