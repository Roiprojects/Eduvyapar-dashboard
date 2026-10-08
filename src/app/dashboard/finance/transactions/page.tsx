"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
  FileCheck2,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { demoTransactions } from "@/lib/mockData";

export default function TransactionsAuditPage() {
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("All");

  const filtered = demoTransactions.filter((t) => {
    const matchesSearch =
      t.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.referenceId.toLowerCase().includes(search.toLowerCase());
    const matchesMode = filterMode === "All" || t.paymentMode.includes(filterMode);
    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEBFF] text-[#5B4BFF] text-xs font-bold tracking-wide uppercase mb-2">
            <CreditCard size={13} />
            <span>Audit &amp; Treasury</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Live Transactions &amp; Receipts
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Cryptographically audited ledger of UPI payments, bank challans, NEFT settlements, and fee intake receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("Reconciling bank settlement batch with Canara Bank & HDFC Gateway...")}
            className="px-4 py-2.5 rounded-xl bg-[#171719] hover:bg-[#5B4BFF] text-white text-xs font-bold shadow-md transition-all"
          >
            Reconcile Gateway
          </button>
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#141414]/[0.06] shadow-xs">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E909A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by receipt number, student name, or transaction UTR..."
            className="w-full bg-[#FBFAF7] rounded-xl pl-10 pr-4 py-2 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.05] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "UPI", "Net Banking", "Debit Card", "Challan"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                filterMode === mode
                  ? "bg-[#5B4BFF] text-white shadow-xs"
                  : "bg-[#FBFAF7] text-[#6F7077] hover:text-[#171719]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* ── Transaction Table ── */}
      <div className="rounded-2xl border border-[#141414]/[0.06] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#141414]/[0.06] text-[#6F7077] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Receipt / Timestamp</th>
                <th className="py-3.5 px-4">Student &amp; Roll</th>
                <th className="py-3.5 px-4">Fee Head</th>
                <th className="py-3.5 px-4">Channel / Reference</th>
                <th className="py-3.5 px-4">Settled Amount</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.04]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#FBF9F5] transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#5B4BFF] block">{t.receiptNo}</span>
                    <span className="text-[10px] text-[#8E909A]">{t.date}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#171719] block">{t.studentName}</span>
                    <span className="text-[10px] text-[#8E909A] font-mono">{t.rollNo} · {t.trade}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#171719]">{t.feeType}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#171719] block">{t.paymentMode}</span>
                    <span className="text-[10px] text-[#8E909A] font-mono">{t.referenceId}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#279B63] text-sm">
                    ₹{t.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF8F1] text-[#279B63]">
                      <ShieldCheck size={11} />
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Printing verified e-receipt for ${t.receiptNo} (₹${t.amount.toLocaleString()})...`)}
                      className="px-2.5 py-1 rounded-lg bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-xs font-semibold text-[#171719] border border-[#141414]/[0.05] transition"
                    >
                      e-Receipt
                    </button>
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
