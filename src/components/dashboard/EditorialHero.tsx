"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ArchitecturalRibbon3D = dynamic(
  () => import("@/components/three/ArchitecturalRibbon3D"),
  { ssr: false }
);

export default function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth spring mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers at different depths
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const bgScale = useTransform(smoothY, [-0.5, 0.5], [1.02, 1.04]);

  const archTranslateX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const archTranslateY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const lightOpacity = useTransform(smoothX, [-0.5, 0.5], [0.25, 0.45]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const scrollToExplore = () => {
    const el = document.getElementById("chapter-people");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="chapter-vision" className="relative scroll-mt-24 space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
        {/* Left Editorial Statement Block */}
        <div className="flex flex-col justify-center max-w-lg lg:max-w-md xl:max-w-lg space-y-2 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#6F7077] uppercase">
              CHAPTER 01 · VISION
            </span>
            <span className="size-1 rounded-full bg-[#5B4BFF]" />
            <span className="text-[11px] font-semibold text-[#5B4BFF]">
              Session 2026–27
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-light text-[#6F7077] tracking-tight">
              Good morning,
            </h2>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#171719] tracking-tight leading-[0.95]">
              Admin.
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#6F7077] pt-1 leading-relaxed max-w-md">
            Education today. A bigger tomorrow. An architectural digital operating environment built for visionary institutional leadership.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] text-xs font-semibold text-[#171719] shadow-sm">
              <span className="size-1.5 rounded-full bg-[#35B779] animate-pulse" />
              Vanguard Active
            </span>
            <span className="text-xs text-[#8E909A]">
              Autumn Term · Week 06
            </span>
          </div>
        </div>

        {/* Right Layered Spatial Architectural Environment */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative flex-1 min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] rounded-3xl overflow-hidden border border-[#141414]/[0.08] shadow-[0_12px_36px_-6px_rgba(20,20,20,0.06)] group cursor-default"
        >
          {/* Layer 0: Warm Atmospheric Sky Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F4EFE6] via-[#FAF8F5] to-[#FFFFFF]" />

          {/* Layer 1: Architectural Image with Parallax Movement */}
          <motion.div
            style={{
              x: bgTranslateX,
              y: bgTranslateY,
              scale: bgScale,
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/campus-sculpture.jpg"
              alt="Campus Architectural Ribbon Plaza"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out"
            />
            {/* Subtle soft gradient fade on the left to merge seamlessly with editorial layout */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/45 to-transparent lg:from-white/70" />
          </motion.div>

          {/* Layer 2: Interactive 3D Flowing Ribbon Motif (Three.js WebGL) */}
          <motion.div
            style={{ x: archTranslateX, y: archTranslateY }}
            className="absolute inset-0 size-full pointer-events-none z-10 opacity-70 group-hover:opacity-90 transition-opacity"
          >
            <ArchitecturalRibbon3D />
          </motion.div>

          {/* Layer 3: Dynamic Caustic Sunlight Reflection */}
          <motion.div
            style={{ opacity: lightOpacity }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-[#FFF8E7]/30 to-[#EEEBFF]/40 mix-blend-screen"
          />

          {/* Layer 4: Foreground Editorial Overlay Cards & Statement */}
          <div className="relative z-20 flex h-full flex-col justify-between p-6 sm:p-7 pointer-events-none">
            {/* Top Statement & Magnetic Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-xs pointer-events-auto">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#5B4BFF] uppercase block mb-1">
                  ✦ Sovereign Vision
                </span>
                <p className="font-serif text-base sm:text-lg font-bold text-[#171719] leading-snug drop-shadow-sm">
                  Education today.<br />
                  A bigger tomorrow.
                </p>
              </div>

              <motion.button
                type="button"
                onClick={scrollToExplore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#171719] text-xs font-semibold shadow-md hover:bg-white transition pointer-events-auto"
                aria-label="Scroll to explore"
              >
                <span>Scroll to explore</span>
                <span className="size-5 rounded-full bg-[#171719] text-white flex items-center justify-center text-[10px]">
                  ↓
                </span>
              </motion.button>
            </div>

            {/* Bottom Right Quote */}
            <div className="flex justify-end pointer-events-auto">
              <div className="rounded-2xl bg-white/80 backdrop-blur-md px-4 py-2.5 border border-white/70 shadow-sm text-right">
                <p className="font-serif italic text-xs sm:text-sm text-[#171719] leading-tight">
                  &ldquo;People.<br />
                  Programs.<br />
                  Progress.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Stat Strip across the Hero Base */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-[#141414]/[0.06] p-3 shadow-[0_4px_20px_-4px_rgba(20,20,20,0.04)] grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-3 px-3 py-1.5 border-r border-[#141414]/[0.05] last:border-none">
          <div className="size-2 rounded-full bg-[#5B4BFF]" />
          <div>
            <span className="text-[10px] text-[#8E909A] uppercase tracking-wider block font-bold">Total Students</span>
            <span className="font-bold text-sm text-[#171719]">12,842</span>
            <span className="text-[10px] text-[#279B63] font-semibold ml-1.5">↑ 8.4%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5 border-r border-[#141414]/[0.05] last:border-none">
          <div className="size-2 rounded-full bg-[#5B4BFF]" />
          <div>
            <span className="text-[10px] text-[#8E909A] uppercase tracking-wider block font-bold">Applications</span>
            <span className="font-bold text-sm text-[#171719]">1,284</span>
            <span className="text-[10px] text-[#279B63] font-semibold ml-1.5">↑ 12.8%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5 border-r border-[#141414]/[0.05] last:border-none">
          <div className="size-2 rounded-full bg-[#E6A23C]" />
          <div>
            <span className="text-[10px] text-[#8E909A] uppercase tracking-wider block font-bold">Pending Review</span>
            <span className="font-bold text-sm text-[#171719]">326</span>
            <span className="text-[10px] text-[#E45D5D] font-semibold ml-1.5">↓ 4.2%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5">
          <div className="size-2 rounded-full bg-[#35B779]" />
          <div>
            <span className="text-[10px] text-[#8E909A] uppercase tracking-wider block font-bold">Revenue</span>
            <span className="font-bold text-sm text-[#171719]">₹48.6L</span>
            <span className="text-[10px] text-[#279B63] font-semibold ml-1.5">↑ 14.2%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
