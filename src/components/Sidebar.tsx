"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  Users2,
  BookOpen,
  CalendarCheck2,
  Wallet,
  CreditCard,
  Package,
  ShoppingCart,
  UserCheck,
  FileBarChart2,
  Settings,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  category?: string;
  badge?: string;
}

const navItems: { category: string; items: NavItem[] }[] = [
  {
    category: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    category: "MANAGEMENT",
    items: [
      { name: "Admissions", href: "/dashboard/preadmission", icon: GraduationCap, badge: "13" },
      { name: "Students", href: "/dashboard#students", icon: Users2 },
      { name: "Academics", href: "/dashboard#academics", icon: BookOpen },
      { name: "Attendance", href: "/dashboard#attendance", icon: CalendarCheck2 },
    ],
  },
  {
    category: "FINANCE",
    items: [
      { name: "Fees & Finance", href: "/dashboard#finance", icon: Wallet },
      { name: "Payments", href: "/dashboard#payments", icon: CreditCard },
    ],
  },
  {
    category: "OPERATIONS",
    items: [
      { name: "Inventory", href: "/dashboard#inventory", icon: Package },
      { name: "Purchase", href: "/dashboard#purchase", icon: ShoppingCart },
      { name: "Faculty / Staff", href: "/dashboard#faculty", icon: UserCheck },
    ],
  },
  {
    category: "INSIGHTS",
    items: [
      { name: "Reports", href: "/dashboard#reports", icon: FileBarChart2 },
      { name: "Settings", href: "/dashboard#settings", icon: Settings },
    ],
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed?: boolean;
  setCollapsed?: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
  const toggleCollapse = () => {
    if (setCollapsed) setCollapsed(!isCollapsed);
    else setInternalCollapsed(!internalCollapsed);
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#FFFFFF] border-r border-[#141414]/[0.06] transition-all duration-300 ease-out select-none ${
        isCollapsed ? "w-[76px]" : "w-[240px] xl:w-[252px]"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-[76px] border-b border-[#141414]/[0.05]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          {/* Origami geometric brand emblem */}
          <div className="relative size-9 rounded-xl bg-gradient-to-tr from-[#4438CA] via-[#5B4BFF] to-[#818CF8] flex items-center justify-center shadow-md shadow-[#5B4BFF]/20 group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.3" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-[15px] tracking-wider text-[#171719] font-sans">
                AIVRM
              </span>
            </div>
          )}
        </Link>
        {!isCollapsed && (
          <button
            type="button"
            className="text-[#6F7077] hover:text-[#171719] p-1.5 rounded-lg hover:bg-[#F6F4EF] transition"
            title="Options"
          >
            <MoreVertical size={16} />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">
        {navItems.map((group) => (
          <div key={group.category} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold tracking-[0.16em] text-[#A0A2AB] uppercase">
                {group.category}
              </p>
            )}
            <div className="mt-1 space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${
                      isActive
                        ? "bg-[#EEEBFF] text-[#5B4BFF] font-semibold"
                        : "text-[#55565D] hover:bg-[#F8F7F4] hover:text-[#171719]"
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {/* Active vertical pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute right-0 top-2 bottom-2 w-1 rounded-l-full bg-[#5B4BFF]"
                      />
                    )}
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? "text-[#5B4BFF]"
                          : "text-[#7B7D86] group-hover:text-[#171719]"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="flex-1 truncate tracking-tight">{item.name}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#5B4BFF]/10 text-[#5B4BFF]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Editorial Architectural Feature Card */}
      {!isCollapsed && (
        <div className="p-3">
          <div className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg group">
            {/* Background architectural photo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/campus-pavilion.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            <div className="relative z-10 flex flex-col justify-end min-h-[92px]">
              <p className="font-serif text-lg leading-tight font-medium tracking-tight">
                Shaping<br />
                Brighter<br />
                Futures.
              </p>
              <div className="mt-3 flex items-center justify-end">
                <button
                  type="button"
                  className="size-8 rounded-full bg-white text-[#171719] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition"
                  aria-label="Campus Vision"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Profile Row */}
      <div className="p-3 border-t border-[#141414]/[0.06] bg-[#FFFFFF]">
        <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#F8F7F4] transition">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative size-9 rounded-full overflow-hidden border border-[#141414]/[0.1] shrink-0">
              <Image
                src="/images/student-rahul.jpg"
                alt="Admin"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#171719] truncate leading-tight">Admin</p>
                <p className="text-[11px] text-[#6F7077] truncate leading-tight">Super Admin</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-1 rounded-lg text-[#6F7077] hover:text-[#171719] hover:bg-[#ECEAE3] transition"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
