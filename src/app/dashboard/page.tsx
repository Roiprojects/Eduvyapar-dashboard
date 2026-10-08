"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, IndianRupee, GraduationCap, Users, Sparkles } from "lucide-react";
import { Counter, HoverTilt, Reveal, SplitText, Tilt3D } from "@/components/ui/motion";
import PrincipalAssistant from "@/components/dashboard/PrincipalAssistant";
import ModulesRail from "@/components/dashboard/ModulesRail";
import { AreaChart } from "@/components/dashboard/Charts";
import { Funnel, TodayStrip } from "@/components/dashboard/TodayStrip";
import { applicants, modules, stats } from "@/lib/data";

const statIcons = [FileText, Users, GraduationCap, IndianRupee];

const statHalos = [
  "from-[#e5c378] to-[#fae6b2]",
  "from-[#39ff14] to-[#00f0ff]",
  "from-[#00f0ff] to-[#38bdf8]",
  "from-[#8a5cf6] to-[#c084fc]",
];

function Marquee() {
  const items = [...modules, ...modules];
  return (
    <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 42 }}
      >
        {items.map((m, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-12 text-2xl font-bold whitespace-nowrap text-white/20 sm:text-4xl tracking-wider"
          >
            {m.name} <span className="size-2 rounded-full bg-[#39ff14]/70 shadow-[0_0_10px_#39ff14]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function DashboardPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -140]);
  const heroO = useTransform(scrollY, [0, 500], [1, 0]);
  const [today, setToday] = useState("Today");

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setToday(
        new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
      ),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex min-h-[100svh] items-center px-6 pt-32 pb-16">
        <motion.div style={{ y: heroY, opacity: heroO }} className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase border border-[#39ff14]/30 shadow-lg shadow-[#39ff14]/10"
          >
            <span className="size-2 animate-pulse rounded-full bg-[#39ff14]" />
            <span className="text-[#39ff14]">✦ {today}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/70">Autonomous Campus Grid</span>
          </motion.div>

          <h1 className="font-display max-w-5xl text-[clamp(3.2rem,8.5vw,7.8rem)] leading-[0.93] font-black tracking-tight text-white">
            <SplitText text="Command the" />
            <br />
            <SplitText text="Institutional Horizon." className="text-gradient-gold" delay={0.25} />
          </h1>

          <Reveal delay={0.45}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed font-light">
              144 applications, 13 faculties, and ₹3,010 recorded today across all campus ledgers. Zero paper, zero latency, total sovereign clarity.
            </p>
          </Reveal>

          <Reveal delay={0.6} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/dashboard/preadmission"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#e5c378] via-[#fae6b2] to-[#e5c378] px-7 py-4 text-sm font-bold text-[#05080e] shadow-xl shadow-[#e5c378]/25 transition hover:brightness-110 hover:shadow-[#e5c378]/40"
            >
              <span>✦ Review Intake Dossier</span>
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <a
              href="#overview"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white hover:bg-white/[0.08] transition border border-white/[0.08]"
            >
              <span>Telemetry Overview</span> <ArrowDown size={16} className="text-[#39ff14]" />
            </a>
          </Reveal>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          <span>Scroll to explore</span>
          <span className="size-1 rounded-full bg-[#39ff14]" />
        </motion.div>
      </section>

      <Marquee />

      {/* TODAY: EXECUTIVE DISPATCH */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
              ✦ Executive Dispatch
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mt-1">
              Priority Actions
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm text-white/50 leading-relaxed">
            High-leverage intervention targets surfaced by autonomous campus telemetry.
          </p>
        </Reveal>
        <TodayStrip />
      </section>

      {/* SYSTEM OVERVIEW & METRICS */}
      <section id="overview" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-24 sm:px-6">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
            ✦ System Telemetry
          </p>
          <h2 className="font-display mb-10 text-4xl sm:text-6xl font-bold text-white tracking-tight mt-1">
            Metrics &amp; Real-Time Analytics
          </h2>
        </Reveal>

        {/* 4 Stat Cards */}
        <Tilt3D>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <HoverTilt key={s.label}>
                  <div className="glass group relative overflow-hidden rounded-[30px] p-7 border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-300">
                    <span
                      className={`absolute -right-12 -bottom-12 size-40 rounded-full bg-gradient-to-br ${
                        statHalos[i]
                      } opacity-15 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-35`}
                    />
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0c2440] to-[#071322] text-[#fae6b2] border border-[#e5c378]/30 shadow-lg">
                      <Icon size={22} />
                    </span>
                    <p className="mt-8 text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
                      {s.label}
                    </p>
                    <p className="font-display mt-2 text-4xl sm:text-5xl font-extrabold text-white">
                      <Counter to={s.value} prefix={s.prefix} />
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[#39ff14] flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#39ff14]" />
                      {s.delta}
                    </p>
                  </div>
                </HoverTilt>
              );
            })}
          </div>
        </Tilt3D>

        {/* Chart + Funnel Bento */}
        <Tilt3D className="mt-6">
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="glass rounded-[32px] p-7 sm:p-9 lg:col-span-3 border border-white/[0.08]">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
                    ✦ Candidate Intake Trajectory
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    Up 175% across current intake cycle
                  </p>
                </div>
                <span className="rounded-full bg-[#39ff14]/15 px-3 py-1 text-xs font-bold text-[#39ff14] border border-[#39ff14]/25">
                  +16 this week
                </span>
              </div>
              <AreaChart />
            </div>

            <div className="glass rounded-[32px] p-7 sm:p-9 lg:col-span-2 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
                  ✦ Conversion Pipeline
                </p>
                <p className="font-display mb-6 text-2xl sm:text-3xl font-bold text-white mt-1">
                  Intake Drop-off Analysis
                </p>
                <Funnel />
              </div>
              <div className="mt-6 rounded-2xl bg-[#e5c378]/10 p-4 border border-[#e5c378]/20 text-xs leading-relaxed text-white/70">
                <b className="text-[#fae6b2]">✦ Primary Recovery Vector:</b> 13 candidates completed application forms with pending fee settlements. Initiating automated SMS recovery can capture ₹32,500 immediately.
              </div>
            </div>
          </div>
        </Tilt3D>
      </section>

      {/* AI PRINCIPAL ASSISTANT */}
      <section id="assistant" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Tilt3D>
          <PrincipalAssistant />
        </Tilt3D>
      </section>

      {/* 3D MODULES RAIL */}
      <ModulesRail />

      {/* RECENT APPLICATIONS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
              ✦ Live Candidate Inflow
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mt-1">
              Recent Applications
            </h2>
          </div>
          <Link
            href="/dashboard/preadmission"
            className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-6 py-3.5 text-xs font-bold text-white hover:bg-[#39ff14] hover:text-[#05080e] transition border border-white/[0.1]"
          >
            <span>✦ View All Intake Dossiers</span>
            <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
          </Link>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applicants.slice(0, 6).map((a, i) => (
            <Reveal key={a.appNo} delay={i * 0.05}>
              <HoverTilt>
                <div className="glass flex items-center gap-4 rounded-3xl p-5 border border-white/[0.08] hover:border-white/[0.2] transition-colors">
                  <span
                    className={`font-display grid size-14 shrink-0 place-items-center rounded-2xl text-base font-bold text-white border border-white/[0.1] shadow-lg ${
                      a.gender === "Female"
                        ? "bg-gradient-to-br from-[#8a5cf6] to-[#0c2440]"
                        : "bg-gradient-to-br from-[#0c2440] to-[#071322] text-[#e5c378]"
                    }`}
                  >
                    {a.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white text-sm">{a.name}</p>
                    <p className="text-xs text-white/50">
                      #{a.appNo} · {a.cls}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      a.active
                        ? "bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/25"
                        : "bg-white/[0.06] text-white/40"
                    }`}
                  >
                    {a.active ? "Active" : "Archived"}
                  </span>
                </div>
              </HoverTilt>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
