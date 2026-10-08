"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  ArrowUpRight,
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Plus,
  Coins,
} from "lucide-react";
import { demoStudents } from "@/lib/mockData";

export default function FinanceLedgerPage() {
  const [search, setSearch] = useState("");

  const filtered = demoStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.trade.toLowerCase().includes(search.toLowerCase())
  );

  const totalBilled = demoStudents.reduce((acc, s) => acc + s.feeTotal, 0);
  const totalCollected = demoStudents.reduce((acc, s) => acc + s.feePaid, 0);
  const outstanding = totalBilled - totalCollected;

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF8F1] text-[#279B63] text-xs font-bold tracking-wide uppercase mb-2">
            <Wallet size={13} />
            <span>Institutional Treasury</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Fee Ledgers &amp; Dues Management
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Real-time reconciliation of admission tuition, workshop consumables fees, and pending student balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/finance/transactions"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-xs font-bold text-[#171719] shadow-xs transition"
          >
            <span>Live Transactions Feed →</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("Generate Quick Receipt Modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition"
          >
            <Receipt size={14} className="inline mr-1" />
            <span>Generate Receipt</span>
          </button>
        </div>
      </div>

      {/* ── Treasury KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-xs font-bold text-[#8E909A] uppercase tracking-wider block">
            Total Billed Tuition
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#171719] mt-2">
            ₹{totalBilled.toLocaleString()}
          </p>
          <span className="text-xs text-[#6F7077] mt-1 block">
            Academic Session 2025–2026
          </span>
        </div>

        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-xs font-bold text-[#279B63] uppercase tracking-wider block">
            Collections Realized
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#279B63] mt-2">
            ₹{totalCollected.toLocaleString()}
          </p>
          <span className="text-xs text-[#35B779] mt-1 block">
            {Math.round((totalCollected / totalBilled) * 100)}% Realization Rate
          </span>
        </div>

        <div className="rounded-3xl bg-white border border-[#141414]/[0.06] p-6 shadow-xs">
          <span className="text-xs font-bold text-[#D83B3B] uppercase tracking-wider block">
            Outstanding Uncollected Dues
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-[#D83B3B] mt-2">
            ₹{outstanding.toLocaleString()}
          </p>
          <button
            type="button"
            onClick={() => alert("Batch payment reminder dispatched to all guardians with overdue balances.")}
            className="text-xs font-bold text-[#5B4BFF] hover:underline mt-1 inline-block"
          >
            Send Payment Reminder Alerts →
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
          placeholder="Search student ledger by name or roll number..."
          className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.08] outline-none focus:border-[#5B4BFF] shadow-xs transition"
        />
      </div>

      {/* ── Student Billing Table ── */}
      <div className="rounded-2xl border border-[#141414]/[0.06] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#141414]/[0.06] text-[#6F7077] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Student &amp; Roll</th>
                <th className="py-3 px-4">Trade Program</th>
                <th className="py-3 px-4">Total Fee</th>
                <th className="py-3 px-4">Settled Amount</th>
                <th className="py-3 px-4">Balance Pending</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.04]">
              {filtered.map((s) => {
                const bal = s.feeTotal - s.feePaid;

                return (
                  <tr key={s.id} className="hover:bg-[#FBF9F5] transition">
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#171719] block">{s.name}</span>
                      <span className="text-[10px] text-[#8E909A] font-mono">{s.rollNo}</span>
                    </td>
                    <td className="py-3 px-4 text-[#6F7077]">{s.trade}</td>
                    <td className="py-3 px-4 font-semibold text-[#171719]">
                      ₹{s.feeTotal.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#279B63]">
                      ₹{s.feePaid.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#D83B3B]">
                      ₹{bal.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.feeStatus === "Paid"
                            ? "bg-[#EAF8F1] text-[#279B63]"
                            : s.feeStatus === "Partial"
                            ? "bg-[#FFF8E6] text-[#B8820B]"
                            : "bg-[#FDF0F0] text-[#D83B3B]"
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Generated cryptographic fee receipt for ${s.name} (₹${s.feePaid.toLocaleString()}).`)}
                        className="px-3 py-1.5 rounded-lg bg-[#F6F4EF] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-xs font-semibold text-[#171719] transition"
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
