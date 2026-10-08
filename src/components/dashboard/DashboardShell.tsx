"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SceneLoader from "@/components/three/SceneLoader";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#171719] flex">
      {/* Three.js Subtle Ambient Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <SceneLoader />
      </div>

      {/* Left Vertical Architectural Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Workspace */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10 ${
          collapsed ? "lg:pl-[76px]" : "lg:pl-[240px] xl:pl-[252px]"
        }`}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
