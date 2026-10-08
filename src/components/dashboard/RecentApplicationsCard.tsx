"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoreVertical, Check, Clock, AlertCircle, X } from "lucide-react";
import type { StudentDetail } from "./ApplicationDetailPanel";

export const applicantsData: StudentDetail[] = [
  {
    id: "ADM-2026-001",
    name: "Rahul Sharma",
    avatar: "/images/student-rahul.jpg",
    course: "B.Tech CSE",
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
  },
  {
    id: "ADM-2026-002",
    name: "Priya Mehta",
    avatar: "/images/student-priya.jpg",
    course: "BBA",
    appliedDate: "08 Oct 2026",
    status: "Pending",
    dob: "24 Nov 2005",
    gender: "Female",
    email: "priya.mehta@email.com",
    phone: "+91 98123 45678",
    nationality: "Indian",
    academicYear: "2026 - 2029",
    assignedTo: "Dr. Ananya",
    totalFees: "₹95,000",
    amountPaid: "₹45,000",
    paymentDate: "08 Oct 2026",
    paymentMethod: "NetBanking",
    txnId: "NET987654321",
    timeline: [
      { title: "Application Submitted", date: "08 Oct 2026, 09:12 AM", completed: true },
      { title: "Documents Awaiting Review", date: "08 Oct 2026, 11:30 AM", completed: false },
    ],
  },
  {
    id: "ADM-2026-003",
    name: "Arjun Rao",
    avatar: "/images/student-arjun.jpg",
    course: "MBA",
    appliedDate: "07 Oct 2026",
    status: "Under Review",
    dob: "05 Mar 2003",
    gender: "Male",
    email: "arjun.rao@email.com",
    phone: "+91 97654 32109",
    nationality: "Indian",
    academicYear: "2026 - 2028",
    assignedTo: "Prof. Sastry",
    totalFees: "₹1,80,000",
    amountPaid: "₹90,000",
    paymentDate: "07 Oct 2026",
    paymentMethod: "Credit Card",
    txnId: "CC554433221",
    timeline: [
      { title: "Application Submitted", date: "07 Oct 2026, 04:15 PM", completed: true },
      { title: "Entrance Score Validated", date: "08 Oct 2026, 10:00 AM", completed: true },
      { title: "Committee Interview Scheduled", date: "09 Oct 2026, 02:00 PM", completed: false },
    ],
  },
  {
    id: "ADM-2026-004",
    name: "Sneha Iyer",
    avatar: "/images/student-sneha.jpg",
    course: "B.Tech ECE",
    appliedDate: "07 Oct 2026",
    status: "Approved",
    dob: "18 Sep 2004",
    gender: "Female",
    email: "sneha.iyer@email.com",
    phone: "+91 98456 78901",
    nationality: "Indian",
    academicYear: "2026 - 2030",
    assignedTo: "Mr. Kumar",
    totalFees: "₹1,20,000",
    amountPaid: "₹1,20,000",
    paymentDate: "08 Oct 2026",
    paymentMethod: "UPI",
    txnId: "UPI8765432190",
    timeline: [
      { title: "Application Submitted", date: "07 Oct 2026, 01:20 PM", completed: true },
      { title: "Documents Verified", date: "07 Oct 2026, 04:30 PM", completed: true },
      { title: "Payment Cleared", date: "08 Oct 2026, 10:15 AM", completed: true },
      { title: "Approved", date: "08 Oct 2026, 02:00 PM", completed: true },
    ],
  },
  {
    id: "ADM-2026-005",
    name: "Karan Singh",
    avatar: "/images/student-karan.jpg",
    course: "BCA",
    appliedDate: "06 Oct 2026",
    status: "Rejected",
    dob: "30 Jul 2004",
    gender: "Male",
    email: "karan.singh@email.com",
    phone: "+91 98712 34567",
    nationality: "Indian",
    academicYear: "2026 - 2029",
    assignedTo: "Admissions Board",
    totalFees: "₹85,000",
    amountPaid: "₹0",
    paymentDate: "—",
    paymentMethod: "—",
    txnId: "—",
    timeline: [
      { title: "Application Submitted", date: "06 Oct 2026, 11:45 AM", completed: true },
      { title: "Eligibility Criteria Not Met", date: "07 Oct 2026, 03:20 PM", completed: true },
    ],
  },
];

export default function RecentApplicationsCard({
  onSelectStudent,
  selectedStudentId,
}: {
  onSelectStudent: (student: StudentDetail) => void;
  selectedStudentId?: string;
}) {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="font-serif text-base font-bold text-[#171719] tracking-tight">
          Recent Applications
        </h3>
        <Link
          href="/dashboard/preadmission"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B4BFF] hover:underline"
        >
          <span>View all</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Rows */}
      <div className="space-y-2 mt-1">
        {applicantsData.map((app) => {
          const isSelected = selectedStudentId === app.id;

          return (
            <div
              key={app.id}
              onClick={() => onSelectStudent(app)}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#EEEBFF]/60 border-[#5B4BFF]/30 shadow-sm"
                  : "bg-[#FFFFFF] border-[#141414]/[0.05] hover:bg-[#FBFAF7] hover:border-[#141414]/[0.1]"
              }`}
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-10 rounded-full overflow-hidden border border-[#141414]/[0.08] shrink-0 shadow-sm">
                  <Image
                    src={app.avatar}
                    alt={app.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#171719] truncate leading-tight">
                    {app.name}
                  </p>
                  <p className="text-[11px] text-[#6F7077] truncate mt-0.5">
                    {app.course}
                  </p>
                </div>
              </div>

              {/* Date */}
              <span className="text-[11px] text-[#8E909A] hidden sm:block">
                {app.appliedDate}
              </span>

              {/* Status Pill & Action */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    app.status === "Approved"
                      ? "bg-[#EAF8F1] text-[#279B63]"
                      : app.status === "Pending"
                      ? "bg-[#FDF6EA] text-[#C27E16]"
                      : app.status === "Under Review"
                      ? "bg-[#EEEBFF] text-[#5B4BFF]"
                      : "bg-[#FDEDED] text-[#D94242]"
                  }`}
                >
                  {app.status === "Approved" && <Check size={10} strokeWidth={3} />}
                  {app.status === "Pending" && <Clock size={10} strokeWidth={2.5} />}
                  {app.status === "Under Review" && <AlertCircle size={10} strokeWidth={2.5} />}
                  {app.status === "Rejected" && <X size={10} strokeWidth={3} />}
                  {app.status}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStudent(app);
                  }}
                  className="text-[#8E909A] hover:text-[#171719] p-1 rounded-md hover:bg-[#F6F4EF] transition"
                  title="Actions"
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
