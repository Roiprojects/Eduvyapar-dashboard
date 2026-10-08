"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, TrendingUp } from "lucide-react";

export default function AdmissionsOverviewChart() {
  const [activeMonth, setActiveMonth] = useState<number | null>(3); // Default July

  const months = [
    { label: "Apr", applications: 320, approved: 140, rejected: 30, enrolled: 120 },
    { label: "May", applications: 440, approved: 210, rejected: 45, enrolled: 190 },
    { label: "Jun", applications: 560, approved: 290, rejected: 50, enrolled: 260 },
    { label: "Jul", applications: 736, approved: 420, rejected: 70, enrolled: 390 },
    { label: "Aug", applications: 610, approved: 350, rejected: 55, enrolled: 320 },
    { label: "Sep", applications: 680, approved: 380, rejected: 60, enrolled: 360 },
  ];

  // SVG dimensions
  const maxVal = 800;
  const chartHeight = 160;
  const chartWidth = 500;

  // Enrolled spline points
  const points = months.map((m, i) => {
    const x = 40 + i * (420 / 5);
    const y = chartHeight - (m.enrolled / maxVal) * chartHeight + 20;
    return { x, y, ...m };
  });

  // Calculate smooth SVG curve path
  const curvePath = points.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header & Filter */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
            Admissions Overview
          </h3>
          <p className="text-xs text-[#6F7077] mt-0.5">
            Applications, approvals and enrolments over time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.08] text-xs font-medium text-[#171719] hover:bg-[#EEEBFF] hover:border-[#5B4BFF]/30 transition"
          >
            <span>Last 6 months</span>
            <ChevronDown size={13} className="text-[#6F7077]" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.08] text-[#6F7077] hover:text-[#5B4BFF] transition"
            title="Trend"
          >
            <TrendingUp size={14} />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative mt-6 pt-8 pb-2">
        {/* July Tooltip Callout */}
        {activeMonth !== null && (
          <div
            className="absolute z-20 transition-all pointer-events-none"
            style={{
              left: `${(activeMonth / 5) * 72 + 12}%`,
              top: "-8px",
              transform: "translateX(-50%)",
            }}
          >
            <div className="rounded-xl bg-[#FFFFFF] border border-[#141414]/[0.08] p-2.5 shadow-xl text-center">
              <p className="text-xs font-bold text-[#171719]">
                {months[activeMonth].applications} Applications
              </p>
              <p className="text-[10px] font-semibold text-[#279B63] mt-0.5">
                ↑ +18% from last month
              </p>
            </div>
            {/* Tooltip triangle */}
            <div className="w-2.5 h-2.5 bg-white border-b border-r border-[#141414]/[0.08] mx-auto transform rotate-45 -mt-1" />
          </div>
        )}

        {/* Y Axis Guide lines */}
        <div className="absolute inset-x-0 top-10 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-[#141414]/[0.05] w-full" />
          <div className="border-b border-[#141414]/[0.05] w-full" />
          <div className="border-b border-[#141414]/[0.05] w-full" />
        </div>

        {/* Chart SVG */}
        <div className="relative h-44 w-full">
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-6 z-0">
            {months.map((m, idx) => {
              const hApp = (m.applications / maxVal) * 100;
              const hAppr = (m.approved / maxVal) * 100;
              const hRej = (m.rejected / maxVal) * 100;
              const isSelected = activeMonth === idx;

              return (
                <div
                  key={m.label}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setActiveMonth(idx)}
                >
                  <div className="flex items-end gap-1.5 h-36">
                    {/* Applications Bar */}
                    <div
                      className="w-3 rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${hApp}%`,
                        background: isSelected
                          ? "linear-gradient(180deg, #6366F1 0%, #818CF8 100%)"
                          : "linear-gradient(180deg, #93C5FD 0%, #BFDBFE 100%)",
                      }}
                    />
                    {/* Approved Bar */}
                    <div
                      className="w-3 rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${hAppr}%`,
                        background: isSelected
                          ? "linear-gradient(180deg, #22C55E 0%, #4ADE80 100%)"
                          : "linear-gradient(180deg, #86EFAC 0%, #BBF7D0 100%)",
                      }}
                    />
                    {/* Rejected Bar */}
                    <div
                      className="w-2.5 rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${hRej}%`,
                        background: "linear-gradient(180deg, #F87171 0%, #FECACA 100%)",
                      }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-medium transition ${
                      isSelected ? "text-[#171719] font-bold" : "text-[#8E909A]"
                    }`}
                  >
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Spline Overlay Line */}
          <svg
            viewBox="0 0 500 180"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full pointer-events-none z-10"
          >
            <path
              d={curvePath}
              fill="none"
              stroke="#5B4BFF"
              strokeWidth="2.5"
              className="drop-shadow-[0_2px_8px_rgba(91,75,255,0.4)]"
            />
            {points.map((pt, i) => (
              <circle
                key={pt.label}
                cx={pt.x}
                cy={pt.y}
                r={activeMonth === i ? "5" : "3.5"}
                fill="#FFFFFF"
                stroke="#5B4BFF"
                strokeWidth="2.5"
                className="transition-all"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-[#141414]/[0.05] text-[11px] text-[#6F7077]">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#5B4BFF]" />
          <span>Applications</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#35B779]" />
          <span>Approved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#E45D5D]" />
          <span>Rejected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#5B4BFF] rounded-full" />
          <span>Enrolled</span>
        </div>
      </div>
    </div>
  );
}
