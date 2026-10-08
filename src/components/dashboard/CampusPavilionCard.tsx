"use client";

import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";

export default function CampusPavilionCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-full min-h-[220px] flex flex-col justify-end p-4 border border-[#141414]/[0.06] shadow-sm group">
      {/* Background Pavilion Image */}
      <Image
        src="/images/campus-pavilion.jpg"
        alt="Campus Architecture & Student Life"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Center Glass Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          type="button"
          className="size-12 rounded-full bg-white/80 backdrop-blur-md text-[#171719] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 pointer-events-auto"
          aria-label="Play Campus Reel"
        >
          <Play size={18} className="fill-[#171719] translate-x-0.5" />
        </button>
      </div>

      {/* Floating Bottom Metric Pill */}
      <div className="relative z-10 flex items-center justify-between p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-md">
        <div>
          <p className="text-sm font-bold text-[#171719] leading-tight">1,284</p>
          <p className="text-[11px] text-[#6F7077] leading-tight">Applications this month</p>
        </div>
        <button
          type="button"
          className="size-7 rounded-full bg-[#171719] text-white flex items-center justify-center hover:bg-[#5B4BFF] transition"
          aria-label="View Applications"
        >
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
