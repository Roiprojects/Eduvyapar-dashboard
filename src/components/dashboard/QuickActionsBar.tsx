"use client";

import Link from "next/link";
import {
  FilePlus2,
  UserPlus,
  CreditCard,
  FileSpreadsheet,
  Boxes,
  BellPlus,
  ArrowRight,
} from "lucide-react";

export default function QuickActionsBar() {
  const actions = [
    {
      label: "New Application",
      href: "/dashboard/preadmission?new=1",
      icon: FilePlus2,
      color: "text-[#5B4BFF]",
      bg: "bg-[#EEEBFF]",
    },
    {
      label: "Add Student",
      href: "/dashboard/preadmission?new=1",
      icon: UserPlus,
      color: "text-[#35B779]",
      bg: "bg-[#EAF8F1]",
    },
    {
      label: "Collect Payment",
      href: "/dashboard#finance",
      icon: CreditCard,
      color: "text-[#E6A23C]",
      bg: "bg-[#FDF6EA]",
    },
    {
      label: "Generate Report",
      href: "/dashboard#reports",
      icon: FileSpreadsheet,
      color: "text-[#2563EB]",
      bg: "bg-[#EFF6FF]",
    },
    {
      label: "Manage Inventory",
      href: "/dashboard#inventory",
      icon: Boxes,
      color: "text-[#E45D5D]",
      bg: "bg-[#FDEDED]",
    },
    {
      label: "Create Notice",
      href: "/dashboard#notice",
      icon: BellPlus,
      color: "text-[#8B5CF6]",
      bg: "bg-[#F5F3FF]",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-[#171719] tracking-tight">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.label}
              href={act.href}
              className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#141414]/[0.06] shadow-sm hover:border-[#5B4BFF]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${act.bg} ${act.color} transition-transform group-hover:scale-105`}
                >
                  <Icon size={16} />
                </div>
                <span className="text-xs font-semibold text-[#171719] truncate group-hover:text-[#5B4BFF] transition-colors">
                  {act.label}
                </span>
              </div>
              <ArrowRight
                size={13}
                className="text-[#8E909A] group-hover:text-[#5B4BFF] group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
