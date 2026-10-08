"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, User } from "lucide-react";
import { applicants, modules } from "@/lib/data";
import { getLenis } from "@/lib/scroll";
import { iconFor } from "./ModulesOverlay";

type Hit = { kind: "Page" | "Student" | "Action"; label: string; hint: string; href: string; icon: string };

const index: Hit[] = [
  { kind: "Action", label: "✦ Register New Candidate", hint: "Admissions & Intake", href: "/dashboard/preadmission?new=1", icon: "Plus" },
  { kind: "Action", label: "✦ Query AI Principal Assistant", hint: "Vanguard Intelligence", href: "/dashboard#assistant", icon: "Sparkles" },
  ...modules.flatMap((m) =>
    m.groups.flatMap((g) =>
      g.items.map((it) => ({
        kind: "Page" as const,
        label: it.label,
        hint: `${m.name} › ${g.title}`,
        href: it.href ?? "/dashboard",
        icon: m.icon,
      })),
    ),
  ),
  ...applicants.map((a) => ({
    kind: "Student" as const,
    label: a.name,
    hint: `#${a.appNo} · ${a.cls}`,
    href: `/dashboard/preadmission?q=${a.appNo}`,
    icon: "User",
  })),
];

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
  }, [open]);

  const close = () => {
    setOpen(false);
    setQ("");
    setSel(0);
  };

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = s
      ? index.filter((h) => `${h.label} ${h.hint}`.toLowerCase().includes(s))
      : index.filter((h) => h.kind !== "Student");
    return r.slice(0, 9);
  }, [q]);

  const go = (h: Hit) => {
    close();
    router.push(h.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-3 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#05080e]/80 backdrop-blur-md" onClick={close} />
          <motion.div
            role="dialog"
            aria-label="Command search"
            initial={{ y: -20, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/[0.12] bg-[#09111e]/95 shadow-2xl shadow-black/90"
          >
            <label className="flex items-center gap-3 border-b border-white/[0.08] px-5 bg-white/[0.02]">
              <Search size={18} className="text-[#39ff14]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, hits.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  }
                  if (e.key === "Enter" && hits[sel]) go(hits[sel]);
                  if (e.key === "Escape") close();
                }}
                placeholder="Jump to page, lookup candidate, or execute command…"
                className="flex-1 bg-transparent py-4 text-sm text-white placeholder-white/40 outline-none"
              />
              <kbd className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-white/50 border border-white/[0.06]">
                Esc
              </kbd>
            </label>
            <ul data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
              {hits.map((h, i) => {
                const Icon = h.kind === "Student" ? User : iconFor(h.icon);
                const on = i === sel;
                return (
                  <li key={h.kind + h.label + h.hint}>
                    <button
                      onMouseEnter={() => setSel(i)}
                      onClick={() => go(h)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition ${
                        on
                          ? "bg-white/[0.1] text-white border border-[#39ff14]/30"
                          : "text-white/70 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`grid size-9 place-items-center rounded-xl transition ${
                          on
                            ? "bg-gradient-to-br from-[#0c2440] to-[#071322] text-[#39ff14] border border-[#39ff14]/30"
                            : "bg-white/[0.04] text-white/40"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">{h.label}</span>
                        <span className={`block truncate text-xs ${on ? "text-white/70" : "text-white/40"}`}>
                          {h.hint}
                        </span>
                      </span>
                      <span
                        className={`text-[10px] font-bold tracking-widest uppercase ${
                          on ? "text-[#e5c378]" : "text-white/30"
                        }`}
                      >
                        {h.kind}
                      </span>
                      {on && <CornerDownLeft size={14} className="text-[#39ff14]" />}
                    </button>
                  </li>
                );
              })}
              {!hits.length && (
                <li className="p-8 text-center text-sm text-white/40">No records matching “{q}”.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
