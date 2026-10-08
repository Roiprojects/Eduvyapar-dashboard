"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, CalendarClock, IndianRupee, PackageX } from "lucide-react";
import { pipeline } from "@/lib/data";

const actions = [
  {
    icon: IndianRupee,
    tone: "#e5c378",
    title: "13 applicants haven't paid fee",
    body: "₹32,500 pending collection. Send SMS reminder batch.",
    cta: "Remind All",
    href: "/dashboard/preadmission?f=unpaid",
  },
  {
    icon: AlertTriangle,
    tone: "#39ff14",
    title: "Fitter SH2 attendance at 71%",
    body: "Critical threshold breached mostly on Monday lab cohorts.",
    cta: "Inspect Class",
    href: "/dashboard",
  },
  {
    icon: CalendarClock,
    tone: "#00f0ff",
    title: "State Board practicals in 6 days",
    body: "Oct 14 · 3 technical trades · seating roster pending.",
    cta: "Open COE",
    href: "/dashboard",
  },
  {
    icon: PackageX,
    tone: "#8a5cf6",
    title: "2 items below inventory reorder",
    body: "Electrode welding rods & protective goggles below minimum.",
    cta: "Reorder",
    href: "/dashboard",
  },
];

/** "Needs your attention" — actionable cards rather than passive numbers. */
export function TodayStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-6 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300"
        >
          {/* Top glowing accent bar */}
          <span
            className="absolute top-0 left-6 h-[2px] w-14 rounded-b-full shadow-lg"
            style={{ background: a.tone, boxShadow: `0 0 14px ${a.tone}` }}
          />

          <div>
            <span
              className="mb-4 grid size-11 place-items-center rounded-2xl text-[#05080e] font-bold shadow-lg"
              style={{ background: `linear-gradient(135deg, ${a.tone}, #ffffff)` }}
            >
              <a.icon size={19} />
            </span>
            <p className="font-display text-lg leading-snug font-bold text-white group-hover:text-[#fae6b2] transition">
              {a.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/55">{a.body}</p>
          </div>

          <Link
            href={a.href}
            className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-white/[0.06] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#39ff14] hover:text-[#05080e] border border-white/[0.08]"
          >
            {a.cta} <ArrowUpRight size={13} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/** Admission funnel: each stage narrows; click a stage to open the filtered list. */
export function Funnel() {
  const stages = [
    { label: "Applied", value: 144 },
    { label: "Form filled", value: pipeline.find((p) => p.label === "Form Filled")!.value + 1 },
    { label: "Paid", value: 1 },
    { label: "Confirmed", value: 9 },
  ];
  const max = stages[0].value;
  return (
    <div className="space-y-3">
      {stages.map((s, i) => {
        const w = Math.max(18, Math.sqrt(s.value / max) * 100);
        return (
          <Link key={s.label} href="/dashboard/preadmission" className="group flex items-center gap-4">
            <span className="w-24 shrink-0 text-xs font-semibold text-white/60 group-hover:text-white transition">
              {s.label}
            </span>
            <span className="relative flex h-11 flex-1 justify-center rounded-xl bg-white/[0.03] p-1 border border-white/[0.05]">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center rounded-lg text-xs font-bold text-[#05080e] shadow-md transition group-hover:brightness-125"
                style={{
                  background: `linear-gradient(90deg, #e5c378, ${["#fae6b2", "#39ff14", "#00f0ff", "#2fd3a5"][i]})`,
                }}
              >
                {s.value}
              </motion.span>
            </span>
            <span className="w-12 text-right text-xs font-bold text-[#39ff14] tabular-nums">
              {i ? `${Math.round((s.value / stages[i - 1].value) * 100)}%` : "100%"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
