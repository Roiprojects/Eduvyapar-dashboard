"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  isExternal?: boolean;
  href?: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "chapter-00", number: "00", title: "ENTER", subtitle: "Gateway to sovereign campus", isExternal: true, href: "/" },
  { id: "chapter-vision", number: "01", title: "VISION", subtitle: "Institutional mission & architecture" },
  { id: "chapter-people", number: "02", title: "PEOPLE", subtitle: "Enrollment metrics & student body" },
  { id: "chapter-applications", number: "03", title: "APPLICATIONS", subtitle: "Admissions pipeline & 3D status" },
  { id: "chapter-intelligence", number: "04", title: "INTELLIGENCE", subtitle: "Financial clarity & institutional ledger" },
  { id: "chapter-operations", number: "05", title: "OPERATIONS", subtitle: "Recent activity & quick actions" },
  { id: "chapter-modules", number: "06", title: "MODULES", subtitle: "One platform, every possibility" },
  { id: "chapter-dossier", number: "07", title: "DOSSIER", subtitle: "Every application a verified story" },
  { id: "chapter-future", number: "08", title: "FUTURE", subtitle: "Shaping brighter futures" },
];

export default function StoryIndicator() {
  const [activeChapter, setActiveChapter] = useState<string>("chapter-vision");
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const chapterElements = STORY_CHAPTERS.filter((c) => !c.isExternal)
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapter(entry.target.id);
        }
      });
    }, observerOptions);

    chapterElements.forEach((el) => observer.observe(el));

    return () => {
      chapterElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Story Mode Navigation"
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-[#141414]/[0.07] shadow-[0_16px_40px_-8px_rgba(20,20,20,0.08)] rounded-2xl py-3 px-2 flex flex-col items-center">
        {/* Story Mode Header Badge */}
        <div className="px-2 py-1 mb-2 text-center border-b border-[#141414]/[0.05] pb-2 w-full">
          <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#5B4BFF] uppercase block flex items-center justify-center gap-1">
            <Sparkles size={10} />
            STORY
          </span>
          <span className="text-[8px] text-[#8E909A] font-semibold tracking-wider">
            CHAPTERS
          </span>
        </div>

        {/* Vertical Connecting Line with Chapters */}
        <div className="relative flex flex-col items-center gap-2 py-1">
          {/* Subtle center hairline */}
          <div className="absolute top-2 bottom-2 w-[1px] bg-[#141414]/[0.08] -z-10" />

          {STORY_CHAPTERS.map((chap) => {
            const isActive = activeChapter === chap.id;
            const isHovered = hoveredChapter === chap.id;

            if (chap.isExternal) {
              return (
                <div key={chap.id} className="relative group">
                  <Link
                    href={chap.href || "/"}
                    onMouseEnter={() => setHoveredChapter(chap.id)}
                    onMouseLeave={() => setHoveredChapter(null)}
                    className="relative size-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#8E909A] hover:text-[#5B4BFF] hover:bg-[#EEEBFF]/70 transition-all duration-200"
                    title="Chapter 00 · Enter Platform"
                  >
                    <span>{chap.number}</span>
                  </Link>

                  {/* Tooltip on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#171719] text-white px-3 py-1.5 rounded-xl text-right shadow-xl pointer-events-none z-50"
                      >
                        <p className="text-[10px] font-bold tracking-wider text-[#EEEBFF]">
                          {chap.number} · {chap.title}
                        </p>
                        <p className="text-[9px] text-[#8E909A]">{chap.subtitle}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <div key={chap.id} className="relative group">
                <button
                  type="button"
                  onClick={() => scrollToChapter(chap.id)}
                  onMouseEnter={() => setHoveredChapter(chap.id)}
                  onMouseLeave={() => setHoveredChapter(null)}
                  className={`relative size-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#171719] text-white shadow-md shadow-[#171719]/25 scale-110"
                      : "text-[#8E909A] hover:text-[#171719] hover:bg-[#F6F4EF]"
                  }`}
                  aria-label={`Chapter ${chap.number}: ${chap.title}`}
                >
                  {/* Subtle active glow ring */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStoryGlow"
                      className="absolute -inset-1 rounded-xl bg-[#5B4BFF]/20 -z-10 animate-pulse"
                    />
                  )}
                  <span>{chap.number}</span>
                </button>

                {/* Floating Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#171719] text-white px-3 py-1.5 rounded-xl text-right shadow-xl pointer-events-none z-50 border border-white/10"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="size-1.5 rounded-full bg-[#5B4BFF]" />
                        <p className="text-[10px] font-bold tracking-wider text-[#FFFFFF]">
                          {chap.number} · {chap.title}
                        </p>
                      </div>
                      <p className="text-[9px] text-[#A0A2AC] mt-0.5">{chap.subtitle}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
