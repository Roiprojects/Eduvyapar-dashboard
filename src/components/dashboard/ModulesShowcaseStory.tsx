"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Package,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";

export interface ModuleStoryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  href: string;
  icon: typeof Users;
  metric: string;
  metricLabel: string;
  isActive?: boolean;
}

export const storyModules: ModuleStoryItem[] = [
  {
    id: "admissions",
    name: "Admissions",
    category: "Intake & Verification",
    description: "Manage applications, admissions and enrollment",
    image: "/images/campus-sculpture.jpg",
    href: "/dashboard/preadmission",
    icon: FileSpreadsheet,
    metric: "1,284",
    metricLabel: "Active Inquiries",
    isActive: true,
  },
  {
    id: "students",
    name: "Students",
    category: "Lifecycle & Registry",
    description: "Academic records and verified student profiles",
    image: "/images/campus-pavilion.jpg",
    href: "/dashboard/preadmission",
    icon: Users,
    metric: "12,842",
    metricLabel: "Enrolled",
  },
  {
    id: "academics",
    name: "Academics",
    category: "Syllabus & Faculty",
    description: "Courses, curriculum structure and examinations",
    image: "/images/architectural-ribbon.jpg",
    href: "/dashboard/preadmission",
    icon: GraduationCap,
    metric: "148",
    metricLabel: "Programs",
  },
  {
    id: "attendance",
    name: "Attendance",
    category: "Biometric & Presence",
    description: "Track attendance, leave and lecture engagement",
    image: "/images/campus-sculpture.jpg",
    href: "/dashboard/preadmission",
    icon: CalendarCheck,
    metric: "96.4%",
    metricLabel: "Presence Rate",
  },
  {
    id: "fees-finance",
    name: "Fees & Finance",
    category: "Treasury & Ledgers",
    description: "Fee collection, invoices and financial records",
    image: "/images/campus-pavilion.jpg",
    href: "/dashboard/preadmission",
    icon: CreditCard,
    metric: "₹48.6L",
    metricLabel: "Collected",
  },
  {
    id: "inventory",
    name: "Inventory",
    category: "Campus Logistics",
    description: "Manage stock, lab items and inventory levels",
    image: "/images/architectural-ribbon.jpg",
    href: "/dashboard/preadmission",
    icon: Package,
    metric: "2,420",
    metricLabel: "Campus Assets",
  },
  {
    id: "reports",
    name: "Reports",
    category: "Executive Intelligence",
    description: "Generate insights, NIRF data and custom reports",
    image: "/images/campus-sculpture.jpg",
    href: "/dashboard/preadmission",
    icon: BarChart3,
    metric: "100%",
    metricLabel: "Compliant",
  },
];

export default function ModulesShowcaseStory() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <section id="chapter-modules" className="relative scroll-mt-24 space-y-4">
      {/* Chapter Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF] mb-2">
            <Sparkles size={12} />
            <span>05 · MODULES SHOWCASE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171719] tracking-tight leading-tight">
            One Architecture. Every Possibility.
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7077] mt-1 max-w-xl">
            Each specialized educational discipline engineered into one seamless, continuous spatial operating environment.
          </p>
        </div>

        {/* Brand Editorial Callout Pill */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-[#141414]/[0.06] shadow-xs">
          <span className="size-2 rounded-full bg-[#35B779] animate-pulse" />
          <span className="text-xs font-semibold text-[#171719]">7 Operational Engines Active</span>
          <span className="text-xs text-[#8E909A]">· Enterprise Cloud</span>
        </div>
      </div>

      {/* Modules Horizontal Story Rail / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 pt-2">
        {storyModules.map((mod, idx) => {
          const Icon = mod.icon;
          const isHovered = hoveredModule === mod.id;

          return (
            <motion.div
              key={mod.id}
              onMouseEnter={() => setHoveredModule(mod.id)}
              onMouseLeave={() => setHoveredModule(null)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between p-5 min-h-[260px] ${
                mod.isActive
                  ? "bg-[#FFFFFF] border-[#5B4BFF]/40 shadow-[0_16px_36px_-8px_rgba(91,75,255,0.14)] ring-2 ring-[#5B4BFF]/20"
                  : "bg-[#FFFFFF] border-[#141414]/[0.07] hover:border-[#141414]/[0.15] shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]"
              }`}
            >
              {/* Architectural Backdrop Image with soft opacity */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <Image
                  src={mod.image}
                  alt={mod.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
              </div>

              {/* Top Row: Icon + Metric */}
              <div className="relative z-10 flex items-start justify-between">
                <div
                  className={`size-10 rounded-2xl flex items-center justify-center transition-colors shadow-xs ${
                    mod.isActive
                      ? "bg-[#5B4BFF] text-white shadow-md shadow-[#5B4BFF]/25"
                      : "bg-[#FBFAF7] text-[#171719] group-hover:bg-[#EEEBFF] group-hover:text-[#5B4BFF] border border-[#141414]/[0.06]"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#171719] block leading-none">
                    {mod.metric}
                  </span>
                  <span className="text-[10px] text-[#8E909A] font-medium tracking-tight mt-0.5 block">
                    {mod.metricLabel}
                  </span>
                </div>
              </div>

              {/* Middle: Title & Description */}
              <div className="relative z-10 my-4 space-y-1">
                <span className="text-[10px] font-bold tracking-wider text-[#5B4BFF] uppercase block">
                  {mod.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#171719] tracking-tight group-hover:text-[#5B4BFF] transition-colors">
                  {mod.name}
                </h3>
                <p className="text-xs text-[#6F7077] line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Bottom: Action link & explore arrow button */}
              <div className="relative z-10 pt-3 border-t border-[#141414]/[0.05] flex items-center justify-between">
                <Link
                  href={mod.href}
                  className="text-xs font-bold text-[#171719] group-hover:text-[#5B4BFF] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore</span>
                </Link>

                <Link
                  href={mod.href}
                  className={`size-7 rounded-full flex items-center justify-center transition-all ${
                    mod.isActive
                      ? "bg-[#5B4BFF] text-white group-hover:scale-110 shadow-sm"
                      : "bg-[#FBFAF7] border border-[#141414]/[0.07] text-[#6F7077] group-hover:bg-[#171719] group-hover:text-white"
                  }`}
                  aria-label={`Open ${mod.name}`}
                >
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
