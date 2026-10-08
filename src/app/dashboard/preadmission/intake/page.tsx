"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DirectIntakePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    trade: "1Yr Fitter",
    phone: "",
    email: "",
    fatherName: "",
    street: "",
    city: "Bangalore",
    pincode: "",
    sslcPercentage: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="border-b border-[#141414]/[0.06] pb-6">
        <Link
          href="/dashboard/preadmission"
          className="text-xs font-semibold text-[#5B4BFF] hover:underline inline-flex items-center gap-1 mb-2"
        >
          <span>← Back to Application Pipeline</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2 ml-3">
          <GraduationCap size={13} />
          <span>Walk-in Enrollment</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
          Direct Candidate Admission Intake
        </h1>
        <p className="text-sm text-[#6F7077] mt-1">
          Instant on-campus walk-in registration, trade seat allocation, and SSLC marks record creation.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-3xl bg-white border border-[#141414]/[0.08] p-8 sm:p-12 text-center shadow-lg space-y-4">
          <div className="size-16 rounded-full bg-[#EAF8F1] text-[#279B63] mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#171719]">
            Candidate Admitted Successfully!
          </h2>
          <p className="text-sm text-[#6F7077] max-w-md mx-auto">
            Permanent registration ID generated: <span className="font-mono font-bold text-[#5B4BFF]">ADM-2026-094</span>. The candidate has been added to the master roster for {formData.trade}.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-4 py-2.5 rounded-xl bg-[#F6F4EF] hover:bg-[#eae8e2] text-xs font-bold text-[#171719] transition"
            >
              Enroll Another Candidate
            </button>
            <Link
              href="/dashboard/preadmission"
              className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-xs font-bold text-white shadow-md shadow-[#5B4BFF]/20 transition"
            >
              View in Pipeline
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-[#141414]/[0.08] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">First Name</label>
              <input
                required
                type="text"
                placeholder="Candidate first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Last Name</label>
              <input
                required
                type="text"
                placeholder="Candidate surname"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Allocated Trade</label>
              <select
                value={formData.trade}
                onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs font-semibold text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              >
                <option value="1Yr Fitter">1Yr Fitter (NSQF Level 4)</option>
                <option value="1Yr Electrician">1Yr Electrician (NSQF Level 5)</option>
                <option value="1Yr Welder">1Yr Welder (NSQF Level 4)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs font-semibold text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Date of Birth</label>
              <input
                required
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Primary Mobile Number</label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Parent / Guardian Name</label>
              <input
                required
                type="text"
                placeholder="Father or mother name"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">SSLC Marks Percentage</label>
              <input
                required
                type="number"
                min="35"
                max="100"
                placeholder="e.g. 78.5%"
                value={formData.sslcPercentage}
                onChange={(e) => setFormData({ ...formData, sslcPercentage: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171719] mb-1.5">Residential PIN Code</label>
              <input
                required
                type="text"
                placeholder="560001"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full bg-[#FBFAF7] rounded-xl px-4 py-3 text-xs text-[#171719] border border-[#141414]/[0.08] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#141414]/[0.06] flex items-center justify-between">
            <span className="text-xs text-[#8E909A] flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#35B779]" />
              Direct DGT seat allocation
            </span>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#171719] hover:bg-[#5B4BFF] text-white text-xs font-bold shadow-md shadow-[#171719]/10 transition-colors"
            >
              Register Candidate &amp; Allocate Seat
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
