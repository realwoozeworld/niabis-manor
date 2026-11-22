"use client";

import { useState, useMemo } from "react";
import { loginAdmin, logoutAdmin, seedInitialData, updatePlot, updateLocation } from "./actions";
import type { Plot } from "@/data/sector2-plots";
import type { Location } from "@/data/sector1-locations";

interface Props {
  isAuthenticated: boolean;
  sector1: Location[];
  sector2: Plot[];
  sector3: Plot[];
}

export default function AdminClient({ isAuthenticated, sector1, sector2, sector3 }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(3);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  // Filter & Search states for Sector 2 & 3
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "reserved" | "sold">("all");

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // KPI Calculations
  const currentPlots = activeTab === 2 ? sector2 : sector3;
  const kpis = useMemo(() => {
    const total = currentPlots.length;
    const available = currentPlots.filter((p) => p.status === "available").length;
    const reserved = currentPlots.filter((p) => p.status === "reserved").length;
    const sold = currentPlots.filter((p) => p.status === "sold").length;
    return { total, available, reserved, sold };
  }, [currentPlots]);

  // Filtered Plots
  const filteredPlots = useMemo(() => {
    return currentPlots.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        (p.ownerKa && p.ownerKa.toLowerCase().includes(q)) ||
        (p.ownerEn && p.ownerEn.toLowerCase().includes(q)) ||
        (p.planted && p.planted.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [currentPlots, statusFilter, searchQuery]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a100c] flex items-center justify-center p-4 text-[#f4f4f4] relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(184,145,47,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await loginAdmin(password);
            if (res.success) window.location.reload();
            else setError(res.error || "შეცდომა");
          }}
          className="w-full max-w-sm relative z-10 bg-[#121a14]/90 backdrop-blur-xl border border-[#b8912f]/30 rounded-3xl p-8 space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
        >
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-soft)] text-xs font-semibold uppercase tracking-wider mb-1">
              <span>დაცული სივრცე</span>
            </div>
            <h1 className="text-2xl font-serif text-[#d4b256]">ნიაბის მამული</h1>
            <p className="text-xs text-white/50">სამართავი პანელი • Admin</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/60 block">ავტორიზაციის პაროლი</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#0c120e] border border-[#2d3b31] focus:border-[#b8912f] text-sm text-[#f4f4f4] outline-none transition"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] font-semibold text-sm shadow-[0_10px_25px_-5px_rgba(212,178,86,0.3)] hover:brightness-110 active:scale-[0.99] transition cursor-pointer"
          >
            შესვლა
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a100c] text-[#f4f4f4] flex flex-col">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none ${
          toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-[#121c15] border border-[var(--gold)]/40 text-[var(--gold-soft)] px-5 py-3 rounded-2xl font-medium text-sm shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast.message}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. Sleek Glassmorphic Top Bar */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#121a14]/80 backdrop-blur-md border-b border-[#b8912f]/15 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Live Sync indicator */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif text-[#d4b256] leading-tight">
                  ნიაბის მამული
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1c261e] border border-[#2d3b31] text-white/50 font-sans">
                  სამართავი პანელი
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-[11px] text-white/60">
                  პირდაპირი სინქრონიზაცია საიტთან
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Subtle Ghost/Secondary Seed Button */}
            <button
              onClick={async () => {
                if (!confirm("დარწმუნებული ხართ? საწყისი მონაცემები გადაეწერება ბაზას.")) return;
                setSeeding(true);
                await seedInitialData();
                setSeeding(false);
                showToast("საწყისი მონაცემები აიტვირთა ბაზაში");
                window.location.reload();
              }}
              disabled={seeding}
              className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/10 hover:border-[#b8912f]/40 text-xs text-white/60 hover:text-[var(--gold-soft)] transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              title="საწყისი მონაცემების აღდგენა ლოკალური ფაილებიდან"
            >
              <span>📥</span>
              <span className="hidden sm:inline">{seeding ? "იტვირთება..." : "ბაზის შევსება ფაილებიდან"}</span>
            </button>

            {/* Logout button */}
            <button
              onClick={async () => {
                await logoutAdmin();
                window.location.reload();
              }}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 hover:bg-red-500 hover:text-white transition active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>გასვლა</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        
        {/* ========================================================= */}
        {/* Sector Navigation Tabs */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex p-1 bg-[#121c15] border border-white/10 rounded-2xl">
            {([1, 2, 3] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setActiveTab(sec);
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  activeTab === sec
                    ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] font-semibold shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {sec === 1 ? "1 სექტორი (ლოკაციები)" : `${sec} სექტორი (ნაკვეთები)`}
              </button>
            ))}
          </div>

          <div className="text-xs text-white/40">
            {activeTab === 1 ? `${sector1.length} ლოკაცია` : `${filteredPlots.length} ნაკვეთი გამოჩენილი`}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. KPI Summary Strip & Quick Filters (For Sectors 2 & 3) */}
        {/* ========================================================= */}
        {activeTab !== 1 && (
          <div className="space-y-4">
            {/* 4-Card KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Total Plots */}
              <div className="bg-[#131c16]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/50">სულ ნაკვეთი</p>
                  <p className="text-2xl font-serif font-bold text-white mt-1">{kpis.total}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 text-lg">
                  🏡
                </div>
              </div>

              {/* Available Plots (Emerald) */}
              <div className="bg-[#131c16]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-4 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-emerald-400/80">თავისუფალი</p>
                  <p className="text-2xl font-serif font-bold text-emerald-400 mt-1">{kpis.available}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                  🟢
                </div>
              </div>

              {/* Reserved Plots (Amber) */}
              <div className="bg-[#131c16]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-amber-400/80">დაჯავშნილი</p>
                  <p className="text-2xl font-serif font-bold text-amber-400 mt-1">{kpis.reserved}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
                  🟡
                </div>
              </div>

              {/* Sold Plots (Rose) */}
              <div className="bg-[#131c16]/80 backdrop-blur-md border border-rose-500/20 rounded-2xl p-4 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-rose-400/80">გაყიდული</p>
                  <p className="text-2xl font-serif font-bold text-rose-400 mt-1">{kpis.sold}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-lg">
                  🔴
                </div>
              </div>
            </div>

            {/* Search Input & Status Filter Pills in one responsive row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#121c15]/60 border border-white/5 rounded-2xl p-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ძებნა ნაკვეთის ID-ით (მაგ: N-5), მფლობელით..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/60 text-xs sm:text-sm text-white placeholder-white/40 outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {(
                  [
                    { id: "all", label: "ყველა" },
                    { id: "available", label: "თავისუფალი", dot: "bg-emerald-400" },
                    { id: "reserved", label: "დაჯავშნილი", dot: "bg-amber-400" },
                    { id: "sold", label: "გაყიდული", dot: "bg-rose-400" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      statusFilter === f.id
                        ? "bg-[#1c2820] border border-[var(--gold)]/60 text-[var(--gold-soft)] shadow-sm"
                        : "bg-[#0c120e]/80 border border-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {"dot" in f && <span className={`w-1.5 h-1.5 rounded-full ${f.dot}`} />}
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Sector 1 Locations View */}
        {/* ========================================================= */}
        {activeTab === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            {sector1.map((loc) => (
              <LocationCard
                key={loc.id}
                loc={loc}
                saving={savingId === loc.id}
                onSave={async (updated) => {
                  setSavingId(loc.id);
                  await updateLocation(updated);
                  setSavingId(null);
                  showToast(`${loc.nameKa} შენახულია`);
                }}
              />
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* Sector 2 & 3 Plots Grid */}
        {/* ========================================================= */}
        {activeTab !== 1 && (
          <div>
            {filteredPlots.length === 0 ? (
              <div className="text-center py-16 bg-[#131c16]/40 border border-white/5 rounded-3xl">
                <p className="text-white/40 text-sm">მითითებული ფილტრით ნაკვეთები ვერ მოიძებნა</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[var(--gold)] transition cursor-pointer"
                >
                  ფილტრების გასუფთავება
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlots.map((plot) => (
                  <PlotCard
                    key={`${activeTab}-${plot.id}`}
                    sectorId={activeTab}
                    plot={plot}
                    saving={savingId === `${activeTab}-${plot.id}`}
                    onSave={async (updated) => {
                      setSavingId(`${activeTab}-${plot.id}`);
                      await updatePlot(updated);
                      setSavingId(null);
                      showToast(`${plot.id} შენახულია`);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// =========================================================
// Refined Plot Card with Obsidian Glass, Status Strip & Smart Save
// =========================================================
function PlotCard({
  sectorId,
  plot,
  saving,
  onSave,
}: {
  sectorId: number;
  plot: Plot & { price?: number };
  saving: boolean;
  onSave: (data: Parameters<typeof updatePlot>[0]) => Promise<void>;
}) {
  const [status, setStatus] = useState<"available" | "reserved" | "sold">(plot.status);
  const [ownerKa, setOwnerKa] = useState(plot.ownerKa || "");
  const [ownerEn, setOwnerEn] = useState(plot.ownerEn || "");
  const [areaSqm, setAreaSqm] = useState(plot.areaSqm?.toString() || "");
  const [price, setPrice] = useState(plot.price?.toString() || "");
  const [planted, setPlanted] = useState(plot.planted?.trim() || "");
  const [isWatered, setIsWatered] = useState(Boolean(plot.isWatered));

  // Smart Dirty Tracking
  const isDirty = useMemo(() => {
    return (
      status !== plot.status ||
      ownerKa !== (plot.ownerKa || "") ||
      ownerEn !== (plot.ownerEn || "") ||
      areaSqm !== (plot.areaSqm?.toString() || "") ||
      price !== (plot.price?.toString() || "") ||
      planted !== (plot.planted?.trim() || "") ||
      isWatered !== Boolean(plot.isWatered)
    );
  }, [status, ownerKa, ownerEn, areaSqm, price, planted, isWatered, plot]);

  // Status strip color mapping
  const statusConfig = {
    available: {
      borderLeft: "border-l-emerald-500",
      dot: "bg-emerald-400",
      label: "თავისუფალი",
    },
    reserved: {
      borderLeft: "border-l-amber-500",
      dot: "bg-amber-400",
      label: "დაჯავშნილი",
    },
    sold: {
      borderLeft: "border-l-rose-500",
      dot: "bg-rose-400",
      label: "გაყიდული",
    },
  }[status];

  return (
    <div
      className={`relative bg-[#131c16]/90 backdrop-blur-md border border-white/10 hover:border-[#b8912f]/40 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-lg transition-all border-l-4 ${statusConfig.borderLeft}`}
    >
      {/* Card Header: Plot ID & Custom Status Dropdown */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold text-[#d4b256] tracking-wide">{plot.id}</span>
          {isDirty && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" title="შეცვლილია" />
          )}
        </div>

        {/* Custom Styled Status Dropdown */}
        <div className="relative inline-flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 pointer-events-none ${statusConfig.dot}`} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "available" | "reserved" | "sold")}
            className="px-3 py-1.5 rounded-xl bg-[#0c120e] border border-white/10 hover:border-[var(--gold)]/40 text-xs text-white outline-none cursor-pointer transition font-medium"
          >
            <option value="available" className="bg-[#0c120e] text-emerald-400">თავისუფალი</option>
            <option value="reserved" className="bg-[#0c120e] text-amber-400">დაჯავშნილი</option>
            <option value="sold" className="bg-[#0c120e] text-rose-400">გაყიდული</option>
          </select>
        </div>
      </div>

      {/* Area & Price inputs */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-white/50 block mb-1">ფართობი (მ²)</label>
          <input
            type="number"
            step="0.1"
            value={areaSqm}
            onChange={(e) => setAreaSqm(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">ფასი ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="—"
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition placeholder-white/30"
          />
        </div>
      </div>

      {/* Owner KA & EN */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-white/50 block mb-1">მფლობელი (KA)</label>
          <input
            value={ownerKa}
            onChange={(e) => setOwnerKa(e.target.value)}
            placeholder="სახელი..."
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition placeholder-white/30"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">მფლობელი (EN)</label>
          <input
            value={ownerEn}
            onChange={(e) => setOwnerEn(e.target.value)}
            placeholder="Name..."
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition placeholder-white/30"
          />
        </div>
      </div>

      {/* Planted input & Custom Watered Toggle */}
      <div className="flex items-center gap-3 text-xs pt-1">
        <div className="flex-1">
          <label className="text-white/50 block mb-1">🌱 ნარგავები</label>
          <input
            value={planted}
            onChange={(e) => setPlanted(e.target.value)}
            placeholder="ვენახი, ბაღი..."
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition placeholder-white/30"
          />
        </div>

        {/* Sleek Custom Watered Toggle Pill */}
        <div className="pt-5 shrink-0">
          <button
            type="button"
            onClick={() => setIsWatered(!isWatered)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${
              isWatered
                ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                : "bg-[#0c120e] border-white/10 text-white/40 hover:text-white/60"
            }`}
          >
            <span>💧</span>
            <span>{isWatered ? "მორწყული" : "არ არის მორწყული"}</span>
          </button>
        </div>
      </div>

      {/* Smart Save Button */}
      <button
        disabled={saving || !isDirty}
        onClick={() =>
          onSave({
            sector_id: sectorId,
            id: plot.id,
            status,
            owner_ka: ownerKa,
            owner_en: ownerEn,
            area_sqm: areaSqm ? Number(areaSqm) : null,
            price: price ? Number(price) : null,
            planted,
            is_watered: isWatered,
          })
        }
        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
          saving
            ? "bg-[#b8912f]/80 text-[#0e1510] cursor-wait"
            : isDirty
            ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] shadow-[0_8px_20px_-4px_rgba(212,178,86,0.4)] hover:brightness-110 active:scale-[0.99]"
            : "bg-white/[0.03] border border-white/10 text-white/30 cursor-not-allowed hover:bg-white/[0.03]"
        }`}
      >
        {saving && (
          <span className="w-3.5 h-3.5 border-2 border-[#0e1510] border-t-transparent rounded-full animate-spin" />
        )}
        <span>{saving ? "ინახება..." : isDirty ? "შენახვა (ცვლილებებია)" : "შენახულია"}</span>
      </button>
    </div>
  );
}

// =========================================================
// Refined Location Card for Sector 1
// =========================================================
function LocationCard({
  loc,
  saving,
  onSave,
}: {
  loc: Location;
  saving: boolean;
  onSave: (data: Parameters<typeof updateLocation>[0]) => Promise<void>;
}) {
  const [nameKa, setNameKa] = useState(loc.nameKa);
  const [nameEn, setNameEn] = useState(loc.nameEn);
  const [descriptionKa, setDescriptionKa] = useState(loc.descriptionKa || "");
  const [descriptionEn, setDescriptionEn] = useState(loc.descriptionEn || "");
  const [featuresText, setFeaturesText] = useState((loc.features || []).join(", "));

  const isDirty = useMemo(() => {
    return (
      nameKa !== loc.nameKa ||
      nameEn !== loc.nameEn ||
      descriptionKa !== (loc.descriptionKa || "") ||
      descriptionEn !== (loc.descriptionEn || "") ||
      featuresText !== (loc.features || []).join(", ")
    );
  }, [nameKa, nameEn, descriptionKa, descriptionEn, featuresText, loc]);

  return (
    <div className="bg-[#131c16]/90 backdrop-blur-md border border-white/10 hover:border-[#b8912f]/40 rounded-2xl p-4 sm:p-5 space-y-3.5 text-xs shadow-lg transition-all border-l-4 border-l-[var(--gold)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-base font-bold text-[#d4b256]">{loc.nameKa}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">({loc.id})</span>
        </div>
        {isDirty && (
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" title="შეცვლილია" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-white/50 block mb-1">სახელი (KA)</label>
          <input
            value={nameKa}
            onChange={(e) => setNameKa(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
          />
        </div>
        <div>
          <label className="text-white/50 block mb-1">სახელი (EN)</label>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="text-white/50 block mb-1">აღწერა (KA)</label>
        <textarea
          rows={2}
          value={descriptionKa}
          onChange={(e) => setDescriptionKa(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
        />
      </div>

      <div>
        <label className="text-white/50 block mb-1">აღწერა (EN)</label>
        <textarea
          rows={2}
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
        />
      </div>

      <div>
        <label className="text-white/50 block mb-1">სერვისები / მახასიათებლები (მძიმით გამოყოფილი)</label>
        <input
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[#0c120e] border border-white/10 focus:border-[var(--gold)]/50 text-white outline-none transition"
        />
      </div>

      <button
        disabled={saving || !isDirty}
        onClick={() =>
          onSave({
            id: loc.id,
            name_ka: nameKa,
            name_en: nameEn,
            description_ka: descriptionKa,
            description_en: descriptionEn,
            features: featuresText
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
          saving
            ? "bg-[#b8912f]/80 text-[#0e1510] cursor-wait"
            : isDirty
            ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] shadow-[0_8px_20px_-4px_rgba(212,178,86,0.4)] hover:brightness-110 active:scale-[0.99]"
            : "bg-white/[0.03] border border-white/10 text-white/30 cursor-not-allowed hover:bg-white/[0.03]"
        }`}
      >
        {saving && (
          <span className="w-3.5 h-3.5 border-2 border-[#0e1510] border-t-transparent rounded-full animate-spin" />
        )}
        <span>{saving ? "ინახება..." : isDirty ? "შენახვა (ცვლილებებია)" : "შენახულია"}</span>
      </button>
    </div>
  );
}
