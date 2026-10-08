"use client";

import { useState } from "react";
import EditorialHero from "@/components/dashboard/EditorialHero";
import EditorialKpiCards from "@/components/dashboard/EditorialKpiCards";
import AdmissionsOverviewChart from "@/components/dashboard/AdmissionsOverviewChart";
import StatusDonut3D from "@/components/dashboard/StatusDonut3D";
import RecentApplicationsCard, { applicantsData } from "@/components/dashboard/RecentApplicationsCard";
import RevenueOverviewCard from "@/components/dashboard/RevenueOverviewCard";
import CampusPavilionCard from "@/components/dashboard/CampusPavilionCard";
import QuickActionsBar from "@/components/dashboard/QuickActionsBar";
import ApplicationDetailPanel, { defaultStudent, type StudentDetail } from "@/components/dashboard/ApplicationDetailPanel";
import { Sparkles, X, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail>(defaultStudent);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleSelectStudent = (student: StudentDetail) => {
    setSelectedStudent(student);
    setPanelOpen(true);
  };

  return (
    <div className="relative flex flex-col xl:flex-row items-start gap-6 lg:gap-8">
      {/* Main Workspace Dashboard Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* 1. Hero Section */}
        <EditorialHero />

        {/* 2. 5 Editorial KPI Cards */}
        <EditorialKpiCards />

        {/* 3. Middle Section: Admissions Overview & Application Status (3D Donut) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Admissions Overview Chart (lg:col-span-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-5 shadow-sm">
            <AdmissionsOverviewChart />
          </div>

          {/* Application Status 3D Torus Donut (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
                Application Status
              </h3>
              <button
                type="button"
                className="text-[#8E909A] hover:text-[#171719] p-1 rounded-md transition"
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
          <div className="lg:col-span-4 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-5 shadow-sm">
            <RecentApplicationsCard
              onSelectStudent={handleSelectStudent}
              selectedStudentId={selectedStudent.id}
            />
          </div>

          {/* Revenue Overview (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-5 shadow-sm">
            <RevenueOverviewCard />
          </div>

          {/* Campus Pavilion Card (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <CampusPavilionCard />
          </div>
        </div>

        {/* 5. Quick Actions Strip */}
        <div className="pt-2">
          <QuickActionsBar />
        </div>
      </div>

      {/* Floating Toggle Button for Drawer on Smaller Screens when Closed */}
      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#171719] text-white text-xs font-semibold shadow-2xl hover:bg-[#5B4BFF] hover:scale-105 transition"
        >
          <span>Dossier: {selectedStudent.name}</span>
          <ChevronRight size={14} />
        </button>
      )}

      {/* 6. Spatial Application Details Slide-Over Panel */}
      {panelOpen && (
        <div className="w-full xl:w-auto xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-104px)]">
          <div className="rounded-3xl border border-[#141414]/[0.06] bg-[#FFFFFF] overflow-hidden shadow-sm">
            <ApplicationDetailPanel
              student={selectedStudent}
              isOpen={panelOpen}
              onClose={() => setPanelOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
