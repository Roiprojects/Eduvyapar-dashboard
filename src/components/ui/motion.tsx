"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform, animate } from "framer-motion";

/**
 * Dignified Academic Elevation Reveal
 * Replaces aggressive wobbling tilts with realistic folio elevation.
 */
export function Tilt3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.5 });
  const y = useTransform(p, [0, 1], [40, 0]);
  const opacity = useTransform(p, [0, 0.7], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Words rise in with dignified editorial cadence */
export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString("en-IN")}
    </span>
  );
}

/**
 * Realistic Folio Card Inspection Lift
 * Replaces cartoonish tilting with tactile, realistic folio elevation on hover.
 */
export function HoverTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      whileTap={{ y: 0 }}
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
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#059669] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
    />
  );
}
