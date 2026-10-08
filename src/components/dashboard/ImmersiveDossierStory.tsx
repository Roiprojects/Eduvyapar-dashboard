"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  AlertCircle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Eye,
  MoreVertical,
} from "lucide-react";
import type { StudentDetail } from "./ApplicationDetailPanel";
import { applicantsData } from "./RecentApplicationsCard";

export default function ImmersiveDossierStory({
  selectedStudent,
  onSelectStudent,
}: {
  selectedStudent: StudentDetail;
  onSelectStudent: (student: StudentDetail) => void;
}) {
  return (
    <section id="chapter-dossier" className="relative scroll-mt-24 space-y-5">
      {/* Chapter Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-xs text-xs font-bold text-[#5B4BFF] mb-2">
            <Sparkles size={12} />
            <span>06 · IMMERSIVE DETAIL &amp; DOSSIER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight leading-tight">
            Every Application A Story.
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7077] mt-1 max-w-xl">
            Behind every matriculation ID is an individual journey. Select any candidate record below to inspect their full institutional dossier, payment ledger, and verified timeline.
          </p>
        </div>

        <Link
          href="/dashboard/preadmission"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#141414]/[0.08] text-xs font-bold text-[#171719] hover:bg-[#5B4BFF] hover:text-white hover:border-[#5B4BFF] shadow-xs transition"
        >
          <span>Open Full Registry</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Main Ledger Table Card */}
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] overflow-hidden shadow-[0_12px_36px_-6px_rgba(20,20,20,0.05)]">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-[#141414]/[0.06] bg-[#FBFAF7]/70">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-base font-bold text-[#171719]">
              Verified Candidate Records
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-[10px] font-extrabold">
              5 Active In View
            </span>
          </div>
          <span className="text-xs text-[#8E909A]">
            Real-time synchronization with Central Admissions Gateway
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#141414]/[0.06] text-[11px] font-bold text-[#8E909A] tracking-wider uppercase bg-[#FFFFFF]">
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Course</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.05] text-xs">
              {applicantsData.map((item) => {
                const isSelected = selectedStudent.id === item.id;

                return (
                  <motion.tr
                    key={item.id}
                    onClick={() => onSelectStudent(item)}
                    whileHover={{ backgroundColor: "rgba(246, 244, 239, 0.7)" }}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#EEEBFF]/50 hover:bg-[#EEEBFF]/70"
                        : "hover:bg-[#FBFAF7]"
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-6 font-mono text-[11px] font-bold text-[#5B4BFF]">
                      {item.id}
                    </td>

                    {/* Student */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-8 rounded-full overflow-hidden border border-white shadow-xs shrink-0">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#171719] leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#8E909A] font-normal">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 font-medium text-[#171719]">
                      {item.course}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#6F7077]">
                      {item.appliedDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === "Approved"
                            ? "bg-[#EAF8F1] text-[#279B63]"
                            : item.status === "Pending"
                            ? "bg-[#FDF6EA] text-[#C27E16]"
                            : item.status === "Under Review"
                            ? "bg-[#EEEBFF] text-[#5B4BFF]"
                            : "bg-[#FDEDED] text-[#D94242]"
                        }`}
                      >
                        {item.status === "Approved" && <Check size={10} strokeWidth={3} />}
                        {item.status === "Pending" && <Clock size={10} strokeWidth={2.5} />}
                        {item.status === "Under Review" && <AlertCircle size={10} strokeWidth={2.5} />}
                        {item.status === "Rejected" && <X size={10} strokeWidth={3} />}
                        {item.status}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                          item.amountPaid === item.totalFees && item.amountPaid !== "₹0"
                            ? "bg-[#EAF8F1] text-[#279B63]"
                            : item.amountPaid !== "₹0" && item.amountPaid !== "—"
                            ? "bg-[#FDF6EA] text-[#C27E16]"
                            : "bg-[#F6F4EF] text-[#8E909A]"
                        }`}
                      >
                        {item.amountPaid === item.totalFees && item.amountPaid !== "₹0"
                          ? "Paid"
                          : item.amountPaid !== "₹0" && item.amountPaid !== "—"
                          ? "Partial"
                          : "Pending"}
                        <span className="text-[9px] opacity-75">({item.amountPaid})</span>
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="py-3.5 px-4 text-[#6F7077] font-medium">
                      {item.assignedTo}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(item);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                          isSelected
                            ? "bg-[#5B4BFF] text-white shadow-sm"
                            : "bg-[#FBFAF7] text-[#171719] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] border border-[#141414]/[0.06]"
                        }`}
                      >
                        <span>Inspect</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
