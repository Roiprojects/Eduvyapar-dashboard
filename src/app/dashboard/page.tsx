"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EditorialHero from "@/components/dashboard/EditorialHero";
import EditorialKpiCards from "@/components/dashboard/EditorialKpiCards";
import AdmissionsOverviewChart from "@/components/dashboard/AdmissionsOverviewChart";
import StatusDonut3D from "@/components/dashboard/StatusDonut3D";
import RecentApplicationsCard, { applicantsData } from "@/components/dashboard/RecentApplicationsCard";
import RevenueOverviewCard from "@/components/dashboard/RevenueOverviewCard";
import CampusPavilionCard from "@/components/dashboard/CampusPavilionCard";
import QuickActionsBar from "@/components/dashboard/QuickActionsBar";
import ApplicationDetailPanel, { defaultStudent, type StudentDetail } from "@/components/dashboard/ApplicationDetailPanel";
import { ChevronRight, Layers, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail>(defaultStudent);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleSelectStudent = (student: StudentDetail) => {
    setSelectedStudent(student);
    setPanelOpen(true);
  };

  return (
    <div className="relative flex flex-col xl:flex-row items-start gap-6 lg:gap-8 min-h-[calc(100vh-120px)]">
      {/* ── Main Workspace Dashboard Content ── */}
      <motion.div
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="flex-1 min-w-0 space-y-6 transition-all duration-300"
      >
        {/* 1. Layered 2.5D/3D Spatial Hero Section */}
        <EditorialHero />

        {/* 2. Asymmetric Editorial KPI Objects */}
        <EditorialKpiCards />

        {/* 3. Middle Section: Dominant Analytics & 3D Status Torus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Admissions Overview Chart (lg:col-span-7) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]">
            <AdmissionsOverviewChart />
          </div>

          {/* Application Status 3D Torus Donut (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
                  Application Status
                </h3>
                <p className="text-xs text-[#6F7077] mt-0.5">
                  Real-time pipeline verification
                </p>
              </div>
              <button
                type="button"
                className="text-[#8E909A] hover:text-[#171719] p-1.5 rounded-lg hover:bg-[#F6F4EF] transition"
                title="Options"
              >
                ···
              </button>
            </div>
            <StatusDonut3D />
          </div>
        </div>

        {/* 4. Bottom Section: Recent Applications, Revenue Overview & Campus Pavilion Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Recent Applications (lg:col-span-4) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]">
            <RecentApplicationsCard
              onSelectStudent={handleSelectStudent}
              selectedStudentId={selectedStudent.id}
            />
          </div>

          {/* Revenue Overview (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]">
            <RevenueOverviewCard />
          </div>

          {/* Campus Pavilion Life Card (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <CampusPavilionCard />
          </div>
        </div>

        {/* 5. Quick Actions Strip */}
        <div className="pt-2">
          <QuickActionsBar />
        </div>
      </motion.div>

      {/* Floating Toggle Button for Dossier on Smaller Screens when Closed */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setPanelOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-[#171719] text-white text-xs font-semibold shadow-2xl hover:bg-[#5B4BFF] transition-colors"
          >
            <Layers size={15} className="text-[#EEEBFF]" />
            <span>Open Dossier: {selectedStudent.name}</span>
            <ChevronRight size={14} className="text-[#8E909A]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. Spatial Application Details Slide-Over Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="application-detail-panel"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full xl:w-auto xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-104px)] z-30"
          >
            <div className="rounded-3xl border border-[#141414]/[0.07] bg-[#FFFFFF] overflow-hidden shadow-[0_12px_36px_-6px_rgba(20,20,20,0.06)]">
              <ApplicationDetailPanel
                student={selectedStudent}
                isOpen={panelOpen}
                onClose={() => setPanelOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
