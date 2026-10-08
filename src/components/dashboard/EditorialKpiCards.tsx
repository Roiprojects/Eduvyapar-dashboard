"use client";

import Image from "next/image";
import { Users, FileText, Clock, CheckCircle2, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function EditorialKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
      {/* Primary KPI Card: Total Students (lg:col-span-4) */}
      <div className="lg:col-span-4 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-4 flex flex-col justify-between shadow-sm hover:border-[#5B4BFF]/30 transition group">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center">
                <Users size={16} />
              </div>
              <span className="text-xs font-semibold text-[#171719]">Total Students</span>
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF8F1] text-[#279B63]">
              <ArrowUpRight size={11} />
              +8.4% <span className="text-[#8E909A] font-normal ml-0.5">vs last month</span>
            </span>
          </div>

          <div className="mt-3">
            <span className="font-sans text-3xl lg:text-4xl font-extrabold text-[#171719] tracking-tight">
              12,842
            </span>
          </div>
        </div>

        {/* Bottom sparkline & avatar stack */}
        <div className="mt-4 flex items-end justify-between pt-2 border-t border-[#141414]/[0.04]">
          {/* Mini Sparkline Bars */}
          <div className="flex items-end gap-1 h-7">
            {[40, 60, 50, 80, 70, 95, 85, 100].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-[#5B4BFF]"
                style={{
                  height: `${h}%`,
                  opacity: 0.3 + (i / 8) * 0.7,
                }}
              />
            ))}
          </div>

          {/* Overlapping Avatar Stack + count */}
          <div className="flex items-center -space-x-2">
            <div className="relative size-6 rounded-full overflow-hidden border-2 border-white">
              <Image src="/images/student-rahul.jpg" alt="Student" fill className="object-cover" />
            </div>
            <div className="relative size-6 rounded-full overflow-hidden border-2 border-white">
              <Image src="/images/student-priya.jpg" alt="Student" fill className="object-cover" />
            </div>
            <div className="relative size-6 rounded-full overflow-hidden border-2 border-white">
              <Image src="/images/student-arjun.jpg" alt="Student" fill className="object-cover" />
            </div>
            <div className="size-6 rounded-full bg-[#FBFAF7] border border-[#141414]/[0.1] text-[9px] font-bold text-[#6F7077] flex items-center justify-center">
              +12K
            </div>
          </div>
        </div>
      </div>

      {/* KPI Card 2: Applications (lg:col-span-2) */}
      <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-4 flex flex-col justify-between shadow-sm hover:border-[#5B4BFF]/30 transition group">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center">
              <FileText size={14} />
            </div>
            <span className="text-xs font-semibold text-[#171719]">Applications</span>
          </div>

          <div className="mt-2.5">
            <span className="text-2xl font-bold text-[#171719] tracking-tight">
              1,284
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#141414]/[0.04]">
          <div className="flex items-end gap-1 h-5">
            {[30, 50, 45, 70, 85].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-[#5B4BFF]"
                style={{ height: `${h}%`, opacity: 0.4 + (i / 5) * 0.6 }}
              />
            ))}
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-[#279B63]">
            <ArrowUpRight size={10} />
            +12.8%
          </span>
        </div>
      </div>

      {/* KPI Card 3: Pending Review (lg:col-span-2) */}
      <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-4 flex flex-col justify-between shadow-sm hover:border-[#5B4BFF]/30 transition group">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[#FDF6EA] text-[#E6A23C] flex items-center justify-center">
              <Clock size={14} />
            </div>
            <span className="text-xs font-semibold text-[#171719]">Pending Review</span>
          </div>

          <div className="mt-2.5">
            <span className="text-2xl font-bold text-[#171719] tracking-tight">
              326
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#141414]/[0.04]">
          <div className="flex items-end gap-1 h-5">
            {[65, 55, 60, 45, 40].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-[#E6A23C]"
                style={{ height: `${h}%`, opacity: 0.5 + (i / 5) * 0.5 }}
              />
            ))}
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-[#E45D5D]">
            <ArrowDownRight size={10} />
            -4.2%
          </span>
        </div>
      </div>

      {/* KPI Card 4: Approved (lg:col-span-2) */}
      <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-4 flex flex-col justify-between shadow-sm hover:border-[#5B4BFF]/30 transition group">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[#EAF8F1] text-[#279B63] flex items-center justify-center">
              <CheckCircle2 size={14} />
            </div>
            <span className="text-xs font-semibold text-[#171719]">Approved</span>
          </div>

          <div className="mt-2.5">
            <span className="text-2xl font-bold text-[#171719] tracking-tight">
              184
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#141414]/[0.04]">
          <div className="flex items-end gap-1 h-5">
            {[40, 50, 65, 75, 90].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-[#279B63]"
                style={{ height: `${h}%`, opacity: 0.4 + (i / 5) * 0.6 }}
              />
            ))}
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-[#279B63]">
            <ArrowUpRight size={10} />
            +8.1%
          </span>
        </div>
      </div>

      {/* KPI Card 5: Revenue (lg:col-span-2) */}
      <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] border border-[#141414]/[0.06] p-4 flex flex-col justify-between shadow-sm hover:border-[#5B4BFF]/30 transition group">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[#EEEBFF] text-[#5B4BFF] flex items-center justify-center">
              <Wallet size={14} />
            </div>
            <span className="text-xs font-semibold text-[#171719]">Revenue</span>
          </div>

          <div className="mt-2.5">
            <span className="text-2xl font-bold text-[#171719] tracking-tight">
              ₹48.6L
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#141414]/[0.04]">
          <div className="flex items-end gap-1 h-5">
            {[35, 55, 60, 80, 95].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm bg-[#5B4BFF]"
                style={{ height: `${h}%`, opacity: 0.4 + (i / 5) * 0.6 }}
              />
            ))}
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold text-[#279B63]">
            <ArrowUpRight size={10} />
            +14.2%
          </span>
        </div>
      </div>
    </div>
  );
}
