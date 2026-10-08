"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function InvestingInPeopleCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="relative rounded-3xl overflow-hidden min-h-[300px] h-full p-6 flex flex-col justify-between border border-[#141414]/[0.08] shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] group"
    >
      {/* Background Architectural Sculpture Photo */}
      <Image
        src="/images/campus-sculpture.jpg"
        alt="Investing In People"
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

      {/* Top Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
          <Sparkles size={11} />
          <span>Sovereign Endowment</span>
        </span>

        <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#5B4BFF] transition-colors">
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Bottom Editorial Statement */}
      <div className="relative z-10 text-white space-y-1">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#EEEBFF] uppercase block">
          Institutional Growth
        </span>
        <h4 className="font-serif text-xl sm:text-2xl font-bold leading-snug drop-shadow-sm">
          Investing In People.<br />
          Powering Progress.
        </h4>
        <p className="text-xs text-white/80 font-normal leading-relaxed pt-1">
          Sovereign capital deployed into faculty empowerment, student scholarships, and research infrastructure.
        </p>
      </div>
    </motion.div>
  );
}
