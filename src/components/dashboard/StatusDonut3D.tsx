"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StatusSegment {
  label: string;
  count: number;
  pct: string;
  color: string;
  stroke: string;
  offset: number;
  dash: number;
}

export default function StatusDonut3D() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Total: 1,284
  // Approved: 184 (14.3%) - Teal/Green #34D399 / #10B981
  // Pending: 326 (25.4%) - Amber/Orange #FBBF24 / #F59E0B
  // Under Review: 732 (57.0%) - Indigo/Purple #6366F1 / #4F46E5
  // Rejected: 42 (3.3%) - Coral/Rose #F87171 / #EF4444

  const segments = [
    { label: "Approved", count: 184, pct: "14.3%", color: "#35B779", bg: "#EAF8F1", text: "#279B63" },
    { label: "Pending", count: 326, pct: "25.4%", color: "#E6A23C", bg: "#FDF6EA", text: "#C27E16" },
    { label: "Under Review", count: 732, pct: "57.0%", color: "#5B4BFF", bg: "#EEEBFF", text: "#5B4BFF" },
    { label: "Rejected", count: 42, pct: "3.3%", color: "#E45D5D", bg: "#FDEDED", text: "#D94242" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
      {/* 3D Isometric Shaded Torus Donut */}
      <div className="relative size-48 lg:size-52 shrink-0 flex items-center justify-center group cursor-pointer">
        {/* Soft 3D drop shadow underneath */}
        <div className="absolute bottom-2 inset-x-8 h-6 bg-[#171719]/10 rounded-full blur-xl transform scale-y-50 group-hover:scale-105 transition-transform" />

        <svg
          viewBox="0 0 200 200"
          className="size-full transform -rotate-45 drop-shadow-[0_12px_24px_rgba(91,75,255,0.18)] transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            {/* 3D Volumetric Gradients */}
            <linearGradient id="gradApproved" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="70%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            <linearGradient id="gradPending" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id="gradReview" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>

            <linearGradient id="gradRejected" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* Specular Highlight Filter */}
            <filter id="softSpecular" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" result="specOut">
                <fePointLight x="-50" y="-100" z="200" />
              </feSpecularLighting>
              <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
              <feComposite in="SourceGraphic" in2="specOut" operator="over" />
            </filter>
          </defs>

          {/* Under Review (57.0%) */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="url(#gradReview)"
            strokeWidth="28"
            strokeDasharray="243 427"
            strokeDashoffset="0"
            strokeLinecap="round"
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(2)}
            onMouseLeave={() => setHoveredIdx(null)}
          />

          {/* Pending (25.4%) */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="url(#gradPending)"
            strokeWidth="28"
            strokeDasharray="108 427"
            strokeDashoffset="-250"
            strokeLinecap="round"
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(1)}
            onMouseLeave={() => setHoveredIdx(null)}
          />

          {/* Approved (14.3%) */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="url(#gradApproved)"
            strokeWidth="28"
            strokeDasharray="61 427"
            strokeDashoffset="-362"
            strokeLinecap="round"
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
          />

          {/* Rejected (3.3%) */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="url(#gradRejected)"
            strokeWidth="28"
            strokeDasharray="14 427"
            strokeDashoffset="-426"
            strokeLinecap="round"
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(3)}
            onMouseLeave={() => setHoveredIdx(null)}
          />
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] font-semibold tracking-wider text-[#6F7077] uppercase">
            Total
          </span>
          <span className="text-xl font-bold text-[#171719] tracking-tight">
            1,284
          </span>
          <span className="text-[10px] font-medium text-[#8E909A]">
            Applications
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="flex-1 w-full space-y-3">
        {segments.map((seg, idx) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between p-2 rounded-xl transition ${
              hoveredIdx === idx ? "bg-[#FBFAF7] translate-x-1" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs font-medium text-[#171719]">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#171719]">{seg.count}</span>
              <span className="text-[11px] text-[#6F7077] w-10 text-right">{seg.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
