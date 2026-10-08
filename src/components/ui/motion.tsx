"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform, animate } from "framer-motion";

/** Section that tilts up out of 3D space as it scrolls into view, then flattens. */
export function Tilt3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [22, 0]);
  const y = useTransform(p, [0, 1], [90, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const opacity = useTransform(p, [0, 0.6], [0, 1]);
  return (
    <div ref={ref} style={{ perspective: 1400 }} className={className}>
      <motion.div style={{ rotateX, y, scale, opacity, transformOrigin: "50% 100%" }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Words rise in one by one, staggered headline reveal. */
export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString("en-IN")}
    </span>
  );
}

/** Card that tilts toward the cursor. */
export function HoverTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [r, setR] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 900 }}
      animate={{ rotateX: r.x, rotateY: r.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        setR({ x: -((e.clientY - b.top) / b.height - 0.5) * 10, y: ((e.clientX - b.left) / b.width - 0.5) * 12 });
      }}
      onMouseLeave={() => setR({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-gradient-to-r from-[#39ff14] via-[#00f0ff] to-[#e5c378] shadow-[0_0_12px_#39ff14]"
    />
  );
}
