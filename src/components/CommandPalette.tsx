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
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#171719]/30 backdrop-blur-sm" onClick={close} />
          <motion.div
            role="dialog"
            aria-label="Command search"
            initial={{ y: -16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#141414]/[0.08] bg-[#FFFFFF] shadow-2xl"
          >
            <label className="flex items-center gap-3 border-b border-[#141414]/[0.06] px-5 py-3.5 bg-[#FBFAF7]">
              <Search size={18} className="text-[#5B4BFF]" />
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
                className="flex-1 bg-transparent text-sm text-[#171719] placeholder:text-[#8E909A] outline-none"
              />
              <kbd className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-[#6F7077] border border-[#141414]/[0.08]">
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
                      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition ${
                        on
                          ? "bg-[#EEEBFF] text-[#171719]"
                          : "text-[#55565D] hover:bg-[#F6F4EF]"
                      }`}
                    >
                      <span
                        className={`grid size-8 place-items-center rounded-lg transition ${
                          on
                            ? "bg-[#5B4BFF] text-white shadow-sm"
                            : "bg-[#F6F4EF] text-[#6F7077]"
                        }`}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-[#171719]">{h.label}</span>
                        <span className={`block truncate text-[11px] ${on ? "text-[#5B4BFF]" : "text-[#6F7077]"}`}>
                          {h.hint}
                        </span>
                      </span>
                      <span
                        className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          on ? "bg-white text-[#5B4BFF]" : "bg-[#F6F4EF] text-[#8E909A]"
                        }`}
                      >
                        {h.kind}
                      </span>
                      {on && <CornerDownLeft size={13} className="text-[#5B4BFF]" />}
                    </button>
                  </li>
                );
              })}
              {!hits.length && (
                <li className="p-8 text-center text-xs text-[#8E909A]">No records matching “{q}”.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
