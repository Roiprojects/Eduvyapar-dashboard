"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function EditorialHero() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 pb-2">
      {/* Left Typography Block */}
      <div className="flex flex-col justify-center max-w-lg space-y-1">
        <h2 className="text-xl sm:text-2xl font-normal text-[#171719] tracking-tight">
          Good morning,
        </h2>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#171719] tracking-tight leading-none">
          Admin.
        </h1>
        <p className="text-xs sm:text-sm text-[#6F7077] pt-2">
          Here&apos;s what&apos;s happening across your institution today.
        </p>
      </div>

      {/* Right Architectural Installation Banner */}
      <div className="relative flex-1 min-h-[170px] lg:min-h-[190px] rounded-3xl overflow-hidden border border-[#141414]/[0.06] shadow-sm group">
        {/* Architectural Image */}
        <Image
          src="/images/campus-sculpture.jpg"
          alt="Campus Architectural Ribbon Sculpture"
          fill
          priority
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:from-white/70" />

        {/* Content Overlays */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5 lg:p-6">
          {/* Top Editorial Statement */}
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-xs">
              <p className="font-serif text-sm sm:text-base font-bold text-[#171719] leading-snug">
                Education Today for a<br />
                Bigger Tomorrow.
              </p>
            </div>
            <button
              type="button"
              className="size-9 rounded-full bg-[#171719] text-white flex items-center justify-center shadow-md hover:bg-[#5B4BFF] hover:scale-105 transition"
              aria-label="Institution Vision"
            >
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Bottom Right Quote */}
          <div className="flex justify-end">
            <p className="font-serif italic text-xs sm:text-sm text-[#171719]/80 text-right leading-tight">
              &ldquo;People<br />
              Programs<br />
              Progress &rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
