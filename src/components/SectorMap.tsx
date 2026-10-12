"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

type CalibrateMode = "none" | "dot" | "polygon";

export default function SectorMap({ sector }: { sector: Sector }) {
  const prevSector = sector.id > 1 ? sector.id - 1 : null;
  const nextSector = sector.id < 4 ? sector.id + 1 : null;
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const [calibrateMode] = useState<CalibrateMode>(() => {
    if (typeof window === "undefined") return "none";
    const search = window.location.search;
    if (search.includes("calibrate=2")) return "polygon";
    if (search.includes("calibrate=1")) return "dot";
    return "none";
  });

  const [currentPolygon, setCurrentPolygon] = useState<Array<{ x: number; y: number }>>([]);
  const [completedPolygons, setCompletedPolygons] = useState<
    Record<string, Array<{ x: number; y: number }>>
  >({});
  const [currentPlotIndex, setCurrentPlotIndex] = useState(0);

  const vb = VIEWBOX[sector.id] ?? { w: 2804, h: 1536 };
  const VB_W = vb.w;
  const VB_H = vb.h;

  const plots = sector.id === 2 ? sector2Plots : sector.id === 3 ? sector3Plots : [];
  const locations = sector.id === 1 ? sector1Locations : [];

  const handleCalibrateClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (calibrateMode === "none") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * VB_W);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * VB_H);

    if (calibrateMode === "dot") {
      console.log(`${x},${y}`);
      return;
    }

    const newCurrent = [...currentPolygon, { x, y }];
    if (newCurrent.length === 4) {
      const currentPlot = plots[currentPlotIndex];
      if (currentPlot) {
        const updated = { ...completedPolygons, [currentPlot.id]: newCurrent };
        setCompletedPolygons(updated);
        setCurrentPolygon([]);

        if (currentPlotIndex + 1 >= plots.length) {
          console.log("=== ALL DONE ===");
          console.log(JSON.stringify(updated, null, 2));
        } else {
          setCurrentPlotIndex(currentPlotIndex + 1);
        }
      }
    } else {
      setCurrentPolygon(newCurrent);
    }
  };

  const closeCard = () => {
    setSelectedPlot(null);
    setSelectedLoc(null);
    setShowRegister(false);
  };

  const currentPlot = plots[currentPlotIndex];
  const progress = `${Object.keys(completedPolygons).length} / ${plots.length}`;

  const getPolygonPoints = (poly: Array<{ x: number; y: number }>) =>
    poly.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full h-full">
      <Link
        href="/sectors"
        className="absolute top-6 right-8 z-30 px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-black/50 backdrop-blur text-sm hover:bg-[var(--gold)] hover:text-black transition"
      >
        ← უკან
      </Link>

          {/* Prev sector arrow */}
      {prevSector && (
                <Link
          href={`/sector/${prevSector}`}
          className="group absolute left-6 top-1/2 -translate-y-1/2 z-30"
          aria-label={`Sector ${prevSector}`}
        >
          <motion.div
            whileHover={{ scale: 1.12, x: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-14 h-14 rounded-full
                       flex items-center justify-center
                       bg-black/40 backdrop-blur-md
                       border border-[var(--gold)]/30
                       group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)]
                       transition-colors duration-300
                       shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <motion.span
              animate={{ x: [0, -3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[var(--gold)] group-hover:text-black transition-colors text-2xl font-bold"
            >
              ←
            </motion.span>
          </motion.div>

          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg
                           bg-black/90 backdrop-blur text-[var(--gold-soft)]
                           text-xs whitespace-nowrap opacity-0
                           group-hover:opacity-100 transition-opacity
                           pointer-events-none
                           border border-[var(--gold)]/30">
            {prevSector} სექტორი
          </span>
        </Link>
      )}

      {/* Next sector arrow */}
      {nextSector && (
                <Link
          href={`/sector/${nextSector}`}
          className="group absolute right-6 top-1/2 -translate-y-1/2 z-30"
          aria-label={`Sector ${nextSector}`}
        >
          <motion.div
            whileHover={{ scale: 1.12, x: 4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-14 h-14 rounded-full
                       flex items-center justify-center
                       bg-black/40 backdrop-blur-md
                       border border-[var(--gold)]/30
                       group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)]
                       transition-colors duration-300
                       shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[var(--gold)] group-hover:text-black transition-colors text-2xl font-bold"
            >
              →
            </motion.span>
          </motion.div>

          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg
                           bg-black/90 backdrop-blur text-[var(--gold-soft)]
                           text-xs whitespace-nowrap opacity-0
                           group-hover:opacity-100 transition-opacity
                           pointer-events-none
                           border border-[var(--gold)]/30">
            {nextSector} სექტორი
          </span>
        </Link>
      )}

      <div className="absolute top-6 left-8 z-30">
        <h1 className="font-serif-display text-3xl text-[var(--gold-soft)]">
          {sector.nameKa}
        </h1>
        <p className="text-sm text-[var(--fg)]/70">{sector.subtitleKa}</p>
      </div>

      {calibrateMode === "polygon" && (
        <div className="absolute top-24 left-8 z-30 bg-red-600/90 text-white px-5 py-3 rounded-lg text-sm space-y-1">
          <p className="font-bold">POLYGON MODE — {progress}</p>
          {currentPlot && (
            <p>
              ახლა: <strong>{currentPlot.id}</strong> — დააჭირე 4 კუთხეს ({currentPolygon.length}/4)
            </p>
          )}
        </div>
      )}

      {calibrateMode === "dot" && (
        <div className="absolute top-24 left-8 z-30 bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm">
          DOT MODE — click each plot center, copy coords from console
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
          {/* Sector 2 & 3 — plots */}
          {plots.length > 0 && (
            <g className="pointer-events-auto">
              {plots.map((plot) => {
                const isHovered = hovered === plot.id;
                const isSelected = selectedPlot?.id === plot.id;
                const isActive = isHovered || isSelected;

                let cx: number | undefined;
                let cy: number | undefined;
                if (plot.polygon && plot.polygon.length > 0) {
                  cx = plot.polygon.reduce((s, p) => s + p.x, 0) / plot.polygon.length;
                  cy = plot.polygon.reduce((s, p) => s + p.y, 0) / plot.polygon.length;
                } else if (plot.x != null && plot.y != null) {
                  cx = plot.x;
                  cy = plot.y;
                }

                if (plot.polygon && plot.polygon.length > 0) {
                  const isSelectedNotHovered = isSelected && !isHovered;

                  const polyFill = isSelectedNotHovered
                    ? "rgba(160, 160, 160, 0.55)"
                    : isHovered
                    ? "rgba(212, 178, 86, 0.65)"
                    : plot.status === "sold"
                    ? "rgba(200, 60, 60, 0.45)"
                    : plot.status === "reserved"
                    ? "rgba(90, 155, 213, 0.5)"
                    : "rgba(184, 145, 47, 0.35)";

                  const polyStroke = isSelectedNotHovered
                    ? "rgba(220, 220, 220, 1)"
                    : isHovered
                    ? "rgba(255, 220, 120, 1)"
                    : plot.status === "sold"
                    ? "rgba(230, 80, 80, 0.95)"
                    : plot.status === "reserved"
                    ? "rgba(90, 155, 213, 0.95)"
                    : "rgba(184, 145, 47, 0.9)";

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
                        onClick={() => {
                          setSelectedLoc(null);
                          setSelectedPlot(isSelected ? null : plot);
                          setShowRegister(false);
                        }}
                      />
                      {cx != null && cy != null && (
                        <text
                          x={cx}
                          y={cy + 9}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={26}
                          fontWeight={700}
                          className="pointer-events-none select-none"
                          style={{
                            paintOrder: "stroke",
                            stroke: "rgba(0, 0, 0, 0.7)",
                            strokeWidth: 4,
                            strokeLinejoin: "round",
                          }}
                        >
                          {plot.id.replace("N-", "")}
                        </text>
                      )}
                    </g>
                  );
                }

                if (cx == null || cy == null) return null;

                const dotColor = isActive
                  ? "rgba(212, 178, 86, 1)"
                  : plot.status === "sold"
                  ? "rgba(120, 90, 50, 0.95)"
                  : plot.status === "reserved"
                  ? "rgba(90, 155, 213, 0.9)"
                  : "rgba(184, 145, 47, 0.85)";

                return (
                  <g key={plot.id}>
                    {isActive && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={44}
                        fill="rgba(212, 178, 86, 0.25)"
                        className="pointer-events-none"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 34 : 28}
                      fill={dotColor}
                      stroke="rgba(255,255,255,0.95)"
                      strokeWidth={3}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHovered(plot.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        setSelectedLoc(null);
                        setSelectedPlot(isSelected ? null : plot);
                        setShowRegister(false);
                      }}
                    />
                    <text
                      x={cx}
                      y={cy + 8}
                      textAnchor="middle"
                      fill={plot.status === "sold" ? "#ece5d3" : "#0e1510"}
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

          {/* Polygon calibration previews */}
          {calibrateMode === "polygon" && currentPolygon.length > 0 && (
            <g className="pointer-events-none">
              {currentPolygon.length > 1 && (
                <polyline
                  points={getPolygonPoints(currentPolygon)}
                  fill="none"
                  stroke="rgba(255, 80, 80, 0.9)"
                  strokeWidth={3}
                  strokeDasharray="8 6"
                />
              )}
              {currentPolygon.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={10}
                  fill="rgba(255, 80, 80, 1)"
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}

          {calibrateMode === "polygon" &&
            Object.entries(completedPolygons).map(([id, poly]) => (
              <polygon
                key={id}
                points={getPolygonPoints(poly)}
                fill="rgba(100, 220, 100, 0.25)"
                stroke="rgba(100, 220, 100, 0.9)"
                strokeWidth={2}
                className="pointer-events-none"
              />
            ))}

          {/* Sector 1 — locations */}
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
                    {loc.points.length > 1 &&
                      loc.points.map((pt, i) => (
                        <line
                          key={i}
                          x1={labelX}
                          y1={labelY}
                          x2={pt.x}
                          y2={pt.y}
                          stroke={isActive ? "rgba(212, 178, 86, 0.95)" : "rgba(212, 178, 86, 0.45)"}
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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            className="absolute bottom-6 right-6 z-40 w-[400px] max-h-[85vh] rounded-2xl border border-[var(--gold)]/40 bg-[var(--panel)]/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col"
          >
                       {/* Header — always at top */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0 border-b border-[var(--gold)]/20">
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

            {/* Photo */}
            {selectedLoc?.image && (
              <div className="relative w-full aspect-[16/10] shrink-0">
                <img
                  src={selectedLoc.image}
                  alt={selectedLoc.nameKa}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)]/60 via-transparent to-transparent" />
              </div>
            )}
            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 no-scrollbar">
              <div className="px-6 pt-4 pb-3">
                <h2 className="font-serif-display text-3xl text-[var(--gold-soft)] leading-tight">
                  {selectedPlot ? selectedPlot.id : selectedLoc?.nameKa}
                </h2>
                {selectedLoc && (
                  <p className="text-xs text-[var(--fg)]/50 mt-1">
                    {selectedLoc.nameEn}
                  </p>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent mx-6" />

              {/* Plot content */}
              {selectedPlot && !showRegister && (
                <>
                  <dl className="px-6 py-5 space-y-4 text-sm">
                    <div className="flex justify-between items-baseline gap-3">
                      <dt className="text-[var(--fg)]/50">მფლობელი</dt>
                      <dd className="text-base text-right">
                        {selectedPlot.ownerKa || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between items-baseline gap-3">
                      <dt className="text-[var(--fg)]/50">ფართობი</dt>
                      <dd className="text-base text-right">
                        {selectedPlot.areaSqm
                          ? `${selectedPlot.areaSqm.toLocaleString("ka-GE")} კვ.მ`
                          : "—"}
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

                  {sector.id === 3 && selectedPlot.status === "available" && (
                    <div className="px-6 pb-5">
                      <button
                        onClick={() => setShowRegister(true)}
                        className="w-full py-2.5 rounded-lg bg-[var(--gold)] text-black font-medium text-sm hover:bg-[var(--gold-soft)] transition"
                      >
                        დაინტერესებული ვარ
                      </button>
                    </div>
                  )}
                </>
              )}

              {selectedPlot && showRegister && (
                <RegisterForm
                  plotId={selectedPlot.id}
                  onBack={() => setShowRegister(false)}
                />
              )}

              {/* Location content */}
              {selectedLoc && (
                <div className="px-6 py-5 space-y-4">
                  <p className="text-xs text-[var(--gold)]/70 uppercase tracking-[0.15em]">
                    {categoryLabels[selectedLoc.category]}
                  </p>

                  {selectedLoc.descriptionKa && (
                    <p className="text-sm text-[var(--fg)]/85 leading-relaxed">
                      {selectedLoc.descriptionKa}
                    </p>
                  )}

                  {selectedLoc.features && selectedLoc.features.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] text-[var(--gold)]/60 uppercase tracking-widest mb-2">
                        მახასიათებლები
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLoc.features.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 rounded-full text-[11px] bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold-soft)]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}