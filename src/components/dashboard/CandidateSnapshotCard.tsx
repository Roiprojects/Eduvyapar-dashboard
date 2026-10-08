"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, GraduationCap, Calendar, ShieldCheck } from "lucide-react";
import type { StudentDetail } from "./ApplicationDetailPanel";

export default function CandidateSnapshotCard({
  student,
  onOpenDossier,
}: {
  student: StudentDetail;
  onOpenDossier: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"Overview" | "Academic" | "Documents" | "Payments" | "Activity">("Overview");

  return (
    <div className="rounded-3xl bg-[#FFFFFF] border border-[#141414]/[0.07] p-5 shadow-[0_4px_24px_-4px_rgba(20,20,20,0.04)] flex flex-col justify-between h-full">
      <div>
        {/* Candidate Profile Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative size-12 sm:size-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <Image
                src={student.avatar}
                alt={student.name}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-[#171719] leading-tight">
                  {student.name}
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF8F1] text-[#279B63]">
                  <Check size={9} strokeWidth={3} />
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-[#6F7077] mt-0.5">
                {student.id} · <span className="font-semibold text-[#171719]">{student.course}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDossier}
            className="size-8 rounded-full bg-[#FBFAF7] hover:bg-[#5B4BFF] hover:text-white border border-[#141414]/[0.07] text-[#6F7077] flex items-center justify-center transition shadow-xs"
            title="Open Full Dossier"
          >
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mini Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-[#141414]/[0.06] mt-4 text-xs font-semibold text-[#6F7077]">
          {(["Overview", "Academic", "Documents", "Payments", "Activity"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 relative transition ${
                activeTab === tab ? "text-[#5B4BFF] font-bold" : "hover:text-[#171719]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="snapshotTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#5B4BFF] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Body Preview */}
        <div className="mt-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#141414]/[0.04]">
            <span className="text-[#8E909A]">Application Status</span>
            <span className="font-semibold text-[#279B63]">Verified &amp; Cleared</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#141414]/[0.04]">
            <span className="text-[#8E909A]">Admissions Officer</span>
            <span className="font-medium text-[#171719]">{student.assignedTo}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#8E909A]">Matriculation Ledger</span>
            <span className="font-medium text-[#171719]">{student.amountPaid} / {student.totalFees}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA to open full dossier */}
      <div className="pt-3 border-t border-[#141414]/[0.05] mt-3">
        <button
          type="button"
          onClick={onOpenDossier}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-xs font-bold text-[#171719] border border-[#141414]/[0.06] transition"
        >
          <span>View Verified Dossier</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
