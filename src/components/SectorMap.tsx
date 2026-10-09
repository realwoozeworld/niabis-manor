"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Sector } from "@/data/sectors";
import { sector2Plots, type Plot } from "@/data/sector2-plots";
import {
  sector1Locations,
  categoryColors,
  type Location,
} from "@/data/sector1-locations";

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
  const [calibrate] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.location.search.includes("calibrate=1");
  });

  const vb = VIEWBOX[sector.id] ?? { w: 2804, h: 1536 };
  const VB_W = vb.w;
  const VB_H = vb.h;

  const plots = sector.id === 2 ? sector2Plots : [];
  const locations = sector.id === 1 ? sector1Locations : [];

  const handleCalibrateClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!calibrate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * VB_W);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * VB_H);
    console.log(`${x},${y}`);
  };

  const closeCard = () => {
    setSelectedPlot(null);
    setSelectedLoc(null);
  };

  return (
    <div className="relative w-full h-full">
      <Link
        href="/"
        className="absolute top-6 right-8 z-30 px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-black/50 backdrop-blur text-sm hover:bg-[var(--gold)] hover:text-black transition"
      >
        ← უკან
      </Link>

      <div className="absolute top-6 left-8 z-30">
        <h1 className="font-serif-display text-3xl text-[var(--gold-soft)]">
          {sector.nameKa}
        </h1>
        <p className="text-sm text-[var(--fg)]/70">{sector.subtitleKa}</p>
      </div>

      {calibrate && (
        <div className="absolute top-24 left-8 z-30 bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm">
          CALIBRATION MODE — click each location, copy coords from console (F12)
        </div>
      )}

      <div className="relative w-full h-full">
        <img
          src={sector.image}
          alt={sector.nameEn}
          className="w-full h-full object-cover"
          onClick={handleCalibrateClick}
        />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Sector 2 — plots */}
          {plots.length > 0 && (
            <g className="pointer-events-auto">
              {plots.map((plot) => {
                if (plot.x == null || plot.y == null) return null;
                const isHovered = hovered === plot.id;
                const isSelected = selectedPlot?.id === plot.id;
                const isActive = isHovered || isSelected;
                return (
                  <g key={plot.id}>
                    {isActive && (
                      <circle
                        cx={plot.x}
                        cy={plot.y}
                        r={44}
                        fill="rgba(212, 178, 86, 0.25)"
                        className="pointer-events-none"
                      />
                    )}
                    <circle
                      cx={plot.x}
                      cy={plot.y}
                      r={isActive ? 34 : 28}
                      fill={isActive ? "rgba(212, 178, 86, 1)" : "rgba(184, 145, 47, 0.75)"}
                      stroke="rgba(255,255,255,0.95)"
                      strokeWidth={3}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHovered(plot.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        setSelectedLoc(null);
                        setSelectedPlot(isSelected ? null : plot);
                      }}
                    />
                    <text
                      x={plot.x}
                      y={plot.y + 8}
                      textAnchor="middle"
                      fill="#0e1510"
                      fontSize={22}
                      fontWeight={700}
                      className="pointer-events-none select-none"
                    >
                      {plot.id.replace("N-", "")}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Sector 1 — locations with multi-point connectors */}
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
                const labelY =
                  loc.labelY ??
                  Math.min(...loc.points.map((p) => p.y)) - 70;
                const labelWidth = loc.nameKa.length * 16 + 40;

                return (
                  <g key={loc.id}>
                    {loc.points.length > 1 &&
                      loc.points.map((pt, i) => (
                        <line
                          key={i}
                          x1={labelX}
                          y1={labelY}
                          x2={pt.x}
                          y2={pt.y}
                          stroke={
                            isActive
                              ? "rgba(212, 178, 86, 0.95)"
                              : "rgba(212, 178, 86, 0.45)"
                          }
                          strokeWidth={isActive ? 3 : 2}
                          strokeDasharray="6 4"
                          className="pointer-events-none transition-all duration-200"
                        />
                      ))}

                    {isActive && (
                      <g className="pointer-events-none">
                        <rect
                          x={labelX - labelWidth / 2}
                          y={labelY - 22}
                          width={labelWidth}
                          height={44}
                          rx={22}
                          fill="rgba(14, 21, 16, 0.95)"
                          stroke="rgba(212, 178, 86, 0.8)"
                          strokeWidth={2}
                        />
                        <text
                          x={labelX}
                          y={labelY + 8}
                          textAnchor="middle"
                          fill="#d4b256"
                          fontSize={22}
                          fontWeight={600}
                        >
                          {loc.nameKa}
                        </text>
                      </g>
                    )}

                    {loc.points.map((pt, i) => (
                      <g key={i}>
                        {isActive && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={26}
                            fill={dotColor}
                            opacity={0.2}
                            className="pointer-events-none"
                          />
                        )}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isActive ? 12 : 8}
                          fill={dotColor}
                          stroke="rgba(255,255,255,0.95)"
                          strokeWidth={2}
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHovered(loc.id)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => {
                            setSelectedPlot(null);
                            setSelectedLoc(isSelected ? null : loc);
                          }}
                        />
                      </g>
                    ))}
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Floating card */}
      <AnimatePresence>
        {(selectedPlot || selectedLoc) && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="absolute bottom-8 right-8 z-40 w-[340px] rounded-2xl border border-[var(--gold)]/40 bg-[var(--panel)]/85 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase">
                {selectedPlot ? "ნაკვეთი" : "ლოკაცია"}
              </p>
              <button
                onClick={closeCard}
                className="text-[var(--fg)]/50 hover:text-[var(--gold)] transition-colors text-xl leading-none -mt-1"
              >
                ×
              </button>
            </div>

            <div className="px-6 pb-4">
              <h2 className="font-serif-display text-3xl text-[var(--gold-soft)]">
                {selectedPlot ? selectedPlot.id : selectedLoc?.nameKa}
              </h2>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

            {selectedPlot && (
              <dl className="px-6 py-5 space-y-4 text-sm">
                <div className="flex justify-between items-baseline gap-3">
                  <dt className="text-[var(--fg)]/50">მფლობელი</dt>
                  <dd className="text-base text-right">
                    {selectedPlot.ownerKa}
                  </dd>
                </div>
                <div className="flex justify-between items-baseline gap-3">
                  <dt className="text-[var(--fg)]/50">ფართობი</dt>
                  <dd className="text-base text-right">
                    {selectedPlot.areaSqm.toLocaleString("ka-GE")}{" "}
                    <span className="text-[var(--fg)]/60">კვ.მ</span>
                  </dd>
                </div>
                <div className="flex justify-between items-baseline gap-3">
                  <dt className="text-[var(--fg)]/50">სტატუსი</dt>
                  <dd className="text-base text-right">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold-soft)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-soft)]" />
                      {selectedPlot.status === "sold"
                        ? "გაყიდული"
                        : selectedPlot.status === "reserved"
                        ? "დაჯავშნილი"
                        : "თავისუფალი"}
                    </span>
                  </dd>
                </div>
              </dl>
            )}

            {selectedLoc && (
              <div className="px-6 py-5">
                <p className="text-sm text-[var(--fg)]/70">
                  {selectedLoc.nameEn}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}