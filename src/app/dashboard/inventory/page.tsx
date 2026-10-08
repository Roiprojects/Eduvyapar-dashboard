"use client";

import { useState } from "react";
import {
  Package,
  Search,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Box,
  Wrench,
  Shield,
  Layers,
} from "lucide-react";
import { demoInventory } from "@/lib/mockData";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Consumables", "Safety & PPE", "Machine Tools", "Electronic Instruments"];

  const filtered = demoInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414]/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] text-[#B8820B] text-xs font-bold tracking-wide uppercase mb-2">
            <Package size={13} />
            <span>Campus Operations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171719] tracking-tight">
            Workshop Inventory &amp; Consumables
          </h1>
          <p className="text-sm text-[#6F7077] mt-1 max-w-xl">
            Asset provenance, machine tools, welding rods, safety equipment, and automatic reorder thresholds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("Indent purchase requisition generated for low stock items.")}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#141414]/[0.08] hover:bg-[#F8F7F4] text-xs font-bold text-[#171719] shadow-xs transition"
          >
            Indent Requisition
          </button>
          <button
            type="button"
            onClick={() => alert("Add Inventory Item modal opened.")}
            className="px-4 py-2.5 rounded-xl bg-[#5B4BFF] hover:bg-[#4838e0] text-white text-xs font-bold shadow-md shadow-[#5B4BFF]/20 transition"
          >
            <Plus size={14} className="inline mr-1" />
            <span>Receive New Stock</span>
          </button>
        </div>
      </div>

      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Cataloged Assets
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#171719] mt-1">
            {demoInventory.length} Items
          </p>
          <span className="text-[11px] text-[#35B779] font-medium mt-1 inline-block">
            Across 4 Workshop Bays
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#8E909A] uppercase tracking-wider block">
            Stock Health
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#35B779] mt-1">
            60% Optimal
          </p>
          <span className="text-[11px] text-[#6F7077] font-medium mt-1 inline-block">
            3 Items Sufficient
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#B8820B] uppercase tracking-wider block">
            Reorder Warnings
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#B8820B] mt-1">
            1 Low Stock
          </p>
          <span className="text-[11px] text-[#B8820B] font-medium mt-1 inline-block">
            Safety Goggles UV400
          </span>
        </div>

        <div className="rounded-2xl bg-white border border-[#141414]/[0.06] p-4 shadow-xs">
          <span className="text-[11px] font-bold text-[#D83B3B] uppercase tracking-wider block">
            Critical Shortage
          </span>
          <p className="font-serif text-2xl lg:text-3xl font-bold text-[#D83B3B] mt-1">
            1 Item Critical
          </p>
          <span className="text-[11px] text-[#D83B3B] font-medium mt-1 inline-block">
            Welding Rods MS6013
          </span>
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
            placeholder="Search by SKU, item name, or workshop bay..."
            className="w-full bg-[#FBFAF7] rounded-xl pl-10 pr-4 py-2 text-xs text-[#171719] placeholder:text-[#8E909A] border border-[#141414]/[0.05] outline-none focus:bg-white focus:border-[#5B4BFF] transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-[#171719] text-white shadow-xs"
                  : "bg-[#FBFAF7] text-[#6F7077] hover:text-[#171719]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Inventory List Table ── */}
      <div className="rounded-2xl border border-[#141414]/[0.06] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#141414]/[0.06] text-[#6F7077] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Item &amp; SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Available In Stock</th>
                <th className="py-3.5 px-4">Reorder Trigger</th>
                <th className="py-3.5 px-4">Storage Bay</th>
                <th className="py-3.5 px-4">Inventory Health</th>
                <th className="py-3.5 px-4 text-right">Quick Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]/[0.04]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FBF9F5] transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#171719] block">{item.name}</span>
                    <span className="text-[10px] text-[#8E909A] font-mono">{item.sku}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#FBFAF7] border border-[#141414]/[0.06] text-[11px] font-medium text-[#171719]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#171719] text-sm">
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#6F7077]">
                    &lt; {item.minReorderLevel} Units
                  </td>
                  <td className="py-3.5 px-4 text-[#171719]">
                    {item.location}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "In Stock"
                          ? "bg-[#EAF8F1] text-[#279B63]"
                          : item.status === "Low Stock"
                          ? "bg-[#FFF8E6] text-[#B8820B]"
                          : "bg-[#FDF0F0] text-[#D83B3B]"
                      }`}
                    >
                      {item.status === "Critical" && <AlertTriangle size={11} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Issued +5 units to ${item.name}`)}
                      className="px-2.5 py-1 rounded-lg bg-[#FBFAF7] hover:bg-[#EEEBFF] hover:text-[#5B4BFF] text-xs font-semibold text-[#171719] border border-[#141414]/[0.05] transition mr-1"
                    >
                      Issue
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Received delivery order for ${item.sku}`)}
                      className="px-2.5 py-1 rounded-lg bg-[#171719] hover:bg-[#5B4BFF] text-white text-xs font-semibold transition"
                    >
                      + Stock
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
