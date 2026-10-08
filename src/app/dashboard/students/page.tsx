"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  GraduationCap,
  X,
  ArrowUpDown,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { demoStudents, type StudentRecord } from "@/lib/mockData";

export default function StudentsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [sortField, setSortField] = useState<"name" | "attendance" | "cgpa">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const trades = ["All", "1Yr Fitter", "1Yr Electrician", "1Yr Welder"];
  const statuses = ["All", "Active", "Defaulter"];

  const filteredStudents = useMemo(() => {
    return demoStudents
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
          s.trade.toLowerCase().includes(search.toLowerCase());
        const matchesTrade = selectedTrade === "All" || s.trade.includes(selectedTrade);
        const matchesStatus = selectedStatus === "All" || s.status === selectedStatus;
        return matchesSearch && matchesTrade && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === "name") {
          return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        if (sortField === "attendance") {
          return sortAsc ? a.attendance - b.attendance : b.attendance - a.attendance;
        }
        if (sortField === "cgpa") {
          return sortAsc ? a.cgpa - b.cgpa : b.cgpa - a.cgpa;
        }
        return 0;
      });
  }, [search, selectedTrade, selectedStatus, sortField, sortAsc]);

  return (
    <div className="space-y-8 pb-16">
      {/* ── Editorial Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2">
            <GraduationCap size={13} />
            <span>Academic Registry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Student Master Directory
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Centralized biometric ledger, academic cohorts, verified credentials, and fee clearance status.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/preadmission/intake"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition-all hover:scale-102"
          >
            <Plus size={15} />
            <span>Enroll Student</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("Exporting student ledger as CSV/Excel...")}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-[#171719] text-xs font-semibold shadow-xs transition"
          >
            <FileSpreadsheet size={15} className="text-[#35B779]" />
            <span className="hidden sm:inline">Export Ledger</span>
          </button>
        </div>
      </div>

      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Total Enrolled
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            {demoStudents.length} Students
          </p>
          <span className="text-[11px] text-[#35B779] font-medium mt-1 inline-block">
            ● 100% Biometric Synchronized
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Avg Attendance
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            89.6%
          </p>
          <span className="text-[11px] text-[#5B4BFF] font-medium mt-1 inline-block">
            Above DGT Mandate (80%)
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Fee Clearance Rate
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            87.5%
          </p>
          <span className="text-[11px] text-[#35B779] font-medium mt-1 inline-block">
            ₹1.88L Settled
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Attendance Alerts
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#E45D5D] mt-1">
            1 Defaulter
          </p>
          <span className="text-[11px] text-[#E45D5D] font-medium mt-1 inline-block">
            Karan Singh (&lt; 75%)
          </span>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#141414]/[0.06] shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E909A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or trade..."
            className="w-full bg-[#FBFAF7] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.05] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Trade Filter */}
          <div className="flex items-center gap-1 bg-[#FBFAF7] px-2 py-1 rounded-xl border border-[#141414]/[0.05]">
            <span className="text-[11px] font-medium text-[#6F7077] pl-1">Trade:</span>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#171719] outline-none cursor-pointer py-1 pr-2"
            >
              {trades.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-[#FBFAF7] px-2 py-1 rounded-xl border border-[#141414]/[0.05]">
            <span className="text-[11px] font-medium text-[#6F7077] pl-1">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#171719] outline-none cursor-pointer py-1 pr-2"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Student Records Table ── */}
      <div className="rounded-2xl border border-[#141414]/[0.06] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#141414]/[0.06] text-[#6F7077] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Student &amp; Roll No</th>
                <th className="py-3.5 px-4">Trade &amp; Batch</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-[#171719]" onClick={() => { setSortField("attendance"); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Attendance</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-[#171719]" onClick={() => { setSortField("cgpa"); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>CGPA</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-4">Fee Clearance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.04]">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-[#FBF9F5] transition group cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  {/* Student & Roll */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded-full overflow-hidden border border-[#141414]/[0.08] shrink-0 bg-[#EEEBFF]">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#171719] block group-hover:text-[#5B4BFF] transition-colors">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-[#8E909A] font-mono">
                          {student.rollNo}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Trade */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-[#171719] block">
                      {student.trade}
                    </span>
                    <span className="text-[10px] text-[#8E909A]">
                      Batch {student.batch}
                    </span>
                  </td>

                  {/* Attendance */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-[#141414]/[0.06] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.attendance >= 85
                              ? "bg-[#35B779]"
                              : student.attendance >= 75
                              ? "bg-[#E6A23C]"
                              : "bg-[#E45D5D]"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#171719]">
                        {student.attendance}%
                      </span>
                    </div>
                  </td>

                  {/* CGPA */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EEEBFF] text-[#5B4BFF] font-bold text-xs">
                      {student.cgpa} / 10
                    </span>
                  </td>

                  {/* Fee Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        student.feeStatus === "Paid"
                          ? "bg-[#EAF8F1] text-[#279B63]"
                          : student.feeStatus === "Partial"
                          ? "bg-[#FFF8E6] text-[#B8820B]"
                          : "bg-[#FDF0F0] text-[#D83B3B]"
                      }`}
                    >
                      {student.feeStatus === "Paid" && <CheckCircle2 size={11} />}
                      {student.feeStatus === "Overdue" && <AlertTriangle size={11} />}
                      <span>{student.feeStatus}</span>
                      <span className="text-[10px] opacity-75">
                        (₹{student.feePaid.toLocaleString()})
                      </span>
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block size-2 rounded-full mr-1.5 ${
                        student.status === "Active" ? "bg-[#35B779]" : "bg-[#E45D5D]"
                      }`}
                    />
                    <span className="font-medium text-[#171719]">
                      {student.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(student);
                      }}
                      className="p-1.5 rounded-lg text-[#6F7077] hover:text-[#5B4BFF] hover:bg-[#EEEBFF] transition"
                      title="Inspect Student Profile"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Slide-over Profile Drawer / Dossier Modal ── */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#141414]/[0.08] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#8E909A] hover:text-[#171719] hover:bg-[#F6F4EF] transition"
              >
                <X size={18} />
              </button>

              {/* Dossier Header */}
              <div className="flex items-start gap-4 pb-6 border-b border-[#141414]/[0.06]">
                <div className="relative size-16 rounded-2xl overflow-hidden border border-[#141414]/[0.1] shadow-md shrink-0">
                  <Image
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl font-bold text-[#171719]">
                      {selectedStudent.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF8F1] text-[#279B63]">
                      {selectedStudent.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F7077] mt-0.5">
                    Roll: <span className="font-mono text-[#171719] font-bold">{selectedStudent.rollNo}</span> · Enrolled on {selectedStudent.enrolledDate}
                  </p>
                  <p className="text-xs text-[#5B4BFF] font-semibold mt-1">
                    {selectedStudent.trade} · Batch {selectedStudent.batch}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
                <div className="p-3.5 rounded-2xl bg-[#FBFAF7] border border-[#141414]/[0.05]">
                  <span className="text-[10px] font-bold text-[#8E909A] uppercase tracking-wider block">
                    Contact Coordinates
                  </span>
                  <div className="mt-2 space-y-1.5 text-xs text-[#171719]">
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-[#5B4BFF]" />
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-[#5B4BFF]" />
                      <span>{selectedStudent.email}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBFAF7] border border-[#141414]/[0.05]">
                  <span className="text-[10px] font-bold text-[#8E909A] uppercase tracking-wider block">
                    Parent / Guardian
                  </span>
                  <p className="text-xs font-semibold text-[#171719] mt-2">
                    {selectedStudent.guardian}
                  </p>
                  <span className="text-[11px] text-[#6F7077] block mt-0.5">
                    Verified Sovereign KYC on File
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBFAF7] border border-[#141414]/[0.05]">
                  <span className="text-[10px] font-bold text-[#8E909A] uppercase tracking-wider block">
                    Attendance Ledger
                  </span>
                  <p className="font-serif text-xl font-bold text-[#171719] mt-1">
                    {selectedStudent.attendance}%
                  </p>
                  <span className="text-[11px] text-[#35B779]">
                    182 / 196 Sessions Attended
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBFAF7] border border-[#141414]/[0.05]">
                  <span className="text-[10px] font-bold text-[#8E909A] uppercase tracking-wider block">
                    Treasury Status
                  </span>
                  <p className="font-serif text-xl font-bold text-[#171719] mt-1">
                    ₹{selectedStudent.feePaid.toLocaleString()} / ₹{selectedStudent.feeTotal.toLocaleString()}
                  </p>
                  <span className={`text-[11px] font-semibold ${selectedStudent.feeStatus === "Paid" ? "text-[#35B779]" : "text-[#E45D5D]"}`}>
                    Status: {selectedStudent.feeStatus}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#141414]/[0.06]">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl bg-[#F6F4EF] hover:bg-[#eae8e2] text-xs font-bold text-[#171719] transition"
                >
                  Close Dossier
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Generating institutional ID card and certificate for ${selectedStudent.name}...`)}
                  className="px-4 py-2 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-xs font-bold text-white shadow-md shadow-[#5B4BFF]/20 transition"
                >
                  Generate ID Badge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
