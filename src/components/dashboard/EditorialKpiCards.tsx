"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

export default function EditorialKpiCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="chapter-people" className="relative scroll-mt-24 space-y-4">
      {/* Chapter Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF] mb-2">
            <Sparkles size={12} />
            <span>02 · KEY METRICS &amp; PEOPLE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight leading-tight">
            Institutional Pulse
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7077] mt-0.5">
            Numbers come alive with motion. Continuous telemetry across enrollment, pipeline velocity, and campus vitality.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* ── Dominant Primary KPI Card: Total Students (lg:col-span-4) ── */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01, rotateZ: 0.15 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          onMouseEnter={() => setHoveredCard("students")}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative lg:col-span-4 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-5 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] overflow-hidden cursor-pointer group"
        >
          {/* Subtle internal gradient highlight */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#EEEBFF]/70 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center shadow-sm">
                  <Users size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#171719] block leading-tight">
                    Total Students
                  </span>
                  <span className="text-[10px] text-[#8E909A] font-medium">
                    Active Enrollment
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EAF8F1] text-[#279B63] shadow-xs">
                <ArrowUpRight size={12} strokeWidth={2.5} />
                +8.4%
                <span className="text-[#6F7077] font-normal text-[10px] hidden sm:inline">vs last month</span>
              </span>
            </div>

            <div className="mt-4">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-[#171719] tracking-tight">
                12,842
              </span>
            </div>
          </div>

          {/* Bottom sparkline & floating avatar stack */}
          <div className="mt-5 flex items-end justify-between pt-3 border-t border-[#141414]/[0.05]">
            {/* Animated Sparkline Bars */}
            <div className="flex items-end gap-1.5 h-8">
              {[45, 65, 55, 82, 72, 96, 88, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                  className="w-1.5 rounded-t-sm bg-[#5B4BFF] group-hover:bg-[#4338CA] transition-colors"
                  style={{
                    opacity: 0.35 + (i / 8) * 0.65,
                  }}
                />
              ))}
            </div>

            {/* Floating Avatar Stack */}
            <div className="flex items-center -space-x-2.5">
              <motion.div whileHover={{ y: -3, zIndex: 10 }} className="relative size-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src="/images/student-rahul.jpg" alt="Student" fill className="object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -3, zIndex: 10 }} className="relative size-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src="/images/student-priya.jpg" alt="Student" fill className="object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -3, zIndex: 10 }} className="relative size-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src="/images/student-arjun.jpg" alt="Student" fill className="object-cover" />
              </motion.div>
              <div className="size-7 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.1] text-[10px] font-bold text-[#6F7077] flex items-center justify-center shadow-xs">
                +12K
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Metric Card 2: Applications (lg:col-span-2) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative lg:col-span-2 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] overflow-hidden cursor-pointer group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#EEEBFF]/40 to-transparent rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center shadow-xs">
                <FileText size={14} />
              </div>
              <span className="text-xs font-bold text-[#171719]">Applications</span>
            </div>

            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight">
                1,286
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#141414]/[0.05]">
            <div className="flex items-end gap-1 h-6">
              {[35, 55, 50, 75, 90].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t-sm bg-[#5B4BFF]"
                  style={{ height: `${h}%`, opacity: 0.4 + (i / 5) * 0.6 }}
                />
              ))}
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-[#279B63] bg-[#EAF8F1] px-1.5 py-0.5 rounded-full">
              <ArrowUpRight size={10} />
              +12.2%
            </span>
          </div>
        </motion.div>

        {/* ── Metric Card 3: Pending Review (lg:col-span-2) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative lg:col-span-2 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] overflow-hidden cursor-pointer group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FDF6EA]/60 to-transparent rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#FDF6EA] text-[#E6A23C] flex items-center justify-center shadow-xs">
                <Clock size={14} />
              </div>
              <span className="text-xs font-bold text-[#171719]">Pending Review</span>
            </div>

            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight">
                326
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#141414]/[0.05]">
            <div className="flex items-end gap-1 h-6">
              {[70, 60, 65, 45, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t-sm bg-[#E6A23C]"
                  style={{ height: `${h}%`, opacity: 0.5 + (i / 5) * 0.5 }}
                />
              ))}
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-[#E45D5D] bg-[#FDEDED] px-1.5 py-0.5 rounded-full">
              <ArrowDownRight size={10} />
              -4.2%
            </span>
          </div>
        </motion.div>

        {/* ── Metric Card 4: Revenue (lg:col-span-2) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative lg:col-span-2 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] overflow-hidden cursor-pointer group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#EEEBFF]/50 to-transparent rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center shadow-xs">
                <Wallet size={14} />
              </div>
              <span className="text-xs font-bold text-[#171719]">Revenue</span>
            </div>

            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight">
                ₹48.6L
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#141414]/[0.05]">
            <div className="flex items-end gap-1 h-6">
              {[40, 60, 65, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t-sm bg-[#5B4BFF]"
                  style={{ height: `${h}%`, opacity: 0.4 + (i / 5) * 0.6 }}
                />
              ))}
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-[#279B63] bg-[#EAF8F1] px-1.5 py-0.5 rounded-full">
              <ArrowUpRight size={10} />
              +14.2%
            </span>
          </div>
        </motion.div>

        {/* ── Metric Card 5: Campus Engagement Card (lg:col-span-2) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative lg:col-span-2 rounded-3xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-[#141414]/[0.08] shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] group"
        >
          <Image
            src="/images/campus-pavilion.jpg"
            alt="Campus Engagement"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-wider text-[#EEEBFF] uppercase block">
              Campus Vitality
            </span>
            <h4 className="font-serif text-sm font-bold text-white leading-tight mt-1">
              A thriving ecosystem of learning &amp; growth.
            </h4>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between text-white/90">
            <span className="text-[11px] font-medium text-white/80">96.4% Engagement</span>
            <div className="size-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#5B4BFF] transition-colors">
              <ArrowUpRight size={12} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
