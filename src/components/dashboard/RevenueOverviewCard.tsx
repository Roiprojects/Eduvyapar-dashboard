"use client";

import { useState } from "react";
import { ChevronDown, TrendingUp } from "lucide-react";

export default function RevenueOverviewCard() {
  const [activeTab, setActiveTab] = useState<"collection" | "pending">("collection");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4); // Default Aug

  const points = [
    { label: "Apr", val: 5.2, display: "₹5.2L" },
    { label: "May", val: 6.8, display: "₹6.8L" },
    { label: "Jun", val: 6.1, display: "₹6.1L" },
    { label: "Jul", val: 7.4, display: "₹7.4L" },
    { label: "Aug", val: 8.4, display: "₹8.4L" },
    { label: "Sep", val: 8.2, display: "₹8.2L" },
  ];

  // SVG coordinates
  const svgPoints = points.map((p, i) => {
    const x = 30 + i * (280 / 5);
    const y = 90 - (p.val / 10) * 70;
    return { ...p, x, y };
  });

  const curvePath = svgPoints.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${curvePath} L ${svgPoints[svgPoints.length - 1].x} 100 L ${svgPoints[0].x} 100 Z`;

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
            Revenue Overview
          </h3>
          <p className="text-xs text-[#6F7077] mt-0.5">
            Fee collection and payments.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.08] text-[11px] font-medium text-[#171719]"
        >
          <span>Last 6 months</span>
          <ChevronDown size={12} className="text-[#6F7077]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-3">
        <button
          type="button"
          onClick={() => setActiveTab("collection")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            activeTab === "collection"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "bg-[#FBFAF7] text-[#6F7077] hover:text-[#171719]"
          }`}
        >
          ● Fee Collection
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            activeTab === "pending"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "bg-[#FBFAF7] text-[#6F7077] hover:text-[#171719]"
          }`}
        >
          Pending Payments
        </button>
      </div>

      {/* Metric Callout */}
      <div className="flex items-baseline gap-3 mt-4">
        <span className="text-2xl font-bold text-[#171719] tracking-tight">
          ₹42.1L
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#279B63] bg-[#EAF8F1] px-2 py-0.5 rounded-full">
          ↑ +12.6%
        </span>
      </div>

      {/* Spline Area Chart */}
      <div className="relative mt-2 h-28 w-full">
        {/* Highlight Tooltip for Peak */}
        {hoveredPoint !== null && (
          <div
            className="absolute z-20 transition-all pointer-events-none"
            style={{
              left: `${(hoveredPoint / 5) * 80 + 10}%`,
              top: "-8px",
              transform: "translateX(-50%)",
            }}
          >
            <div className="rounded-lg bg-[#FFFFFF] border border-[#141414]/[0.08] px-2 py-1 shadow-md text-center">
              <p className="text-[11px] font-bold text-[#171719]">
                {points[hoveredPoint].display}
              </p>
              <p className="text-[9px] text-[#8E909A]">
                {points[hoveredPoint].label} 2026
              </p>
            </div>
          </div>
        )}

        <svg viewBox="0 0 340 100" preserveAspectRatio="none" className="size-full">
          <defs>
            <linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B4BFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#5B4BFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#revenueGrad)" />
          <path
            d={curvePath}
            fill="none"
            stroke="#5B4BFF"
            strokeWidth="2.5"
            className="drop-shadow-[0_2px_6px_rgba(91,75,255,0.3)]"
          />
          {svgPoints.map((p, i) => (
            <circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r={hoveredPoint === i ? 4.5 : 3}
              fill="#FFFFFF"
              stroke="#5B4BFF"
              strokeWidth="2"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredPoint(i)}
            />
          ))}
        </svg>

        {/* X Axis */}
        <div className="flex items-center justify-between px-2 pt-1 text-[10px] text-[#8E909A]">
          {points.map((p) => (
            <span key={p.label}>{p.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
