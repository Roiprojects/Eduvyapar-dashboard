"use client";

import {
  FileBarChart2,
  TrendingUp,
  Download,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Zap,
} from "lucide-react";

export default function ReportsAnalyticsPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2">
            <FileBarChart2 size={13} />
            <span>Executive Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Institutional Analytics &amp; Reports
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Statutory DGT compliance audits, industrial placement conversion rates, and revenue forecasting telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("Compiling Complete Statutory Institutional Annual Report (PDF)...")}
            className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition"
          >
            <Download size={14} className="inline mr-1.5" />
            <span>Download Annual Report</span>
          </button>
        </div>
      </div>

      {/* ── High-Level Analytics Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            DGT Accreditation Score
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#35B779] mt-2">
            4.8 / 5.0
          </p>
          <span className="text-xs text-[#35B779] mt-1 inline-flex items-center gap-1 font-medium">
            <CheckCircle2 size={12} />
            Grade A Institutional Rating
          </span>
        </div>

        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Placement Conversion
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5B4BFF] mt-2">
            92.4%
          </p>
          <span className="text-xs text-[#6F7077] mt-1 block">
            142 Students Placed in BHEL, L&amp;T
          </span>
        </div>

        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Annual Tuition Intake
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#171719] mt-2">
            ₹34.8L
          </p>
          <span className="text-xs text-[#35B779] mt-1 block">
            +18.4% YoY Institutional Growth
          </span>
        </div>

        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Average Starting Package
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#171719] mt-2">
            ₹2.85 LPA
          </p>
          <span className="text-xs text-[#5B4BFF] mt-1 block">
            Industrial Apprenticeship Track
          </span>
        </div>
      </div>

      {/* ── Statutory Audit Reports List ── */}
      <div className="rounded-3xl bg-white border border-[#141414]/[0.07] p-6 shadow-xs space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#171719]">
          Audited Statutory Disclosures &amp; Ledgers
        </h3>

        <div className="divide-y divide-[#141414]/[0.05]">
          {[
            {
              title: "DGT Compliance Dossier & Infrastructure Verification",
              period: "Academic Year 2025–26",
              status: "Certified & Filed",
              date: "04 Oct 2026",
              size: "4.2 MB",
            },
            {
              title: "Biometric Attendance & Defaulter Audit Register",
              period: "September 2026",
              status: "Verified",
              date: "01 Oct 2026",
              size: "1.8 MB",
            },
            {
              title: "Treasury Fee Reconciliation & Audit Trail",
              period: "Q2 Financial Session",
              status: "Reconciled",
              date: "30 Sep 2026",
              size: "3.5 MB",
            },
            {
              title: "Industry Apprenticeship & Campus Placement Dossier",
              period: "Batch 2024–25 Final",
              status: "Published",
              date: "24 Sep 2026",
              size: "6.1 MB",
            },
          ].map((report, idx) => (
            <div
              key={idx}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FBFAF7] px-2 rounded-xl transition"
            >
              <div>
                <span className="font-bold text-[#171719] text-sm block">
                  {report.title}
                </span>
                <span className="text-xs text-[#6F7077]">
                  {report.period} · Published on {report.date} · {report.size}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF8F1] text-[#279B63]">
                  {report.status}
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading verified document: ${report.title}...`)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F6F4EF] text-xs font-bold text-[#171719] shadow-xs transition inline-flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
