"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Bell, Command } from "lucide-react";
import CommandPalette from "./CommandPalette";

export default function Header() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 py-3.5 bg-[#F6F4EF]/80 backdrop-blur-md border-b border-[#141414]/[0.05]">
        {/* Date Display */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#171719] tracking-tight">
            October 08, 2026
          </span>
          <span className="text-[11px] text-[#6F7077] font-normal">
            Wednesday
          </span>
        </div>

        {/* Global Command Search Center Bar */}
        <div className="flex-1 max-w-xl mx-4 lg:mx-8">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.08] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] text-[#6F7077] hover:text-[#171719] hover:border-[#141414]/[0.15] transition group text-left"
          >
            <Search size={15} className="text-[#8E909A] group-hover:text-[#5B4BFF] transition-colors" />
            <span className="text-xs font-normal flex-1 truncate">
              Search students, applications, courses...
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F6F4EF] border border-[#141414]/[0.06] text-[10px] font-medium text-[#6F7077]">
              <span>⌘</span>
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Status dot */}
          <div className="size-2 rounded-full bg-[#E6A23C] ring-4 ring-[#E6A23C]/20" title="System Operational" />

          {/* Notifications */}
          <button
            type="button"
            className="relative size-9 rounded-full bg-white border border-[#141414]/[0.07] flex items-center justify-center text-[#55565D] hover:text-[#171719] hover:shadow-sm transition"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#E45D5D]" />
          </button>

          {/* User Avatar */}
          <div className="relative size-9 rounded-full overflow-hidden border border-[#141414]/[0.1] shadow-sm cursor-pointer hover:ring-2 hover:ring-[#5B4BFF]/30 transition">
            <Image
              src="/images/student-rahul.jpg"
              alt="Admin Profile"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
