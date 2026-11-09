"use client";

import WeatherWidget from "./WeatherWidget";
import ProgressWidget from "./ProgressWidget";
import { useState, useEffect, useMemo, useRef } from "react";
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

export default function SectorMap({ sector }: { sector: Sector }) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

    // 🔴 კალიბრაციის რეჟიმი
  const [calibrateMode, setCalibrateMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.search.includes("calibrate=1");
    }
    return false;
  });
  const [calibPoint, setCalibPoint] = useState<{x: number, y: number} | null>(null);

  const searchParams = useSearchParams();

  const plots = sector.id === 2 ? sector2Plots : sector.id === 3 ? sector3Plots : [];
  const locations = sector.id === 1 ? sector1Locations : [];
  const items = locations.length > 0 ? locations : plots;

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
      const idx = locations.findIndex(l => l.id === focusId);
      setActiveIndex(idx);
      return;
    }
    const plot = plots.find((p) => p.id === focusId);
    if (plot) {
      setSelectedPlot(plot);
      const idx = plots.findIndex(p => p.id === focusId);
      setActiveIndex(idx);
    }
  }, [searchParams, sector.id, locations, plots]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (selectedPlot || selectedLoc) {
      window.dispatchEvent(new Event("hide-social-buttons"));
    } else {
      window.dispatchEvent(new Event("show-social-buttons"));
    }
  }, [selectedPlot, selectedLoc]);

  const isMobileSector1 = isMobile && sector.id === 1;
  const currentImage = isMobileSector1 ? "/images/sector-1-mobile.jpg" : sector.image;
  const VB_W = isMobileSector1 ? 1080 : (sector.id === 1 ? 2752 : 2804);
  const VB_H = isMobileSector1 ? 1920 : (sector.id === 1 ? 1900 : 1536);

  // 🔴 კალიბრაციის ფუნქცია
  const handleCalibrateClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!calibrateMode) return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * VB_W);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * VB_H);
    console.log(`{ x: ${x}, y: ${y} },`);
    setCalibPoint({ x, y }); // ვაჩენთ წითელ წერტილს
  };

  const cameraAnimation = useMemo(() => {
    if (!isMobile) return { x: "0%", y: "0%", scale: 1 };
    
    const currentItem = items[activeIndex];
    if (!currentItem && !selectedLoc && !selectedPlot) return { x: "0%", y: "0%", scale: 1 };

    let cx = VB_W / 2;
    let cy = VB_H / 2;

    const getActivePoints = (loc: Location) => {
      return isMobileSector1 && loc.mobilePoints ? loc.mobilePoints : loc.points;
    };

    if (selectedLoc) {
      const activePts = getActivePoints(selectedLoc);
      const sumX = activePts.reduce((s, p) => s + p.x, 0);
      const sumY = activePts.reduce((s, p) => s + p.y, 0);
      cx = sumX / activePts.length;
      cy = sumY / activePts.length;
    } else if (selectedPlot && selectedPlot.x && selectedPlot.y) {
      cx = selectedPlot.x;
      cy = selectedPlot.y;
    } else if (currentItem && 'points' in currentItem) {
       const activePts = getActivePoints(currentItem as Location);
       if (activePts.length > 0) {
         const sumX = activePts.reduce((s, p) => s + p.x, 0);
         const sumY = activePts.reduce((s, p) => s + p.y, 0);
         cx = sumX / activePts.length;
         cy = sumY / activePts.length;
       }
    }

    const zoomScale = 1.5; 
    let targetX = (0.5 - cx / VB_W) * 100 * zoomScale;
    let targetY = (0.5 - cy / VB_H) * 100 * zoomScale;

    const maxOffset = (zoomScale - 1) * 50;
    targetX = Math.max(-maxOffset, Math.min(targetX, maxOffset));
    targetY = Math.max(-maxOffset, Math.min(targetY, maxOffset));

    return { x: `${targetX}%`, y: `${targetY}%`, scale: zoomScale };
  }, [isMobile, activeIndex, items, selectedPlot, selectedLoc, VB_W, VB_H, isMobileSector1]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;
    
    children.forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - 16 - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < items.length) {
      setActiveIndex(closestIndex);
      setSelectedLoc(null);
      setSelectedPlot(null);
    }
  };

  const scrollToCard = (idx: number) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[idx] as HTMLElement;
    if (child) {
      scrollRef.current.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0e1510]">
      
      {/* 🔴 CALIBRATION BANNER */}
      {calibrateMode && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold animate-pulse pointer-events-none shadow-lg">
          🔴 CALIBRATION MODE ACTIVE (Click on the map)
        </div>
      )}

      {/* 📱 MOBILE VIEW */}
      <div className="md:hidden flex flex-col w-full h-full bg-[#0e1510]">
        
         {/* Header */}
        <div className="flex items-center justify-between px-6 pt-10 pb-2 shrink-0 z-20">
          <Link href="/sectors" className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e]/80 backdrop-blur-md flex items-center justify-center text-[var(--gold)] border border-[#2d3b31] shadow-lg">
             ←
          </Link>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[#f4f4f4] font-serif-display text-lg tracking-wide drop-shadow-md">ნიაბის მამული</span>
            <span className="text-[var(--gold)] font-serif-display text-lg tracking-wide drop-shadow-md">{sector.nameKa}</span>
          </div>
          
          {/* 🔴 აქ ჩავსვით Weather და WhatsApp სფეისერის ნაცვლად */}
          <div className="flex items-center gap-2">
            <WeatherWidget />
            <a href="https://wa.me/995598211275" target="_blank" rel="noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e] border border-[#2d3b31] flex items-center justify-center">
              <span className="text-[var(--gold)] text-lg">💬</span>
            </a>
          </div>
        </div>

        {/* MAP AREA */}
        <div className="relative w-full h-[48vh] px-4 shrink-0 mt-2">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-[#2d3b31] shadow-2xl bg-[#0e1510]">
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={cameraAnimation}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              <img
                src={currentImage}
                alt={sector.nameEn}
                onClick={handleCalibrateClick}
                // 🔴 კალიბრაციის დროს ვიყენებთ object-contain-ს, რომ ფოტო მთლიანად ჩანდეს!
                className={`absolute inset-0 w-full h-full ${calibrateMode ? "object-contain bg-black/80" : "object-cover"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              >
                {/* 🔴 წითელი წერტილი კალიბრაციისთვის */}
                {calibPoint && (
                  <g className="pointer-events-none">
                    <circle cx={calibPoint.x} cy={calibPoint.y} r={24} fill="red" opacity={0.6} />
                    <circle cx={calibPoint.x} cy={calibPoint.y} r={12} fill="white" />
                  </g>
                )}

                {locations.map((loc) => {
                  const dotColor = categoryColors[loc.category];
                  const isActive = activeIndex === items.findIndex(i => i.id === loc.id);
                  
                  const activePoints = isMobileSector1 && loc.mobilePoints ? loc.mobilePoints : loc.points;

                  return (
                    <g key={loc.id} onClick={() => {
                        if (calibrateMode) return;
                        const idx = items.findIndex(i => i.id === loc.id);
                        setActiveIndex(idx);
                        scrollToCard(idx);
                    }}>
                      {activePoints.map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r={isActive ? 22 : 12} fill={dotColor} stroke="rgba(255,255,255,0.9)" strokeWidth={2.5} className="transition-all duration-300 cursor-pointer" />
                      ))}
                    </g>
                  );
                })}
              </svg>
            </motion.div>
          </div>
        </div>

        {/* CAROUSEL AREA */}
        <div className="flex-1 flex flex-col justify-between pt-6 pb-24 overflow-hidden">
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 w-full"
          >
                        {items.map((item, index) => {
              const isLoc = 'nameKa' in item;
              const title = isLoc ? item.nameKa : item.id;
              const subtitle = isLoc ? categoryLabels[item.category] : "ნაკვეთი";
              const image = isLoc ? item.image : "/images/overview.jpg";

              return (
                <div 
                  key={item.id}
                  className="w-[88vw] max-w-[360px] shrink-0 snap-center"
                >
                  <div className="w-full h-[150px] rounded-[2rem] bg-[#131a14]/95 backdrop-blur-xl border border-[#2d3b31] p-5 shadow-2xl flex gap-4 relative items-center">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-[#2d3b31]" />
                    
                    {/* ფოტო */}
                    <div className="w-[100px] h-[100px] shrink-0 rounded-2xl overflow-hidden border border-[var(--gold)]/30 shadow-inner">
                      <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>

                    {/* ტექსტი */}
                    <div className="flex flex-col justify-center flex-1 py-1">
                      {/* 🔴 სათაური: შევამცირე ზომა და დავუმატე line-clamp-2 */}
                      <h2 className="font-serif-display text-[20px] text-[var(--gold-soft)] leading-tight line-clamp-2">
                        {title}
                      </h2>
                      
                      <p className="text-[9px] text-[var(--gold)] uppercase tracking-[0.15em] mt-1 mb-1.5 font-semibold">
                        {subtitle}
                      </p>
                      
                      {/* 🔴 აღწერა: line-clamp-2, რომ ზედმეტად არ გაიწელოს */}
                      <p className="text-[11px] text-[var(--fg)]/80 line-clamp-2 leading-relaxed font-serif italic">
                        {isLoc ? item.descriptionKa : `მფლობელი: ${item.ownerKa || "თავისუფალი"}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-1.5 flex-wrap justify-center px-4">
              {items.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => scrollToCard(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-[#2d3b31]"}`} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 💻 DESKTOP VIEW - უცვლელია */}
      <div className="hidden md:block w-full h-full relative">
        <img
          src={sector.image}
          alt={sector.nameEn}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-0" />
        
        <div className="absolute top-6 right-24 z-40">
          <WeatherWidget />
        </div>

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
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
                      <polygon points={plot.polygon.map(p => `${p.x},${p.y}`).join(" ")} fill={polyFill} stroke={polyStroke} strokeWidth={isSelectedNotHovered ? 5 : isHovered ? 4 : 2} className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHovered(plot.id)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelectedLoc(null); setSelectedPlot(isSelected ? null : plot); setShowRegister(false); }} />
                      {cx != null && cy != null && (
                        <text x={cx} y={cy + 9} textAnchor="middle" fill="#ffffff" fontSize={26} fontWeight={700} className="pointer-events-none select-none" style={{ paintOrder: "stroke", stroke: "rgba(0, 0, 0, 0.7)", strokeWidth: 4, strokeLinejoin: "round" }}>{plot.id.replace("N-", "")}</text>
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
                    {isActive && (
                      <g className="pointer-events-none">
                        <rect x={labelX - labelWidth / 2} y={labelY - 22} width={labelWidth} height={44} rx={22} fill="rgba(14, 21, 16, 0.95)" stroke="rgba(212, 178, 86, 0.8)" strokeWidth={2} />
                        <text x={labelX} y={labelY + 8} textAnchor="middle" fill="#d4b256" fontSize={22} fontWeight={600}>{loc.nameKa}</text>
                      </g>
                    )}
                    {loc.points.map((pt, i) => (
                      <g key={i}>
                        {isActive && <circle cx={pt.x} cy={pt.y} r={26} fill={dotColor} opacity={0.2} className="pointer-events-none" />}
                        <circle cx={pt.x} cy={pt.y} r={isActive ? 14 : 10} fill={dotColor} stroke="rgba(255,255,255,0.95)" strokeWidth={2} className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHovered(loc.id)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelectedPlot(null); setSelectedLoc(isSelected ? null : loc); }} />
                      </g>
                    ))}
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        <div className="absolute top-6 left-8 z-40 flex items-center gap-6 pointer-events-none">
          <Link href="/sectors" className="pointer-events-auto inline-flex px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-black/60 backdrop-blur-md text-sm hover:bg-[var(--gold)] hover:text-black transition">← უკან</Link>
        </div>
        <div className="absolute top-24 right-8 z-30 pointer-events-none text-right">
          <h1 className="font-serif-display text-3xl text-[var(--gold-soft)] drop-shadow-md leading-none">{sector.nameKa}</h1>
          <p className="text-sm text-[var(--fg)]/70 mt-2">{sector.subtitleKa}</p>
        </div>

        {prevSector && (
          <Link href={`/sector/${prevSector}`} className="group absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] transition-all">
            <span className="text-[var(--gold)] group-hover:text-black text-2xl font-bold">←</span>
          </Link>
        )}
        {nextSector && (
          <Link href={`/sector/${nextSector}`} className="group absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] transition-all">
            <span className="text-[var(--gold)] group-hover:text-black text-2xl font-bold">→</span>
          </Link>
        )}

        <AnimatePresence>
          {(selectedPlot || selectedLoc) && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="absolute bottom-8 right-8 z-[60] w-[380px] max-h-[80vh] rounded-2xl bg-[var(--panel)]/95 backdrop-blur-2xl border border-[var(--gold)]/40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0 z-10">
                <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase">{selectedPlot ? "ნაკვეთი" : "ლოკაცია"}</p>
                <button onClick={() => { setSelectedPlot(null); setSelectedLoc(null); }} className="text-[var(--fg)]/50 hover:text-[var(--gold)] text-2xl leading-none -mt-1">×</button>
              </div>
              {selectedLoc?.image && (
                <div className="relative w-full h-80 shrink-0 bg-[#0e1510] border-b border-[var(--gold)]/20">
                  <img src={selectedLoc.image} alt={selectedLoc.nameKa} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )}
              <div className="px-6 pt-4 pb-3 shrink-0">
                <h2 className="font-serif-display text-3xl text-[var(--gold-soft)] leading-tight">{selectedPlot ? selectedPlot.id : selectedLoc?.nameKa}</h2>
                {selectedLoc && <p className="text-xs text-[var(--gold)]/70 uppercase tracking-widest mt-1">{categoryLabels[selectedLoc.category]}</p>}
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
      <ProgressWidget />
    </div>
  );
}