"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  CheckCircle2,
  Clock,
  Check,
  Download,
  FileText,
  Mail,
  MoreVertical,
  Calendar,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export interface StudentDetail {
  id: string;
  name: string;
  avatar: string;
  course: string;
  appliedDate: string;
  status: "Approved" | "Pending" | "Under Review" | "Rejected";
  dob: string;
  gender: string;
  email: string;
  phone: string;
  nationality: string;
  academicYear: string;
  assignedTo: string;
  totalFees: string;
  amountPaid: string;
  paymentDate: string;
  paymentMethod: string;
  txnId: string;
  timeline: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export const defaultStudent: StudentDetail = {
  id: "ADM-2026-001",
  name: "Rahul Sharma",
  avatar: "/images/student-rahul.jpg",
  course: "B.Tech Computer Science",
  appliedDate: "08 Oct 2026",
  status: "Approved",
  dob: "12 Aug 2004",
  gender: "Male",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  nationality: "Indian",
  academicYear: "2026 - 2030",
  assignedTo: "Mr. Kumar",
  totalFees: "₹1,20,000",
  amountPaid: "₹1,20,000",
  paymentDate: "09 Oct 2026",
  paymentMethod: "UPI",
  txnId: "UPI1234567890",
  timeline: [
    { title: "Application Submitted", date: "08 Oct 2026, 10:24 AM", completed: true },
    { title: "Documents Verified", date: "09 Oct 2026, 02:15 PM", completed: true },
    { title: "Payment Received", date: "09 Oct 2026, 03:40 PM", completed: true },
    { title: "Approved", date: "10 Oct 2026, 11:20 AM", completed: true },
  ],
};

export default function ApplicationDetailPanel({
  student = defaultStudent,
  isOpen,
  onClose,
}: {
  student?: StudentDetail;
  isOpen: boolean;
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"Overview" | "Academic" | "Documents" | "Payments" | "Activity">("Overview");

  if (!isOpen) return null;

  return (
    <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 bg-[#FFFFFF] border-l border-[#141414]/[0.06] flex flex-col h-full overflow-y-auto no-scrollbar shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
      {/* Panel Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#141414]/[0.05]">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-[#6F7077] hover:text-[#171719] hover:bg-[#F6F4EF] transition"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <h2 className="font-serif text-lg font-bold text-[#171719] tracking-tight">
            Application Details
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8E909A] hover:text-[#171719] hover:bg-[#F6F4EF] transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Candidate Identity Card */}
        <div className="flex items-center gap-4">
          <div className="relative size-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
            <Image
              src={student.avatar}
              alt={student.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-[#171719] truncate">{student.name}</h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  student.status === "Approved"
                    ? "bg-[#EAF8F1] text-[#279B63]"
                    : student.status === "Pending"
                    ? "bg-[#FDF6EA] text-[#C27E16]"
                    : student.status === "Under Review"
                    ? "bg-[#EEEBFF] text-[#5B4BFF]"
                    : "bg-[#FDEDED] text-[#D94242]"
                }`}
              >
                <Check size={11} strokeWidth={3} />
                {student.status}
              </span>
            </div>
            <p className="text-xs text-[#6F7077] mt-0.5">
              Application ID <span className="font-semibold text-[#171719]">{student.id}</span>
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#6F7077]">
              <span className="inline-flex items-center gap-1">
                <GraduationCap size={13} className="text-[#5B4BFF]" />
                {student.course}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} className="text-[#8E909A]" />
                Applied on {student.appliedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-4 border-b border-[#141414]/[0.06] text-xs font-medium text-[#6F7077]">
          {(["Overview", "Academic", "Documents", "Payments", "Activity"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 relative transition ${
                activeTab === tab
                  ? "text-[#171719] font-bold"
                  : "hover:text-[#171719]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-[#5B4BFF] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Student Information Section */}
        <div className="rounded-2xl border border-[#141414]/[0.06] bg-[#FBFAF7] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#171719] tracking-tight">Student Information</h4>
            <button
              type="button"
              className="text-[11px] font-semibold text-[#5B4BFF] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Full Name</span>
                <span className="font-semibold text-[#171719]">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Date of Birth</span>
                <span className="font-medium text-[#171719]">{student.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Gender</span>
                <span className="font-medium text-[#171719]">{student.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Email</span>
                <span className="font-medium text-[#171719] truncate max-w-[130px]" title={student.email}>
                  {student.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Phone</span>
                <span className="font-medium text-[#171719]">{student.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7077]">Nationality</span>
                <span className="font-medium text-[#171719]">{student.nationality}</span>
              </div>
            </div>

            {/* Architectural Photo Thumbnail */}
            <div className="relative w-20 h-28 rounded-xl overflow-hidden border border-[#141414]/[0.08] shrink-0 shadow-sm">
              <Image
                src="/images/architectural-ribbon.jpg"
                alt="Campus Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Application Details Section */}
        <div className="rounded-2xl border border-[#141414]/[0.06] bg-[#FBFAF7] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#171719] tracking-tight">Application Details</h4>
            <button
              type="button"
              className="text-[11px] font-semibold text-[#5B4BFF] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Course</span>
              <span className="font-semibold text-[#171719]">{student.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Application Date</span>
              <span className="font-medium text-[#171719]">{student.appliedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Academic Year</span>
              <span className="font-medium text-[#171719]">{student.academicYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Application Status</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#279B63]">
                <Check size={11} strokeWidth={3} />
                {student.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Assigned To</span>
              <span className="font-medium text-[#171719]">{student.assignedTo}</span>
            </div>
          </div>
        </div>

        {/* Status Timeline & Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Timeline */}
          <div className="rounded-2xl border border-[#141414]/[0.06] bg-[#FFFFFF] p-4 space-y-3">
            <h4 className="text-xs font-bold text-[#171719] tracking-tight">Status Timeline</h4>
            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#5B4BFF]/20">
              {student.timeline.map((step, idx) => (
                <div key={step.title} className="relative">
                  <div
                    className={`absolute -left-5 top-0.5 size-2.5 rounded-full ring-4 ring-white ${
                      idx === student.timeline.length - 1
                        ? "bg-[#279B63]"
                        : "bg-[#5B4BFF]"
                    }`}
                  />
                  <p className="text-[11px] font-semibold text-[#171719] leading-tight">{step.title}</p>
                  <p className="text-[10px] text-[#8E909A] mt-0.5">{step.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Buttons */}
          <div className="rounded-2xl border border-[#141414]/[0.06] bg-[#FFFFFF] p-4 space-y-2 flex flex-col justify-between">
            <h4 className="text-xs font-bold text-[#171719] tracking-tight">Quick Actions</h4>
            <div className="space-y-1.5 flex-1 flex flex-col justify-center">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-left text-[11px] font-medium text-[#171719] border border-[#141414]/[0.06] transition"
              >
                <Download size={13} className="text-[#5B4BFF]" />
                <span className="truncate">Download Application</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-left text-[11px] font-medium text-[#171719] border border-[#141414]/[0.06] transition"
              >
                <FileText size={13} className="text-[#5B4BFF]" />
                <span className="truncate">View Documents</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-left text-[11px] font-medium text-[#171719] border border-[#141414]/[0.06] transition"
              >
                <Mail size={13} className="text-[#5B4BFF]" />
                <span className="truncate">Send Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="rounded-2xl border border-[#141414]/[0.06] bg-[#FBFAF7] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#171719] tracking-tight">Payment Information</h4>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF8F1] text-[#279B63]">
              <Check size={10} strokeWidth={3} />
              Paid
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Total Fees</span>
              <span className="font-bold text-[#171719]">{student.totalFees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Amount Paid</span>
              <span className="font-semibold text-[#171719]">{student.amountPaid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Payment Date</span>
              <span className="font-medium text-[#171719]">{student.paymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Payment Method</span>
              <span className="font-medium text-[#171719]">{student.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7077]">Transaction ID</span>
              <span className="font-mono text-[11px] text-[#6F7077]">{student.txnId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
