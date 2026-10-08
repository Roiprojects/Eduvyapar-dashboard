"use client";

import { useState } from "react";
import {
  UserCheck,
  Search,
  Phone,
  Mail,
  GraduationCap,
  Clock,
  CheckCircle2,
  Calendar,
  Plus,
} from "lucide-react";
import { demoFaculty } from "@/lib/mockData";

export default function FacultyPage() {
  const [search, setSearch] = useState("");

  const filtered = demoFaculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase()) ||
      f.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2">
            <UserCheck size={13} />
            <span>Academic Faculty</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Faculty &amp; Instructional Staff
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Verified master trainers, teaching workloads, workshop invigilation periods, and attendance status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("Rebalance teaching periods across departments...")}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-xs font-bold text-[#171719] shadow-xs transition"
          >
            Rebalance Workload
          </button>
          <button
            type="button"
            onClick={() => alert("Add Instructor Modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition"
          >
            <Plus size={14} className="inline mr-1" />
            <span>Add Instructor</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E909A]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by instructor name, role, or trade department..."
          className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.08] outline-none focus:border-[#5B4BFF] shadow-xs transition"
        />
      </div>

      {/* ── Faculty Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((faculty) => {
          const workloadPct = Math.round((faculty.workload / faculty.maxWorkload) * 100);

          return (
            <div
              key={faculty.id}
              className="rounded-3xl bg-white border border-[#141414]/[0.07] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#171719] group-hover:text-[#5B4BFF] transition-colors">
                      {faculty.name}
                    </h3>
                    <span className="text-xs text-[#5B4BFF] font-semibold block mt-0.5">
                      {faculty.role}
                    </span>
                    <span className="text-[11px] text-[#8E909A] block">
                      {faculty.department} · {faculty.experience} Experience
                    </span>
                  </div>

                  <span
                    className={`inline-block size-3 rounded-full shrink-0 ${
                      faculty.status === "Active on Campus"
                        ? "bg-[#35B779]"
                        : faculty.status === "In Workshop Session"
                        ? "bg-[#5B4BFF]"
                        : "bg-[#E6A23C]"
                    }`}
                    title={faculty.status}
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-[#141414]/[0.05] space-y-2 text-xs text-[#6F7077]">
                  <p className="text-[11px] text-[#171719] font-medium">
                    🎓 {faculty.qualification}
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-[#8E909A]" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-[#8E909A]" />
                    <span>{faculty.email}</span>
                  </div>
                </div>

                {/* Workload Indicator */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8E909A]">Teaching Load:</span>
                    <span className="font-bold text-[#171719]">
                      {faculty.workload} / {faculty.maxWorkload} Periods/Wk
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#141414]/[0.05] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        workloadPct >= 90
                          ? "bg-[#E6A23C]"
                          : "bg-[#35B779]"
                      }`}
                      style={{ width: `${workloadPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#8E909A] block text-right">
                    {faculty.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#141414]/[0.05] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert(`Opening timetable ledger for ${faculty.name}...`)}
                  className="text-xs font-bold text-[#5B4BFF] hover:underline"
                >
                  View Timetable
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Submitting leave authorization for ${faculty.name}...`)}
                  className="text-xs text-[#6F7077] hover:text-[#171719]"
                >
                  Log Leave
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
