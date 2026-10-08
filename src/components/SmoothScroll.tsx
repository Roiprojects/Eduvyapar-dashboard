"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, scrollState, setLenis } from "@/lib/scroll";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.075,
      smoothWheel: !reduce,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
      autoRaf: true,
      anchors: { offset: -90 },
    });
    setLenis(lenis);
    lenis.on("scroll", (l: Lenis) => {
      scrollState.progress = l.limit > 0 ? l.scroll / l.limit : 0;
      scrollState.velocity = l.velocity;
    });
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Reset to top on route change so the scene path restarts cleanly.
  useEffect(() => {
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });
    scrollState.progress = 0;
  }, [pathname]);

  return <>{children}</>;
}
