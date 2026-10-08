"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  FileText,
  Download,
  Plus,
  Search,
  Award,
} from "lucide-react";
import { demoCourses } from "@/lib/mockData";

export default function AcademicsPage() {
  const [search, setSearch] = useState("");

  const filtered = demoCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.trade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2">
            <BookOpen size={13} />
            <span>Curricular Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Curriculum &amp; Course Syllabi
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            National Skills Qualification Framework (NSQF) aligned trade curricula, instructional pacing, and lab hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/academics/examinations"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-xs font-bold text-[#171719] shadow-xs transition"
          >
            <span>View Exam Schedules →</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("Curriculum update modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition"
          >
            <Plus size={14} className="inline mr-1" />
            <span>Add Course Module</span>
          </button>
        </div>
      </div>

      {/* ── Metric Highlights ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Accredited Courses
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            {demoCourses.length} Active
          </p>
          <span className="text-[11px] text-[#35B779] font-medium mt-1 inline-block">
            NSQF Level 4 &amp; 5
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Total Enrolments
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            376 Seats
          </p>
          <span className="text-[11px] text-[#5B4BFF] font-medium mt-1 inline-block">
            Across 5 Academic Labs
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Pacing Status
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#35B779] mt-1">
            94% On Track
          </p>
          <span className="text-[11px] text-[#35B779] font-medium mt-1 inline-block">
            DGT Academic Calendar
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Next DGT Assessment
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            14 Nov 2026
          </p>
          <span className="text-[11px] text-[#8E909A] font-medium mt-1 inline-block">
            Practical Trade Test
          </span>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E909A]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses by code, title, or trade..."
          className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.08] outline-none focus:border-[#5B4BFF] shadow-xs transition"
        />
      </div>

      {/* ── Courses Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => {
          const progressPercent = Math.round((course.modulesCompleted / course.totalModules) * 100);

          return (
            <div
              key={course.id}
              className="rounded-3xl bg-white border border-[#141414]/[0.07] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#5B4BFF]/30 transition group"
            >
              <div>
                {/* Top Code & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#FBFAF7] border border-[#141414]/[0.06] font-mono text-[10px] font-bold text-[#5B4BFF]">
                    {course.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      course.syllabusStatus === "Ahead"
                        ? "bg-[#EAF8F1] text-[#279B63]"
                        : "bg-[#EEEBFF] text-[#5B4BFF]"
                    }`}
                  >
                    {course.syllabusStatus}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#171719] group-hover:text-[#5B4BFF] transition-colors leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#6F7077] mt-1">{course.trade}</p>

                {/* Instructor & Credits */}
                <div className="mt-4 pt-4 border-t border-[#141414]/[0.05] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#6F7077]">
                    <span>Instructor:</span>
                    <span className="font-semibold text-[#171719]">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#6F7077]">
                    <span>Enrolled Strength:</span>
                    <span className="font-semibold text-[#171719]">{course.enrolledCount} Trainees</span>
                  </div>
                  <div className="flex items-center justify-between text-[#6F7077]">
                    <span>Next Examination:</span>
                    <span className="font-semibold text-[#5B4BFF]">{course.nextExam}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8E909A] font-medium">Syllabus Completion</span>
                    <span className="font-bold text-[#171719]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#141414]/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5B4BFF] to-[#818CF8]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8E909A] block text-right">
                    {course.modulesCompleted} / {course.totalModules} Units Delivered
                  </span>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-5 pt-4 border-t border-[#141414]/[0.05] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert(`Downloading DGT certified syllabus for ${course.title}...`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B4BFF] hover:underline"
                >
                  <Download size={13} />
                  <span>Syllabus PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Opening lecture plan ledger for ${course.code}...`)}
                  className="text-xs font-semibold text-[#6F7077] hover:text-[#171719]"
                >
                  Lesson Plans →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
