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

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 pb-2">
      {/* Left Editorial Statement Block */}
      <div className="flex flex-col justify-center max-w-lg lg:max-w-md xl:max-w-lg space-y-2 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#6F7077] uppercase">
            Institutional Hub
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
          Here&apos;s what&apos;s happening across your institution today. All systems verified and operating at optimal velocity.
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
        className="relative flex-1 min-h-[220px] sm:min-h-[240px] lg:min-h-[250px] rounded-3xl overflow-hidden border border-[#141414]/[0.08] shadow-[0_12px_36px_-6px_rgba(20,20,20,0.06)] group cursor-default"
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
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/45 to-transparent lg:from-white/80" />
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
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.95 }}
              className="size-10 rounded-full bg-[#171719] text-white flex items-center justify-center shadow-lg hover:bg-[#5B4BFF] transition pointer-events-auto"
              aria-label="Campus Vision"
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Bottom Right Quote */}
          <div className="flex justify-end pointer-events-auto">
            <div className="rounded-xl bg-white/70 backdrop-blur-md px-3.5 py-2 border border-white/60 shadow-sm text-right">
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
  );
}
