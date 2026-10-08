"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  Send,
  Users,
} from "lucide-react";
import { demoStudents } from "@/lib/mockData";

export default function StudentAttendancePage() {
  const [selectedBatch, setSelectedBatch] = useState("1Yr Fitter (Section A)");
  const [attendanceDate, setAttendanceDate] = useState("2026-10-08");
  const [records, setRecords] = useState(
    demoStudents.map((s) => ({
      ...s,
      todayStatus: s.attendance < 75 ? "Absent" : "Present",
    }))
  );

  const toggleStatus = (id: string, newStatus: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, todayStatus: newStatus } : r))
    );
  };

  const presentCount = records.filter((r) => r.todayStatus === "Present").length;
  const absentCount = records.filter((r) => r.todayStatus === "Absent").length;

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF8F1] text-[#279B63] text-xs font-bold tracking-wide uppercase mb-2">
            <CalendarCheck2 size={13} />
            <span>Biometric Registry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Cohort Daily Attendance Register
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Real-time biometric checkpoint verification, statutory attendance thresholds, and automated SMS alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] text-xs font-semibold text-[#171719] outline-none shadow-xs"
          />
          <button
            type="button"
            onClick={() => alert("Biometric batch lock confirmed! Attendance pushed to institutional cloud ledger.")}
            className="px-4 py-2.5 rounded-xl bg-[#171719] hover:bg-[#5B4BFF] text-white text-xs font-bold shadow-md transition-all"
          >
            Commit &amp; Lock Session
          </button>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-5 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Cohort Strength
          </span>
          <p className="font-serif text-3xl font-bold text-[#171719] mt-1">
            {records.length} Students
          </p>
          <span className="text-[11px] text-[#6F7077] mt-1 block">
            {selectedBatch}
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-5 shadow-xs">
          <span className="text-[11px] font-bold text-[#35B779] uppercase tracking-wider block">
            Present on Campus
          </span>
          <p className="font-serif text-3xl font-bold text-[#35B779] mt-1">
            {presentCount} ({Math.round((presentCount / records.length) * 100)}%)
          </p>
          <span className="text-[11px] text-[#35B779] mt-1 block">
            Biometric gate verified
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-5 shadow-xs">
          <span className="text-[11px] font-bold text-[#E45D5D] uppercase tracking-wider block">
            Unexcused Absentees
          </span>
          <p className="font-serif text-3xl font-bold text-[#E45D5D] mt-1">
            {absentCount} Students
          </p>
          <button
            type="button"
            onClick={() => alert(`Parent automated notification dispatched to ${absentCount} guardians via SMS gateway.`)}
            className="mt-2 text-xs font-bold text-[#5B4BFF] hover:underline inline-flex items-center gap-1"
          >
            <Send size={11} />
            <span>Notify Guardians Now</span>
          </button>
        </div>
      </div>

      {/* ── Attendance Roster Table ── */}
      <div className="rounded-2xl border border-[#141414]/[0.06] bg-white overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#141414]/[0.06] bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#171719]">Class Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-white border border-[#141414]/[0.08] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#171719] outline-none"
            >
              <option value="1Yr Fitter (Section A)">1Yr Fitter (Section A)</option>
              <option value="1Yr Fitter (Section B)">1Yr Fitter (Section B)</option>
              <option value="1Yr Electrician (Section A)">1Yr Electrician (Section A)</option>
              <option value="1Yr Welder (Section A)">1Yr Welder (Section A)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setRecords((prev) => prev.map((r) => ({ ...r, todayStatus: "Present" })))}
              className="px-3 py-1 rounded-lg bg-[#EAF8F1] text-[#279B63] font-bold hover:bg-[#d5f3e2] transition"
            >
              Mark All Present
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#141414]/[0.06] text-[#6F7077] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Student &amp; Roll</th>
                <th className="py-3 px-4">Cumulative %</th>
                <th className="py-3 px-4">Alert Level</th>
                <th className="py-3 px-4">Today's Checkpoint</th>
                <th className="py-3 px-4 text-right">Quick Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.04]">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-[#FBF9F5] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-8 rounded-full overflow-hidden border border-[#141414]/[0.08] shrink-0">
                        <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-[#171719] block">{r.name}</span>
                        <span className="text-[10px] text-[#8E909A] font-mono">{r.rollNo}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-[#171719]">{r.attendance}%</span>
                  </td>

                  <td className="py-3 px-4">
                    {r.attendance < 75 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF0F0] text-[#D83B3B]">
                        <AlertTriangle size={11} />
                        Defaulter (&lt;75%)
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#35B779] font-medium">Compliant</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        r.todayStatus === "Present"
                          ? "bg-[#EAF8F1] text-[#279B63]"
                          : "bg-[#FDF0F0] text-[#D83B3B]"
                      }`}
                    >
                      {r.todayStatus === "Present" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {r.todayStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1 bg-[#F6F4EF] p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => toggleStatus(r.id, "Present")}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                          r.todayStatus === "Present"
                            ? "bg-[#35B779] text-white shadow-xs"
                            : "text-[#6F7077] hover:text-[#171719]"
                        }`}
                      >
                        P
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(r.id, "Absent")}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                          r.todayStatus === "Absent"
                            ? "bg-[#E45D5D] text-white shadow-xs"
                            : "text-[#6F7077] hover:text-[#171719]"
                        }`}
                      >
                        A
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
