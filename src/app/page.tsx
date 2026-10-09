"use client";

import Link from "next/link";
import { useState } from "react";
import { sectors } from "@/data/sectors";

// Rough polygons — will be replaced with traced coordinates later
// Format: viewBox is 0 0 2718 1536 (matches overview.jpg dimensions)
const hotspots: Record<number, { points: string; labelX: number; labelY: number }> = {
   1: {
    points: "383,1203 223,1203 9,1039 9,853 233,1007 477,977 713,993 865,1023 897,1307 640,1255",
    labelX: 450,
    labelY: 1080,
  },
    2: {
    points: "900,1305 943,1393 1049,1477 1217,1529 1335,1529 1423,1497 1117,657 961,609 785,597",
    labelX: 1100,
    labelY: 1050,
  },
  3: {
    points:
      "880,60 1200,55 1500,55 1780,75 2020,120 2200,200 2260,340 2230,470 2140,510 1800,520 1450,500 1150,470 950,440 885,360 875,220",
    labelX: 1520,
    labelY: 280,
  },
};

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/overview.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Logo */}
      <header className="absolute top-6 left-8 z-20 pointer-events-none">
        <img src="/images/logo.png" alt="Niabi's Manor" className="h-20" />
      </header>

      {/* Interactive map layer */}
      <svg
        viewBox="0 0 2718 1536"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {sectors.map((sector) => {
          const hotspot = hotspots[sector.id];
          if (!hotspot) return null;
          const isHovered = hovered === sector.id;

          return (
            <g key={sector.id}>
              <Link href={`/sector/${sector.id}`}>
                <polygon
                  points={hotspot.points}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    fill: isHovered ? "rgba(184, 145, 47, 0.25)" : "rgba(184, 145, 47, 0)",
                    stroke: isHovered ? "rgba(212, 178, 86, 1)" : "rgba(212, 178, 86, 0)",
                    strokeWidth: 4,
                  }}
                  onMouseEnter={() => setHovered(sector.id)}
                  onMouseLeave={() => setHovered(null)}
                />
              </Link>

              {/* Label appears on hover */}
              {isHovered && (
                <g className="pointer-events-none">
                  <rect
                    x={hotspot.labelX - 130}
                    y={hotspot.labelY - 32}
                    width={260}
                    height={64}
                    rx={32}
                    fill="rgba(14, 21, 16, 0.85)"
                    stroke="rgba(212, 178, 86, 0.6)"
                    strokeWidth={2}
                  />
                  <text
                    x={hotspot.labelX}
                    y={hotspot.labelY + 10}
                    textAnchor="middle"
                    fill="#d4b256"
                    fontSize={28}
                    fontWeight={500}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {sector.nameKa}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </main>
  );
}