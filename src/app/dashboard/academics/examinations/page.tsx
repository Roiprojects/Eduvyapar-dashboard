"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Plus,
  FileCheck2,
  ChevronRight,
  Filter,
} from "lucide-react";
import { demoExams } from "@/lib/mockData";

export default function ExaminationsPage() {
  const [filterType, setFilterType] = useState("All");

  const filtered = demoExams.filter(
    (e) => filterType === "All" || e.examType === filterType
  );

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] text-[#B8820B] text-xs font-bold tracking-wide uppercase mb-2">
            <Award size={13} />
            <span>Controller of Examinations (COE)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Examinations &amp; Trade Assessments
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Official All India Trade Test (AITT) practical evaluations, invigilation rosters, and hall ticket generation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("Schedule new internal test modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-[#171719] hover:bg-[#5B4BFF] text-white text-xs font-bold shadow-md transition-all"
          >
            <Plus size={14} className="inline mr-1" />
            <span>Schedule Examination</span>
          </button>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex items-center gap-2 border-b border-[#141414]/[0.06] pb-3">
        {["All", "Practical Viva", "Theory Examination", "Internal Assessment"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              filterType === tab
                ? "bg-[#171719] text-white"
                : "bg-white text-[#6F7077] hover:text-[#171719] border border-[#141414]/[0.06]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Examination Schedules List ── */}
      <div className="space-y-4">
        {filtered.map((exam) => (
          <div
            key={exam.id}
            className="rounded-3xl bg-white border border-[#141414]/[0.07] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#EEEBFF] text-[#5B4BFF] font-mono text-[10px] font-bold">
                  {exam.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.06] text-xs font-semibold text-[#171719]">
                  {exam.examType}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    exam.status === "Scheduled"
                      ? "bg-[#EAF8F1] text-[#279B63]"
                      : "bg-[#FFF8E6] text-[#B8820B]"
                  }`}
                >
                  ● {exam.status}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171719]">
                {exam.subject}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6F7077]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#5B4BFF]" />
                  <span className="font-semibold text-[#171719]">{exam.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#8E909A]" />
                  <span>{exam.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#8E909A]" />
                  <span>{exam.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-[#8E909A]" />
                  <span>{exam.registeredStudents} Candidates</span>
                </div>
              </div>

              <p className="text-xs text-[#8E909A]">
                Assessor / Invigilator: <span className="font-medium text-[#171719]">{exam.invigilator}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => alert(`Downloading Hall Tickets for ${exam.registeredStudents} candidates in ${exam.id}...`)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-xs font-bold text-[#171719] transition"
              >
                Hall Tickets PDF
              </button>
              <button
                type="button"
                onClick={() => alert(`Opening Marks Entry Sheet for ${exam.subject}...`)}
                className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-xs font-bold text-white shadow-md shadow-[#5B4BFF]/20 transition"
              >
                Marks Registry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
