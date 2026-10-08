"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { queries, queryCategories } from "@/lib/data";

export default function PrincipalAssistant() {
  const [cat, setCat] = useState<(typeof queryCategories)[number]>("All");
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const filtered = queries.filter((q) => cat === "All" || q.cat === cat);
  const shown = all ? filtered : filtered.slice(0, 6);

  return (
    <div className="glass rounded-[32px] p-6 sm:p-10 border border-white/[0.1] bg-[#081220]/80 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0e2748] to-[#071322] text-[#39ff14] border border-[#39ff14]/30 shadow-lg shadow-black/80">
            <Sparkles size={22} />
          </span>
          <div>
            <h3 className="font-display flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-white">
              Principal Assistant
              <span className="rounded-full bg-[#39ff14]/15 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#39ff14] uppercase border border-[#39ff14]/25">
                ✦ Vanguard Inference
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-white/55">
              Select an institutional query below to generate instant cross-ledger predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
        {queryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="relative shrink-0 rounded-full px-4 py-2 text-xs font-bold transition"
          >
            {cat === c && (
              <motion.span
                layoutId="chip"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e5c378] to-[#fae6b2] shadow-lg shadow-[#e5c378]/20"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                cat === c ? "text-[#05080e] font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              {c}
            </span>
          </button>
        ))}
      </div>

      {/* Query Cards */}
      <motion.div layout className="mt-6 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((q) => {
            const on = open === q.q;
            return (
              <motion.button
                layout
                key={q.q}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                onClick={() => setOpen(on ? null : q.q)}
                className={`group rounded-2xl p-5 text-left transition-all duration-300 border ${
                  on
                    ? "bg-white/[0.09] text-white border-[#39ff14]/40 shadow-xl shadow-black/80"
                    : "bg-white/[0.03] text-white/80 border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex-1">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${
                        on ? "text-[#39ff14]" : "text-[#e5c378]"
                      }`}
                    >
                      {q.cat}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold text-white leading-snug">
                      {q.q}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${
                      on
                        ? "rotate-90 text-[#39ff14]"
                        : "text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    }`}
                  />
                </span>
                <AnimatePresence>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-4 block border-t border-white/[0.08] pt-3 text-xs leading-relaxed text-[#fae6b2]">
                        ✦ {q.a}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length > 6 && (
        <button
          onClick={() => setAll((a) => !a)}
          className="mx-auto mt-6 block text-xs font-bold text-[#e5c378] hover:text-[#fae6b2] transition underline underline-offset-4"
        >
          {all ? "✦ Show fewer queries" : `✦ View all ${filtered.length} institutional intelligence queries`}
        </button>
      )}
    </div>
  );
}
