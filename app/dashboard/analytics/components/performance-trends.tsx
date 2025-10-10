"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type Datum = { label: string; career: number; skills: number };

type Props = {
  readonly data: Datum[];
  readonly title?: string;
  readonly height?: number;
  readonly yDomain?: [number, number];
  readonly curve?: "monotone" | "linear";
  readonly showGrid?: boolean;
  readonly className?: string;
  // Use your brand tokens here if you like
  readonly colors?: {
    career: string; // stroke color
    careerFill?: string; // gradient stop (top)
    skills: string;
    skillsFill?: string;
  };
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

  return (
    <div className="rounded-xl bg-white/95 px-3 py-2 shadow-lg ring-1 ring-black/5">
      <div className="mb-1 font-medium text-gray-800">{label}</div>
      <div className="space-y-1 text-sm">
        {entries.map((e) => (
          <div key={e.name} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: e.color }}
            />
            <span className="text-gray-500">{e.name}:</span>
            <span className="font-medium text-gray-900">{e.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function PerformanceTrends({
  data,
  title = "Performance Trends",
  height = 340,
  yDomain = [0, 100],
  curve = "monotone",
  showGrid = true,
  className,
  colors = defaultColors
}: Props) {
  const c = { ...defaultColors, ...colors };
  return (
    <div className={cn("rounded-xl p-6 space-y-6 bg-base-white", className)}>
      {title && (
        <h3 className="font-semibold text-lg text-gray-text-strong">{title}</h3>
      )}

      <div className="overflow-hidden rounded-2xl bg-white p-2">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            {/* Rounded clipping for the chart visuals */}
            <defs>
              <linearGradient id="careerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.careerFill} />
                <stop offset="100%" stopColor={c.careerFill} />
              </linearGradient>

              <linearGradient id="skillsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.skillsFill} />
                <stop offset="100%" stopColor={c.skillsFill} />
              </linearGradient>

              <clipPath id="roundedClip">
                <rect x="0" y="0" width="100%" height="100%" rx="16" ry="16" />
              </clipPath>
            </defs>

            <g clipPath="url(#roundedClip)">
              {showGrid && (
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#E5E7EB" />
              )}

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                domain={yDomain}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <Tooltip
                content={
                  <DefaultTooltip />
                }
              />
              <Legend
                verticalAlign="bottom"
                height={28}
                wrapperStyle={{ paddingTop: 8 }}
              />

              {/* Stacked Areas */}
              <Area
                type={curve}
                dataKey="career"
                name="Career Readiness"
                stackId="1"
                stroke={c.career}
                fill="url(#careerGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Area
                type={curve}
                dataKey="skills"
                name="Skills Developed"
                stackId="1"
                stroke={c.skills}
                fill="url(#skillsGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </g>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}