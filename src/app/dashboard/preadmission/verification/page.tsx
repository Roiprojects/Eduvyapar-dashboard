"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Filter,
  ShieldCheck,
  Search,
} from "lucide-react";
import { applicants } from "@/lib/data";

interface VerificationDoc {
  id: string;
  appNo: string;
  candidateName: string;
  trade: string;
  docType: "SSLC Marks Card" | "Transfer Certificate" | "Aadhaar Card" | "Caste Certificate";
  status: "Pending Verification" | "Verified" | "Rejected";
  uploadedAt: string;
}

const demoDocs: VerificationDoc[] = [
  {
    id: "DOC-101",
    appNo: "20240005",
    candidateName: "Test Abc",
    trade: "1Yr Fitter SH3",
    docType: "SSLC Marks Card",
    status: "Pending Verification",
    uploadedAt: "Today, 10:14 AM",
  },
  {
    id: "DOC-102",
    appNo: "20240006",
    candidateName: "Diwakar Reddy D A",
    trade: "1Yr Fitter SH1",
    docType: "Transfer Certificate",
    status: "Verified",
    uploadedAt: "Yesterday, 04:30 PM",
  },
  {
    id: "DOC-103",
    appNo: "20240007",
    candidateName: "Rahul Test",
    trade: "1Yr Fitter SH1",
    docType: "Aadhaar Card",
    status: "Pending Verification",
    uploadedAt: "Yesterday, 02:15 PM",
  },
  {
    id: "DOC-104",
    appNo: "20240010",
    candidateName: "Jeevan K M",
    trade: "1Yr Electrician SH3",
    docType: "SSLC Marks Card",
    status: "Verified",
    uploadedAt: "06 Oct 2026",
  },
  {
    id: "DOC-105",
    appNo: "20240015",
    candidateName: "Priya N",
    trade: "1Yr Electrician SH1",
    docType: "Caste Certificate",
    status: "Pending Verification",
    uploadedAt: "05 Oct 2026",
  },
];

export default function DocumentVerificationPage() {
  const [docs, setDocs] = useState<VerificationDoc[]>(demoDocs);
  const [filter, setFilter] = useState("All");

  const setStatus = (id: string, s: VerificationDoc["status"]) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status: s } : d)));
  };

  const filtered = docs.filter((d) => filter === "All" || d.status === filter);

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <Link
            href="/dashboard/preadmission"
            className="text-xs font-semibold text-[#5B4BFF] hover:underline inline-flex items-center gap-1 mb-2"
          >
            <span>← Back to Application Pipeline</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2 ml-3">
            <FileCheck2 size={13} />
            <span>Document Audit</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Document Verification Queue
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Sovereign certificate validation, Aadhaar authenticity check, and digital signature sign-off.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Pending Verification", "Verified"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === tab
                  ? "bg-[#171719] text-white"
                  : "bg-white text-[#6F7077] border border-[#141414]/[0.08]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Verification Cards / Queue ── */}
      <div className="space-y-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl bg-white border border-[#141414]/[0.07] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#EEEBFF] text-[#5B4BFF] font-mono text-[10px] font-bold">
                  {doc.appNo}
                </span>
                <span className="text-xs font-bold text-[#171719]">
                  {doc.candidateName}
                </span>
                <span className="text-[11px] text-[#8E909A]">
                  · {doc.trade}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#171719]">
                {doc.docType}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#6F7077]">
                <span>Uploaded: {doc.uploadedAt}</span>
                <span>Audit ID: <span className="font-mono text-[#171719]">{doc.id}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => alert(`Previewing original scanned document ${doc.docType} for ${doc.candidateName}...`)}
                className="px-3 py-2 rounded-xl bg-[#F6F4EF] hover:bg-[#eae8e2] text-xs font-semibold text-[#171719] transition inline-flex items-center gap-1.5"
              >
                <Eye size={13} />
                <span>Inspect PDF</span>
              </button>

              {doc.status !== "Verified" ? (
                <button
                  type="button"
                  onClick={() => setStatus(doc.id, "Verified")}
                  className="px-3.5 py-2 rounded-xl bg-[#279B63] hover:bg-[#208253] text-white text-xs font-bold shadow-md shadow-[#279B63]/20 transition inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 size={13} />
                  <span>Verify Document</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#EAF8F1] text-[#279B63] text-xs font-bold">
                  <CheckCircle2 size={14} />
                  Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
