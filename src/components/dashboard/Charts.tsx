"use client";

import { motion } from "framer-motion";
import { pipeline, weekly } from "@/lib/data";

export function AreaChart() {
  const w = 600;
  const h = 220;
  const max = Math.max(...weekly) * 1.15;
  const pts = weekly.map((v, i) => [(i / (weekly.length - 1)) * w, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h + 26}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Applications per week rising trajectory"
    >
      <defs>
        <linearGradient id="neonGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#39ff14" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#05080e" stopOpacity="0" />
        </linearGradient>
        <filter id="glowLine" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#39ff14" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Subtle grid lines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke="#ffffff"
          strokeOpacity="0.06"
          strokeDasharray="4 4"
        />
      ))}

      {/* Gradient fill */}
      <motion.path
        d={area}
        fill="url(#neonGradient)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />

      {/* Luminous stroke line */}
      <motion.path
        d={line}
        fill="none"
        stroke="#39ff14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowLine)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Glowing point nodes */}
      {pts.map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08 }}
        >
          <circle cx={x} cy={y} r="7" fill="#39ff14" fillOpacity="0.25" />
          <circle cx={x} cy={y} r="4" fill="#05080e" stroke="#39ff14" strokeWidth="2.5">
            <title>{`Week ${i + 1}: ${weekly[i]} applications`}</title>
          </circle>
        </motion.g>
      ))}

      {/* X-axis labels */}
      {pts.map(([x], i) =>
        i % 2 === 0 ? (
          <text
            key={i}
            x={x}
            y={h + 20}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.08em"
            fill="#ffffff"
            fillOpacity="0.45"
          >
            W{i + 1}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function Pipeline() {
  const max = Math.max(...pipeline.map((p) => p.value));
  return (
    <div className="space-y-4">
      {pipeline.map((p, i) => (
        <div key={p.label} className="grid grid-cols-[130px_1fr_36px] items-center gap-3 text-xs">
          <span className="font-medium text-white/70 truncate">{p.label}</span>
          <span className="h-2 overflow-hidden rounded-full bg-white/[0.06] p-[1px] border border-white/[0.05]">
            <motion.span
              className="block h-full rounded-full"
              style={{ background: p.tone }}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(4, (p.value / max) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <b className="text-right tabular-nums text-white font-semibold">{p.value}</b>
        </div>
      ))}
    </div>
  );
}
