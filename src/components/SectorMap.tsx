"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import type { Sector } from "@/data/sectors";
import { sector2Plots, type Plot } from "@/data/sector2-plots";
import { sector3Plots } from "@/data/sector3-plots";
import {
  sector1Locations,
  categoryColors,
  categoryLabels,
  type Location,
} from "@/data/sector1-locations";
import RegisterForm from "./RegisterForm";

const VIEWBOX: Record<number, { w: number; h: number }> = {
  1: { w: 2752, h: 1900 },
  2: { w: 2804, h: 1536 },
  3: { w: 2804, h: 1536 },
  4: { w: 2804, h: 1536 },
};

export default function SectorMap({ sector }: { sector: Sector }) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ყველა");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();

  const vb = VIEWBOX[sector.id] ?? { w: 2804, h: 1536 };
  const VB_W = vb.w;
  const VB_H = vb.h;

  const plots = sector.id === 2 ? sector2Plots : sector.id === 3 ? sector3Plots : [];
  const locations = sector.id === 1 ? sector1Locations : [];

  const prevSector = sector.id > 1 ? sector.id - 1 : null;
  const nextSector = sector.id < 4 ? sector.id + 1 : null;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const focusId = searchParams.get("focus");
    if (!focusId) return;

    const loc = locations.find((l) => l.id === focusId);
    if (loc) {
      setSelectedLoc(loc);
      return;
    }
    const plot = plots.find((p) => p.id === focusId);
    if (plot) {
      setSelectedPlot(plot);
    }
  }, [searchParams, sector.id, locations, plots]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = 
      loc.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loc.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.descriptionKa && loc.descriptionKa.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.features && loc.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = activeFilter === "ყველა" || categoryLabels[loc.category] === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

   const filteredPlots = plots.filter(plot => {
    // 1. სტატუსის ფილტრი
    const matchesStatus = 
      activeFilter === "ყველა" ||
      (activeFilter === "გაყიდული" && plot.status === "sold") ||
      (activeFilter === "დაჯავშნილი" && plot.status === "reserved") ||
      (activeFilter === "თავისუფალი" && plot.status === "available");

    // 2. ტექსტური ძებნა
    const matchesSearch = 
      plot.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (plot.ownerKa && plot.ownerKa.toLowerCase().includes(searchQuery.toLowerCase())) ||
      plot.status.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const closeCard = () => {
    setSelectedPlot(null);
    setSelectedLoc(null);
    setShowRegister(false);
  };

  const getPolygonPoints = (poly: Array<{ x: number; y: number }>) =>
    poly.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--bg)]">
      
      {/* ========================================== */}
      {/* 📱 MOBILE VIEW (Havenly App Style) */}
      {/* ========================================== */}
      <div className="md:hidden relative w-full h-full overflow-y-auto pb-24 bg-[#0e1510]">
        
        {/* 🪄 Ambient Glow Background Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[var(--gold)]/10 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-[#2e5c3e]/20 blur-[100px]" />
        </div>

        {/* კონტენტი (z-10 რომ ფონის ზემოთ იყოს) */}
        <div className="relative z-10">
          <div className="px-6 pt-14 pb-4">
            <div className="flex justify-between items-center mb-6 w-full">
              <div className="flex items-center gap-3 w-full">
                
                {/* უკან ღილაკი */}
                <Link href="/sectors" className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e] flex items-center justify-center text-[var(--gold)] border border-[#2d3b31] shadow-lg">
                  ←
                </Link>

                {/* სათაური */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-[var(--gold)]/70 uppercase tracking-widest leading-tight truncate">
                    {sector.subtitleKa}
                  </p>
                  <h1 className="font-serif-display text-2xl text-[var(--fg)] leading-tight truncate">
                    {sector.nameKa}
                  </h1>
                </div>

                {/* WhatsApp ღილაკი */}
                <a href="https://wa.me/995598211275" target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e] border border-[#2d3b31] flex items-center justify-center shadow-lg">
                  <span className="text-[var(--gold)] text-lg">💬</span>
                </a>

              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="მოძებნე ლოკაცია ან ნაკვეთი..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131a14] border border-[#2d3b31] rounded-2xl py-3 pl-12 pr-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/40 focus:outline-none focus:border-[var(--gold)]/50"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg)]/40">🔍</span>
            </div>
          </div>

          <div className="px-6 mb-6 overflow-x-auto no-scrollbar flex gap-2">
            {(sector.id === 1 
              ? ["ყველა", "ველნესი", "აგრო", "წარმოება", "კულტურა"] 
              : ["ყველა", "თავისუფალი", "დაჯავშნილი", "გაყიდული"]
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium transition-all ${
                  activeFilter === filter 
                    ? "bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(184,145,47,0.3)]" 
                    : "bg-[#131a14] text-[var(--fg)]/70 border border-[#2d3b31]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="px-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-[var(--fg)] font-medium">ხელმისაწვდომი ლოკაციები</h2>
            </div>

            {filteredLocations.map((loc) => (
              <div 
                key={loc.id} 
                onClick={() => setSelectedLoc(loc)}
                className="relative w-full rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-[#2d3b31] bg-[#131a14]"
              >
                <div className="relative h-64 w-full">
                  <img 
                    src={loc.image || "/images/overview.jpg"} 
                    alt={loc.nameKa}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1510] via-[#0e1510]/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-[var(--gold)]/90 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {categoryLabels[loc.category]}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif-display text-2xl text-white mb-1">{loc.nameKa}</h3>
                    <p className="text-sm text-white/70 mb-3">{loc.nameEn}</p>
                    
                    <div className="flex gap-2 flex-wrap">
                      {loc.features?.slice(0, 3).map(f => (
                        <span key={f} className="bg-white/10 backdrop-blur-md text-white/90 text-[10px] px-3 py-1 rounded-full border border-white/10">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredPlots.map((plot) => (
              <div 
                key={plot.id} 
                onClick={() => setSelectedPlot(plot)}
                className="relative w-full rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-[#2d3b31] bg-[#131a14]"
              >
                <div className="relative h-64 w-full bg-[var(--gold)]/5">
                  <img 
                    src={
                          Number(plot.id.replace('N-', '')) % 3 === 1 ? "/images/houses/house1.jpg" :
                          Number(plot.id.replace('N-', '')) % 3 === 2 ? "/images/houses/house2.jpg" :
                          "/images/houses/house3.jpg"
                        } 
                    alt={plot.id}
                    className="w-full h-full object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1510] via-[#0e1510]/40 to-transparent" />
                  
                  <div className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                    plot.status === 'sold' ? 'bg-red-500/90 text-white' :
                    plot.status === 'reserved' ? 'bg-blue-500/90 text-white' :
                    'bg-[var(--gold)]/90 text-black'
                  }`}>
                    {plot.status === "sold" ? "გაყიდული" : plot.status === "reserved" ? "დაჯავშნილი" : "თავისუფალი"}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="font-serif-display text-2xl text-white mb-1">ნაკვეთი {plot.id.replace('N-', '')}</h3>
                      <p className="text-sm text-white/70">{plot.ownerKa || "მესაკუთრე არ ჰყავს"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[var(--gold-soft)]">
                        {plot.areaSqm ? `${plot.areaSqm} კვ.მ` : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredLocations.length === 0 && filteredPlots.length === 0 && (
              <div className="text-center py-10">
                <p className="text-[var(--fg)]/50 text-sm">ვერ მოიძებნა: {searchQuery}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 💻 DESKTOP VIEW (რუკა) - სუფთა, ეფექტების გარეშე */}
      {/* ========================================== */}
      <div className="hidden md:block w-full h-full relative">
        
        <Link
          href="/sectors"
          className="absolute top-6 left-6 md:left-8 z-40 px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-black/60 backdrop-blur-md text-sm hover:bg-[var(--gold)] hover:text-black transition"
        >
          ← უკან
        </Link>

        <div className="absolute top-20 left-6 md:left-8 z-30 pointer-events-none text-left">
          <h1 className="font-serif-display text-3xl md:text-4xl text-[var(--gold-soft)] drop-shadow-md">
            {sector.nameKa}
          </h1>
          <p className="text-xs md:text-sm text-[var(--fg)]/70 mt-1">{sector.subtitleKa}</p>
        </div>

        {/* ⬅️➡️ Navigation Arrows */}
        {prevSector && (
          <Link
            href={`/sector/${prevSector}`}
            className="group absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <span className="text-[var(--gold)] group-hover:text-black text-2xl font-bold transition-colors">←</span>
          </Link>
        )}

        {nextSector && (
          <Link
            href={`/sector/${nextSector}`}
            className="group absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <span className="text-[var(--gold)] group-hover:text-black text-2xl font-bold transition-colors">→</span>
          </Link>
        )}

        {/* 🗺️ რუკის ფოტო */}
        <img
          src={sector.image}
          alt={sector.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 📍 SVG Overlay */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {plots.length > 0 && (
            <g className="pointer-events-auto">
              {plots.map((plot) => {
                const isHovered = hovered === plot.id;
                const isSelected = selectedPlot?.id === plot.id;
                const isActive = isHovered || isSelected;

                const cx = plot.x || (plot.polygon ? plot.polygon.reduce((s, p) => s + p.x, 0) / plot.polygon.length : undefined);
                const cy = plot.y || (plot.polygon ? plot.polygon.reduce((s, p) => s + p.y, 0) / plot.polygon.length : undefined);

                if (plot.polygon && plot.polygon.length > 0) {
                  const isSelectedNotHovered = isSelected && !isHovered;
                  const polyFill = isSelectedNotHovered ? "rgba(160, 160, 160, 0.55)" : isHovered ? "rgba(212, 178, 86, 0.65)" : plot.status === "sold" ? "rgba(200, 60, 60, 0.45)" : plot.status === "reserved" ? "rgba(90, 155, 213, 0.5)" : "rgba(184, 145, 47, 0.35)";
                  const polyStroke = isSelectedNotHovered ? "rgba(220, 220, 220, 1)" : isHovered ? "rgba(255, 220, 120, 1)" : plot.status === "sold" ? "rgba(230, 80, 80, 0.95)" : plot.status === "reserved" ? "rgba(90, 155, 213, 0.95)" : "rgba(184, 145, 47, 0.9)";

                  return (
                    <g key={plot.id}>
                      <polygon
                        points={getPolygonPoints(plot.polygon)}
                        fill={polyFill}
                        stroke={polyStroke}
                        strokeWidth={isSelectedNotHovered ? 5 : isHovered ? 4 : 2}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHovered(plot.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => { setSelectedLoc(null); setSelectedPlot(isSelected ? null : plot); setShowRegister(false); }}
                      />
                      {cx != null && cy != null && (
                        <text x={cx} y={cy + 9} textAnchor="middle" fill="#ffffff" fontSize={26} fontWeight={700} className="pointer-events-none select-none" style={{ paintOrder: "stroke", stroke: "rgba(0, 0, 0, 0.7)", strokeWidth: 4, strokeLinejoin: "round" }}>
                          {plot.id.replace("N-", "")}
                        </text>
                      )}
                    </g>
                  );
                }
                if (cx == null || cy == null) return null;
                return (
                  <g key={plot.id}>
                    <circle cx={cx} cy={cy} r={isActive ? 34 : 28} fill={isActive ? "rgba(212, 178, 86, 1)" : "rgba(184, 145, 47, 0.85)"} stroke="rgba(255,255,255,0.95)" strokeWidth={3} className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHovered(plot.id)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelectedLoc(null); setSelectedPlot(isSelected ? null : plot); setShowRegister(false); }} />
                    <text x={cx} y={cy + 8} textAnchor="middle" fill="#0e1510" fontSize={22} fontWeight={700} className="pointer-events-none select-none">{plot.id.replace("N-", "")}</text>
                  </g>
                );
              })}
            </g>
          )}

          {locations.length > 0 && (
            <g className="pointer-events-auto">
              {locations.map((loc) => {
                const isHovered = hovered === loc.id;
                const isSelected = selectedLoc?.id === loc.id;
                const isActive = isHovered || isSelected;
                const dotColor = categoryColors[loc.category];
                const sumX = loc.points.reduce((s, p) => s + p.x, 0);
                const sumY = loc.points.reduce((s, p) => s + p.y, 0);
                const labelX = loc.labelX ?? sumX / loc.points.length;
                const labelY = loc.labelY ?? Math.min(...loc.points.map((p) => p.y)) - 70;
                const labelWidth = loc.nameKa.length * 16 + 40;

                return (
                  <g key={loc.id}>
                    {loc.points.length > 1 && loc.points.map((pt, i) => (
                        <line key={i} x1={labelX} y1={labelY} x2={pt.x} y2={pt.y} stroke={isActive ? "rgba(212, 178, 86, 0.95)" : "rgba(212, 178, 86, 0.45)"} strokeWidth={isActive ? 3 : 2} strokeDasharray="6 4" className="pointer-events-none transition-all duration-200" />
                    ))}
                    {isActive && (
                      <g className="pointer-events-none">
                        <rect x={labelX - labelWidth / 2} y={labelY - 22} width={labelWidth} height={44} rx={22} fill="rgba(14, 21, 16, 0.95)" stroke="rgba(212, 178, 86, 0.8)" strokeWidth={2} />
                        <text x={labelX} y={labelY + 8} textAnchor="middle" fill="#d4b256" fontSize={22} fontWeight={600}>{loc.nameKa}</text>
                      </g>
                    )}
                    {loc.points.map((pt, i) => (
                      <g key={i}>
                        {isActive && <circle cx={pt.x} cy={pt.y} r={26} fill={dotColor} opacity={0.2} className="pointer-events-none" />}
                        <circle cx={pt.x} cy={pt.y} r={isActive ? 12 : 8} fill={dotColor} stroke="rgba(255,255,255,0.95)" strokeWidth={2} className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHovered(loc.id)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelectedPlot(null); setSelectedLoc(isSelected ? null : loc); }} />
                      </g>
                    ))}
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        <AnimatePresence>
          {(selectedPlot || selectedLoc) && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="absolute bottom-8 right-8 z-[60] w-[380px] max-h-[80vh] rounded-2xl bg-[var(--panel)]/95 backdrop-blur-2xl border border-[var(--gold)]/40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0 z-10">
                <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase">{selectedPlot ? "ნაკვეთი" : "ლოკაცია"}</p>
                <button onClick={closeCard} className="text-[var(--fg)]/50 hover:text-[var(--gold)] text-2xl leading-none -mt-1">×</button>
              </div>
              {selectedLoc?.image && (
                <div className="relative w-full h-44 shrink-0 bg-[#0e1510] border-b border-[var(--gold)]/20">
                  <img src={selectedLoc.image} alt={selectedLoc.nameKa} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )}
              <div className="px-6 pt-4 pb-3 shrink-0">
                <h2 className="font-serif-display text-3xl text-[var(--gold-soft)] leading-tight">{selectedPlot ? selectedPlot.id : selectedLoc?.nameKa}</h2>
                {selectedLoc && (
                  <p className="text-xs text-[var(--gold)]/70 uppercase tracking-widest mt-1">{categoryLabels[selectedLoc.category]}</p>
                )}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent mx-6 shrink-0" />
              <div className="overflow-y-auto no-scrollbar flex-1 min-h-0 p-6 space-y-4">
                {selectedPlot && !showRegister && (
                  <>
                    <div className="flex justify-between items-baseline gap-3 text-sm"><span className="text-[var(--fg)]/50">მფლობელი</span><span className="text-base text-right">{selectedPlot.ownerKa || "—"}</span></div>
                    <div className="flex justify-between items-baseline gap-3 text-sm"><span className="text-[var(--fg)]/50">ფართობი</span><span className="text-base text-right">{selectedPlot.areaSqm ? `${selectedPlot.areaSqm.toLocaleString("ka-GE")} კვ.მ` : "—"}</span></div>
                    {sector.id === 3 && selectedPlot.status === "available" && (
                      <button onClick={() => setShowRegister(true)} className="w-full py-3 rounded-lg bg-[var(--gold)] text-black font-medium mt-4">დაინტერესებული ვარ</button>
                    )}
                  </>
                )}
                {selectedPlot && showRegister && <RegisterForm plotId={selectedPlot.id} onBack={() => setShowRegister(false)} />}
                {selectedLoc && (
                  <>
                    <p className="text-sm text-[var(--fg)]/85 leading-relaxed">{selectedLoc.descriptionKa}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================== */}
      {/* 📱 MOBILE FULL SCREEN DETAIL OVERLAY */}
      {/* ========================================== */}
      <AnimatePresence>
        {isMobile && (selectedPlot || selectedLoc) && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#0e1510] flex flex-col overflow-hidden"
          >
                        <div className="relative w-full h-[35vh] shrink-0 border-b border-[#2d3b31]">
               <img 
                 src={
                   selectedPlot 
                     ? (
                         Number(selectedPlot.id.replace('N-', '')) % 3 === 1 ? "/images/houses/house1.jpg" :
                         Number(selectedPlot.id.replace('N-', '')) % 3 === 2 ? "/images/houses/house2.jpg" :
                         "/images/houses/house3.jpg"
                       )
                     : (selectedLoc?.image || "/images/overview.jpg")
                 } 
                 alt="cover" 
                 className="absolute inset-0 w-full h-full object-cover" 
               />
               <button onClick={closeCard} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg">
                 ←
               </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6 pb-24">
              <div className="mb-6">
                <p className="text-[var(--gold)] text-[10px] uppercase tracking-widest mb-2 bg-[var(--gold)]/10 w-fit px-2 py-1 rounded">
                  {selectedPlot ? (selectedPlot.status === "sold" ? "გაყიდული" : selectedPlot.status === "reserved" ? "დაჯავშნილი" : "თავისუფალი") : categoryLabels[selectedLoc!.category]}
                </p>
                <h1 className="font-serif-display text-3xl text-white">
                  {selectedPlot ? `ნაკვეთი ${selectedPlot.id.replace('N-', '')}` : selectedLoc?.nameKa}
                </h1>
                {selectedLoc && <p className="text-sm text-[var(--gold)]/70 mt-1">{selectedLoc.nameEn}</p>}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent mb-6" />

              {selectedPlot && !showRegister && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-[#2d3b31] pb-4">
                    <span className="text-[var(--fg)]/50">მფლობელი</span>
                    <span className="text-lg text-[var(--fg)]">{selectedPlot.ownerKa || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#2d3b31] pb-4">
                    <span className="text-[var(--fg)]/50">ფართობი</span>
                    <span className="text-lg text-[var(--fg)]">{selectedPlot.areaSqm ? `${selectedPlot.areaSqm.toLocaleString("ka-GE")} კვ.მ` : "—"}</span>
                  </div>
                </div>
              )}

              {selectedLoc && (
                <div className="space-y-6">
                  <p className="text-base text-[var(--fg)]/80 leading-relaxed">{selectedLoc.descriptionKa}</p>
                  {selectedLoc.features && (
                    <div>
                      <h3 className="text-sm text-[var(--gold)]/70 uppercase tracking-widest mb-3">მახასიათებლები</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedLoc.features.map(f => (
                          <span key={f} className="px-3 py-1.5 rounded-lg bg-[#1c261e] border border-[#2d3b31] text-[var(--fg)]/90 text-sm">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedPlot && showRegister && (
                <RegisterForm plotId={selectedPlot.id} onBack={() => setShowRegister(false)} />
              )}
            </div>

            {selectedPlot && !showRegister && sector.id === 3 && selectedPlot.status === "available" && (
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0e1510] to-transparent">
                <button onClick={() => setShowRegister(true)} className="w-full py-4 rounded-xl bg-[var(--gold)] text-black font-bold text-lg shadow-lg active:scale-95 transition-transform">
                  დაინტერესებული ვარ
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}