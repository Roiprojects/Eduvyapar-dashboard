"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import * as Icons from "lucide-react";
import { modules } from "@/lib/data";

const tones = [
  "from-[#e5c378] to-[#fae6b2]",
  "from-[#39ff14] to-[#00f0ff]",
  "from-[#00f0ff] to-[#38bdf8]",
  "from-[#8a5cf6] to-[#c084fc]",
];

function Card({ i, p, total }: { i: number; p: MotionValue<number>; total: number }) {
  const m = modules[i];
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[m.icon] ?? Icons.Box;
  const center = i / (total - 1);

  // 3D card tilt & depth transformation
  const rotateY = useTransform(p, [center - 0.35, center, center + 0.35], [-26, 0, 26]);
  const z = useTransform(p, [center - 0.35, center, center + 0.35], [-100, 30, -100]);

  return (
    <motion.div style={{ rotateY, z, transformPerspective: 1200 }} className="shrink-0">
      <Link
        href={m.groups[0].items[0].href ?? "/dashboard"}
        className="group glass relative flex h-[360px] w-[280px] flex-col justify-between overflow-hidden rounded-[30px] p-7 sm:h-[420px] sm:w-[330px] border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500"
      >
        {/* Ambient Halo */}
        <span
          className={`absolute -top-20 -right-20 size-52 rounded-full bg-gradient-to-br ${
            tones[i % 4]
          } opacity-20 blur-3xl transition duration-500 group-hover:scale-125 group-hover:opacity-40`}
        />

        {/* Module Icon */}
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0c2340] to-[#050e1b] text-[#fae6b2] border border-[#e5c378]/30 shadow-xl shadow-black/80">
          <Icon size={26} />
        </span>

        {/* Content */}
        <div>
          <p className="font-display text-[10px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
            {String(i + 1).padStart(2, "0")} · {m.area}
          </p>
          <h3 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-white group-hover:text-[#fae6b2] transition">
            {m.name}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-white/55 line-clamp-2">{m.desc}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#e5c378] group-hover:text-[#39ff14] transition">
            Launch Module ✦{" "}
            <Icons.ArrowUpRight
              size={15}
              className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/** Pinned section: vertical scroll drives a horizontal 3D carousel of modules. */
export default function ModulesRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const x = useTransform(p, [0, 1], ["4vw", "calc(-100% + 92vw)"]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-7xl px-6">
          <p className="text-[11px] font-bold tracking-[0.3em] text-[#39ff14] uppercase">
            ✦ Sovereign Matrix Explorer
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mt-2">
            Every module, <span className="text-gradient-gold">one orbit away.</span>
          </h2>
        </div>
        <motion.div
          style={{ x }}
          className="flex w-max gap-6 will-change-transform [transform-style:preserve-3d]"
        >
          {modules.map((_, i) => (
            <Card key={i} i={i} p={p} total={modules.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
