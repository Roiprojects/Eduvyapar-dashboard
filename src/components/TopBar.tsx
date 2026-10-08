"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ChevronRight,
  Compass,
  GraduationCap,
  LayoutGrid,
  Search,
  Sparkles,
  Wallet,
  BookOpen,
  Boxes,
  Building2,
} from "lucide-react";
import ModulesOverlay from "./ModulesOverlay";
import CommandPalette from "./CommandPalette";
import { school } from "@/lib/data";

const quickModules = [
  { name: "Admissions", href: "/dashboard/preadmission", icon: GraduationCap, badge: "13" },
  { name: "Academic Hub", href: "/dashboard#overview", icon: BookOpen },
  { name: "Treasury & Fees", href: "/dashboard#overview", icon: Wallet, badge: "₹" },
  { name: "Campus Ops", href: "/dashboard#overview", icon: Boxes },
  { name: "AI Vanguard", href: "/dashboard#assistant", icon: Sparkles },
];

export default function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [palette, setPalette] = useState(false);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  // Calculate user-friendly Module > Submodule > Page hierarchy
  const isPreadmission = pathname.includes("/preadmission");
  const moduleName = isPreadmission ? "Admissions" : "Campus Executive";
  const subModuleName = isPreadmission ? "Intake & Registrations" : "Operations Hub";
  const pageName = isPreadmission ? "Candidate Dossier" : "Overview";

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 z-50 px-3 pt-3 sm:px-6"
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <nav className="glass mx-auto flex max-w-7xl items-center gap-3 rounded-full py-2 pr-2.5 pl-3 sm:gap-4 border border-white/[0.08] shadow-2xl shadow-black/80">
          {/* Brand Logo & Institution */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <span className="font-display relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#0c223c] to-[#050e1b] text-sm font-bold text-[#e5c378] border border-[#e5c378]/30 shadow-lg shadow-[#000000]/60 transition-transform duration-300 group-hover:scale-105">
              <span className="absolute inset-0 rounded-full bg-[#39ff14]/10 blur-sm group-hover:bg-[#39ff14]/25 transition" />
              <span className="relative">EV</span>
            </span>
            <div className="hidden leading-tight lg:block">
              <span className="font-display block text-sm font-bold tracking-wide text-white group-hover:text-[#fae6b2] transition">
                {school.name}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-[#39ff14] uppercase">
                <span className="size-1.5 rounded-full bg-[#39ff14] animate-pulse" />
                Vanguard Edition
              </span>
            </div>
          </Link>

          {/* User-Friendly Module Hierarchy Breadcrumb */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-white/50 pl-2 pr-1 border-l border-white/[0.08]">
            <span className="font-medium text-white/80">{moduleName}</span>
            <ChevronRight size={13} className="text-[#e5c378]/60" />
            <span className="font-medium text-white/60">{subModuleName}</span>
            <ChevronRight size={13} className="text-[#39ff14]/60" />
            <span className="font-semibold text-[#fae6b2] bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.08]">
              {pageName}
            </span>
          </div>

          {/* Quick-Jump Search Button (Ctrl+K) */}
          <button
            onClick={() => setPalette(true)}
            className="relative hidden flex-1 items-center gap-2.5 rounded-full bg-white/[0.04] py-2 px-4 text-left text-sm text-white/40 transition hover:bg-white/[0.08] hover:text-white/70 border border-white/[0.05] md:flex"
          >
            <Search size={15} className="text-[#39ff14]/80" />
            <span className="flex-1 text-xs truncate">Search student, module, ledger, or action…</span>
            <kbd className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[10px] font-semibold text-white/60 border border-white/[0.06]">
              Ctrl K
            </kbd>
          </button>

          {/* Module Navigation & Quick Links */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* Quick Modules Dropdown / Toggle */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setQuickNavOpen(!quickNavOpen)}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/[0.1] hover:text-[#fae6b2] border border-white/[0.08]"
              >
                <Compass size={14} className="text-[#39ff14]" />
                <span>Jump To</span>
              </button>

              {quickNavOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setQuickNavOpen(false)}
                  />
                  <div className="glass absolute right-0 top-12 z-50 w-64 rounded-2xl p-2 border border-white/[0.1] shadow-2xl">
                    <p className="px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#e5c378] uppercase">
                      Direct Module Links
                    </p>
                    <div className="space-y-1">
                      {quickModules.map((m) => (
                        <Link
                          key={m.name}
                          href={m.href}
                          onClick={() => setQuickNavOpen(false)}
                          className="flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/[0.08] hover:text-[#39ff14]"
                        >
                          <span className="flex items-center gap-2">
                            <m.icon size={15} className="text-[#fae6b2]" />
                            {m.name}
                          </span>
                          {m.badge && (
                            <span className="rounded-full bg-[#39ff14]/15 px-2 py-0.5 text-[10px] font-bold text-[#39ff14]">
                              {m.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* All Modules Drawer Button */}
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e5c378] via-[#fae6b2] to-[#e5c378] px-4 py-2 text-xs font-bold text-[#05080e] shadow-lg shadow-[#e5c378]/20 transition hover:brightness-110 active:scale-95"
            >
              <LayoutGrid size={15} className="transition group-hover:rotate-90" />
              <span>✦ Modules</span>
            </button>

            {/* Chairman / Principal Profile Pill */}
            <div className="flex items-center gap-2 rounded-full bg-white/[0.05] py-1 pr-3 pl-1.5 border border-white/[0.08]">
              <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#10243e] to-[#07111e] text-[11px] font-bold text-[#39ff14] border border-[#39ff14]/30 shadow-md">
                P
              </span>
              <span className="hidden text-xs leading-none sm:block">
                <span className="block font-bold text-white text-[11px]">{school.short}</span>
                <span className="text-[10px] text-[#e5c378] font-medium">Principal</span>
              </span>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full Modules Overlay & Command Palette */}
      <ModulesOverlay open={open} onClose={() => setOpen(false)} />
      <CommandPalette open={palette} setOpen={setPalette} />
    </>
  );
}
