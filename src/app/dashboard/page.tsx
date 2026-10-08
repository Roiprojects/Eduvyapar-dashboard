"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EditorialHero from "@/components/dashboard/EditorialHero";
import EditorialKpiCards from "@/components/dashboard/EditorialKpiCards";
import AdmissionsOverviewChart from "@/components/dashboard/AdmissionsOverviewChart";
import StatusDonut3D from "@/components/dashboard/StatusDonut3D";
import RecentApplicationsCard, { applicantsData } from "@/components/dashboard/RecentApplicationsCard";
import RevenueOverviewCard from "@/components/dashboard/RevenueOverviewCard";
import QuickActionsBar from "@/components/dashboard/QuickActionsBar";
import ApplicationDetailPanel, { defaultStudent, type StudentDetail } from "@/components/dashboard/ApplicationDetailPanel";
import InvestingInPeopleCard from "@/components/dashboard/InvestingInPeopleCard";
import CandidateSnapshotCard from "@/components/dashboard/CandidateSnapshotCard";
import ModulesShowcaseStory from "@/components/dashboard/ModulesShowcaseStory";
import ImmersiveDossierStory from "@/components/dashboard/ImmersiveDossierStory";
import ClosingStoryChapter from "@/components/dashboard/ClosingStoryChapter";
import StoryIndicator from "@/components/dashboard/StoryIndicator";
import { ChevronRight, Layers, Sparkles, Building2 } from "lucide-react";

export default function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail>(defaultStudent);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleSelectStudent = (student: StudentDetail) => {
    setSelectedStudent(student);
    setPanelOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* ── Story Mode Vertical Indicator (Right Rail) ── */}
      <StoryIndicator />

      {/* ── Main Workspace Dashboard Content ── */}
      <div className="flex flex-col xl:flex-row items-start gap-6 lg:gap-8">
        <div className="flex-1 min-w-0 space-y-12 transition-all duration-300 pb-16">
          {/* ══════════════════════════════════════════════════════
              CHAPTER 01 · VISION (Hero Architecture)
             ══════════════════════════════════════════════════════ */}
          <EditorialHero />

          {/* ══════════════════════════════════════════════════════
              CHAPTER 02 · PEOPLE (Key Metrics & Campus Vitality)
             ══════════════════════════════════════════════════════ */}
          <EditorialKpiCards />

          {/* ══════════════════════════════════════════════════════
              CHAPTER 03 · APPLICATIONS & INTELLIGENCE (Analytics)
             ══════════════════════════════════════════════════════ */}
          <section id="chapter-applications" className="relative scroll-mt-24 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF] mb-2">
                  <Sparkles size={12} />
                  <span>03 · APPLICATIONS &amp; ANALYTICS</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight leading-tight">
                  Admissions Intelligence &amp; Capital Velocity
                </h2>
                <p className="text-xs sm:text-sm text-[#6F7077] mt-0.5">
                  Multi-dimensional data visualization in an elegant architectural composition.
                </p>
              </div>
            </div>

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

            {/* Revenue Overview & Architectural "Investing In People" Slice */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              <div className="lg:col-span-8 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]">
                <RevenueOverviewCard />
              </div>

              <div className="lg:col-span-4">
                <InvestingInPeopleCard />
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════
              CHAPTER 04 · OPERATIONS & RECENT ACTIVITY
             ══════════════════════════════════════════════════════ */}
          <section id="chapter-operations" className="relative scroll-mt-24 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF] mb-2">
                  <Sparkles size={12} />
                  <span>04 · RECENT ACTIVITY &amp; OPERATIONS</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171719] tracking-tight leading-tight">
                  Operations &amp; Immediate Intake
                </h2>
                <p className="text-xs sm:text-sm text-[#6F7077] mt-0.5">
                  Live institutional updates, candidate queue, and high-priority administrative actions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Recent Applications (lg:col-span-4) */}
              <div className="lg:col-span-4 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)]">
                <RecentApplicationsCard
                  onSelectStudent={handleSelectStudent}
                  selectedStudentId={selectedStudent.id}
                />
              </div>

              {/* Quick Actions Strip (lg:col-span-4) */}
              <div className="lg:col-span-4 rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-6 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
                      Command Actions
                    </h3>
                    <p className="text-xs text-[#6F7077] mt-0.5">
                      Direct executive shortcuts for active workflows
                    </p>
                  </div>
                  <QuickActionsBar />
                </div>
              </div>

              {/* Candidate Snapshot Preview (lg:col-span-4) */}
              <div className="lg:col-span-4">
                <CandidateSnapshotCard
                  student={selectedStudent}
                  onOpenDossier={() => setPanelOpen(true)}
                />
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════
              CHAPTER 05 · MODULES SHOWCASE (One Platform. Every Possibility)
             ══════════════════════════════════════════════════════ */}
          <ModulesShowcaseStory />

          {/* ══════════════════════════════════════════════════════
              CHAPTER 06 · IMMERSIVE DETAIL & VERIFIED LEDGER
             ══════════════════════════════════════════════════════ */}
          <ImmersiveDossierStory
            selectedStudent={selectedStudent}
            onSelectStudent={handleSelectStudent}
          />

          {/* ══════════════════════════════════════════════════════
              CHAPTER 07 · CLOSING & SOVEREIGN FUTURE
             ══════════════════════════════════════════════════════ */}
          <ClosingStoryChapter />
        </div>

        {/* ── Slide-Over Spatial Dossier Panel ── */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              key="application-detail-panel"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="w-full xl:w-auto xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-104px)] z-40"
            >
              <div className="rounded-3xl border border-[#141414]/[0.08] bg-[#FFFFFF] overflow-hidden shadow-[0_20px_60px_-12px_rgba(20,20,20,0.12)]">
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

      {/* Floating Toggle Button for Dossier when Closed */}
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
    </div>
  );
}
