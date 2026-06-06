"use client";

import Image from "next/image";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ResultCardProps } from "@/lib/types";

export function ResultCard({ growthInfo, puppyImage }: ResultCardProps) {
  const chartData = growthInfo.growthCurve.map((weight, month) => ({
    month,
    weight: Math.round(weight * 10) / 10,
  }));

  return (
    <div className="w-full rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 p-6 md:p-8 text-white shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm font-semibold tracking-wide opacity-90 mb-2">
            PREDICTED ADULT WEIGHT
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-bold">
              {growthInfo.predictedWeight}
            </span>
            <span className="text-2xl font-semibold opacity-90">lbs</span>
          </div>
          <p className="text-sm mt-3 opacity-90">
            Typical range:{" "}
            <span className="font-semibold">
              {growthInfo.typicalRange[0]}–{growthInfo.typicalRange[1]} lbs
            </span>{" "}
            • {growthInfo.percentageGrown}% grown
          </p>
        </div>

        {puppyImage && (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-white bg-opacity-20 shrink-0 ml-4 relative">
            <Image
              src={puppyImage}
              alt="Puppy"
              fill
              sizes="(min-width: 768px) 96px, 80px"
              loading="lazy"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              {/* Main area fill */}
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>

              {/* Stroke glow */}
              <filter id="weightGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="6 6"
              stroke="rgba(255,255,255,0.12)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.65)"
              style={{ fontSize: "12px" }}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.8)" }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.65)"
              style={{ fontSize: "12px" }}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.8)" }}
              width={48}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.82)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "12px",
                color: "white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
              }}
              labelStyle={{ color: "rgba(255,255,255,0.9)" }}
              formatter={(value: any) => [`${value} lbs`, "Weight"]}
              labelFormatter={(label) => `Month ${label}`}
            />

            <Area
              type="monotone"
              dataKey="weight"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={2.5}
              fill="url(#colorWeight)"
              isAnimationActive={true}
              filter="url(#weightGlow)"
              dot={{ r: 2.2, fill: "white", stroke: "rgba(255,255,255,0.6)", strokeWidth: 1 }}
              activeDot={{ r: 4, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-sm">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-white border cursor-pointer"
          />
          <span className="opacity-90">
            {growthInfo.warningMessage
              ? growthInfo.warningMessage
              : "Growth trajectory looks normal — monitor with your vet."}
          </span>
        </label>
      </div>
    </div>
  );
}
