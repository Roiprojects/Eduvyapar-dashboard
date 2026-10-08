"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Building2, ShieldCheck, HeartHandshake } from "lucide-react";

export default function ClosingStoryChapter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="chapter-future" className="relative scroll-mt-24 pt-4 pb-8 space-y-4">
      {/* Editorial Chapter Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF]">
          <Sparkles size={12} />
          <span>07 · CLOSING &amp; SOVEREIGN FUTURE</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6F7077] hover:text-[#5B4BFF] transition"
        >
          <ArrowUp size={13} />
          <span>Return to Top</span>
        </button>
      </div>

      {/* Main Closing Architectural Canvas */}
      <div className="relative rounded-3xl overflow-hidden border border-[#141414]/[0.08] bg-[#FFFFFF] shadow-[0_16px_48px_-12px_rgba(20,20,20,0.06)] min-h-[380px] lg:min-h-[440px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Background Panoramic Architectural Pavilion */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/campus-pavilion.jpg"
            alt="Campus Architectural Pavilion"
            fill
            className="object-cover object-center brightness-[0.98] contrast-[1.02]"
          />
          {/* Subtle soft gradient scrim to retain text contrast while preserving architecture */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/40 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/70 lg:to-transparent" />
        </div>

        {/* Top: AIVRM Identity Mark */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-[#4438CA] via-[#5B4BFF] to-[#818CF8] flex items-center justify-center shadow-md shadow-[#5B4BFF]/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.3" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-[15px] tracking-wider text-[#171719] font-sans block leading-none">
              AIVRM
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#6F7077] uppercase block mt-0.5">
              Light Story Mode · Institutional Operating System
            </span>
          </div>
        </div>

        {/* Center / Bottom: Editorial Headline */}
        <div className="relative z-10 max-w-2xl space-y-4 my-8">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171719] tracking-tight leading-[1.02]">
            Shaping Brighter Futures.
          </h2>
          <p className="text-base sm:text-lg text-[#55565D] font-normal leading-relaxed max-w-xl">
            Education Management for a More Connected Tomorrow. Transforming institutional administration into a cohesive, human-centered spatial reality.
          </p>

          {/* Interactive Continue Your Story Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#171719] text-white text-xs sm:text-sm font-bold shadow-xl hover:bg-[#5B4BFF] transition-colors"
            >
              <span>Continue Your Story</span>
              <span className="size-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </motion.button>

            <Link
              href="/dashboard/preadmission"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 backdrop-blur-md border border-[#141414]/[0.08] text-xs sm:text-sm font-bold text-[#171719] hover:bg-white transition shadow-xs"
            >
              <Building2 size={15} className="text-[#5B4BFF]" />
              <span>Explore Admissions Center</span>
            </Link>
          </div>
        </div>

        {/* Bottom Specs Bar */}
        <div className="relative z-10 pt-6 border-t border-[#141414]/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6F7077]">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#171719]">
              <ShieldCheck size={14} className="text-[#35B779]" />
              ISO 27001 Sovereign Certified
            </span>
            <span className="hidden sm:inline text-[#8E909A]">·</span>
            <span>Version 2.4.0 (Story Mode)</span>
          </div>

          <p className="text-[11px] text-[#8E909A]">
            © 2026 AIVRM Inc. All institutional rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
