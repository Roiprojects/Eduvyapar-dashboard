"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, Search, X } from "lucide-react";
import { areas, modules } from "@/lib/data";
import { getLenis } from "@/lib/scroll";

export const iconFor = (name: string) => (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Box;

export default function ModulesOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const ql = q.toLowerCase();
  const match = useMemo(
    () =>
      new Set(
        modules
          .map((m, i) => ({ m, i }))
          .filter(({ m }) =>
            [m.name, m.legacy ?? "", m.desc, ...m.groups.flatMap((g) => g.items.map((it) => it.label))]
              .join(" ")
              .toLowerCase()
              .includes(ql),
          )
          .map(({ i }) => i),
      ),
    [ql],
  );
  const mod = modules[active];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-[#05080e]/75 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label="All modules"
            className="glass relative flex h-[min(90vh,800px)] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/[0.1] bg-[#09111e]/90 shadow-2xl md:flex-row"
            initial={{ y: 50, rotateX: 12, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, rotateX: 8, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            style={{ transformPerspective: 1400 }}
          >
            {/* left rail */}
            <div className="flex max-h-[42%] flex-col border-b border-white/[0.08] bg-[#070d18]/80 p-5 md:max-h-none md:w-84 md:border-r md:border-b-0">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-xl font-bold tracking-wide text-white">✦ Sovereign Matrix</p>
                <span className="text-[10px] font-bold tracking-widest text-[#39ff14] uppercase">Live ERP</span>
              </div>
              <label className="relative mb-4 block">
                <Search size={15} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-white/40" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Filter matrix by keyword…"
                  className="w-full rounded-full border border-white/[0.08] bg-white/[0.05] py-2.5 pr-3 pl-10 text-xs text-white placeholder-white/40 outline-none focus:border-[#39ff14]/50 focus:ring-2 focus:ring-[#39ff14]/20"
                />
              </label>
              <div data-lenis-prevent className="no-scrollbar -mx-1 flex-1 overflow-y-auto px-1 space-y-4">
                {areas.map((area) => {
                  const list = modules.map((m, i) => ({ m, i })).filter(({ m, i }) => m.area === area && match.has(i));
                  if (!list.length) return null;
                  return (
                    <div key={area}>
                      <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold tracking-[0.25em] text-[#e5c378] uppercase">
                        {area}
                      </p>
                      <div className="space-y-1">
                        {list.map(({ m, i }) => {
                          const Icon = iconFor(m.icon);
                          const on = i === active;
                          return (
                            <button
                              key={m.name}
                              onClick={() => setActive(i)}
                              className={`group relative flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left transition ${
                                on
                                  ? "bg-white/[0.09] text-white border border-white/[0.12] shadow-lg shadow-black/50"
                                  : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                              }`}
                            >
                              {on && (
                                <motion.span
                                  layoutId="modbar"
                                  className="absolute top-2.5 bottom-2.5 left-1 w-1 rounded-full bg-[#39ff14]"
                                />
                              )}
                              <span
                                className={`grid size-8 place-items-center rounded-xl transition ${
                                  on
                                    ? "bg-gradient-to-br from-[#0e2748] to-[#081525] text-[#39ff14] border border-[#39ff14]/30"
                                    : "bg-white/[0.04] text-white/50 group-hover:text-white"
                                }`}
                              >
                                <Icon size={16} />
                              </span>
                              <span className="flex-1 text-xs font-semibold">{m.name}</span>
                              {m.badge && (
                                <span className="rounded-full bg-[#39ff14]/15 px-2 py-0.5 text-[10px] font-bold text-[#39ff14]">
                                  {m.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {!match.size && <p className="p-4 text-xs text-white/40">No module matching “{q}”.</p>}
              </div>
              <p className="mt-3 hidden px-2 text-[11px] text-white/40 md:block">
                Press <kbd className="rounded bg-white/[0.08] px-1.5 py-0.5 font-semibold text-white/70">Esc</kbd> to exit.
              </p>
            </div>

            {/* right pane */}
            <div data-lenis-prevent className="relative flex-1 overflow-y-auto p-6 sm:p-10">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-6 right-6 grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/70 transition hover:rotate-90 hover:bg-white/[0.12] hover:text-white"
              >
                <X size={18} />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[11px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">{mod.area} Division</p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-[#0c2442] to-[#071322] text-[#e5c378] border border-[#e5c378]/30 shadow-xl shadow-black/80">
                      {createElement(iconFor(mod.icon), { size: 28 })}
                    </span>
                    <div>
                      <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">{mod.name}</h2>
                      <p className="mt-1 text-sm text-white/60">
                        {mod.desc}
                        {mod.legacy && <span className="ml-2 text-white/35">· legacy alias “{mod.legacy}”</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {mod.groups.map((g, gi) => (
                      <motion.div
                        key={g.title}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * gi }}
                        className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-md"
                      >
                        <p className="mb-3 px-2 text-[10px] font-bold tracking-[0.25em] text-[#e5c378] uppercase">
                          {g.title}
                        </p>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <Link
                              key={it.label}
                              href={it.href ?? "/dashboard"}
                              onClick={onClose}
                              className="group flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 transition hover:bg-white/[0.08]"
                            >
                              <div>
                                <span className="block text-sm font-semibold text-white group-hover:text-[#39ff14] transition">
                                  {it.label}
                                </span>
                                {it.desc && <span className="block text-xs text-white/45">{it.desc}</span>}
                              </div>
                              <ArrowRight
                                size={15}
                                className="shrink-0 -translate-x-2 text-[#39ff14] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
