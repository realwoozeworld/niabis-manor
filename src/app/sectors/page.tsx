"use client";

import Link from "next/link";
import { useState } from "react";
import { sectors } from "@/data/sectors";

// შენი სწორი კოორდინატები (დესკტოპისთვის)
const hotspots: Record<
  number,
  { points: string; labelX: number; labelY: number }
> = {
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
    points: "1551,1513 1461,1485 1137,481 945,85 1151,47 1415,47 1775,1363 1725,1461 1657,1513",
    labelX: 1360,
    labelY: 780,
  },
  4: {
    points: "1530,540 1780,560 2050,620 2320,720 2520,850 2640,1000 2650,1130 2520,1200 2200,1230 1900,1220 1650,1180 1550,1080 1530,900 1520,700",
    labelX: 2080,
    labelY: 880,
  },
};

const sectorDescriptions: Record<number, string> = {
  1: "მოიცავს ვენახებს, სპა ცენტრს, საცურაო აუზს, სასადილოს, კოტეჯებსა და სხვა ინფრასტრუქტურას.",
  2: "16 საცხოვრებელი ნაკვეთი ქვის არქიტექტურის სახლებით. ამჟამად ყველა ნაკვეთი გაყიდულია.",
  3: "აგრო-ტურიზმის ზონა: სათბურები, ხეხილის ბაღები, ტბა. 36 ნაკვეთი, რომელთა ნაწილიც იყიდება.",
  4: "ხილის ბაღები, ფერმა და ეკოლოგიური მეურნეობა ბუნებაში.",
};

export default function SectorsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--bg)]">
      
      {/* ========================================== */}
      {/* 📱 MOBILE VIEW (App Style with Ambient Glow) */}
      {/* ========================================== */}
      <div className="md:hidden relative w-full h-full overflow-y-auto pb-12 bg-[#0e1510]">
        
        {/* 🪄 Ambient Glow Background Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[var(--gold)]/10 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-[#2e5c3e]/20 blur-[100px]" />
        </div>

        {/* კონტენტი (z-10) */}
        <div className="relative z-10 px-5 flex flex-col gap-6 pt-12">
          
          {/* Header & Greeting */}
          <div>
            <p className="text-[10px] text-[var(--gold)]/70 uppercase tracking-[0.2em] mb-1">
              ნიაბის მამული
            </p>
            <h1 className="font-serif-display text-4xl text-[var(--fg)] leading-tight">
              გამარჯობა! 👋
            </h1>
            <p className="text-sm text-[var(--fg)]/60 mt-2">
              აირჩიე სასურველი სექტორი და გამოიკვლიე ტერიტორია.
            </p>
          </div>

          {/* Search Bar (Visual only) */}
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="მოძებნე სექტორი..." 
              className="w-full bg-[#131a14] border border-[#2d3b31] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/40 focus:outline-none focus:border-[var(--gold)]/50 shadow-lg"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg)]/40">🔍</span>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-6 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-[var(--gold)] font-medium uppercase tracking-widest">სექტორები</h2>
            </div>

            {sectors.map((sector) => (
              <Link
                key={sector.id}
                href={`/sector/${sector.id}`}
                className="group relative flex flex-col w-full rounded-3xl overflow-hidden border border-[#2d3b31] bg-[#131a14] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] active:scale-[0.98] transition-transform"
              >
                {/* 🖼️ ფოტო */}
                <div className="relative w-full h-56">
                  <img
                    src={sector.id === 4 ? '/images/overview.jpg' : sector.image}
                    alt={sector.nameKa}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131a14] via-[#131a14]/30 to-transparent opacity-90" />
                </div>

                {/* 📝 ტექსტი */}
                <div className="p-5 relative z-10">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-serif-display text-2xl text-[var(--gold-soft)]">
                      {sector.nameKa}
                    </h3>
                    <span className="w-8 h-8 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold)] text-lg shrink-0">
                      →
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-[var(--gold)]/70 uppercase tracking-widest mb-3">
                    {sector.subtitleKa}
                  </p>
                  
                  <p className="text-sm text-[var(--fg)]/80 leading-relaxed">
                    {sectorDescriptions[sector.id]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 💻 DESKTOP VIEW (რუკა) - უცვლელია */}
      {/* ========================================== */}
      <div className="hidden md:block w-full h-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/overview.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <header className="absolute top-6 left-8 z-20 pointer-events-none">
          <img src="/images/logo.png" alt="Niabi's Manor" className="h-20" />
        </header>

        <svg
          viewBox="0 0 2718 1536"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          {sectors.map((sector) => {
            const h = hotspots[sector.id];
            if (!h) return null;
            const isHovered = hovered === sector.id;

            return (
              <g key={sector.id}>
                <Link href={`/sector/${sector.id}`}>
                  <polygon
                    points={h.points}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      fill: isHovered ? "rgba(184, 145, 47, 0.30)" : "rgba(184, 145, 47, 0)",
                      stroke: isHovered ? "rgba(212, 178, 86, 1)" : "rgba(212, 178, 86, 0)",
                      strokeWidth: 6,
                    }}
                    onMouseEnter={() => setHovered(sector.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                </Link>

                {isHovered && (
                  <g className="pointer-events-none">
                    <rect
                      x={h.labelX - 140}
                      y={h.labelY - 40}
                      width={280}
                      height={80}
                      rx={40}
                      fill="rgba(14, 21, 16, 0.9)"
                      stroke="rgba(212, 178, 86, 0.7)"
                      strokeWidth={3}
                    />
                    <text
                      x={h.labelX}
                      y={h.labelY + 12}
                      textAnchor="middle"
                      fill="#d4b256"
                      fontSize={34}
                      fontWeight={600}
                    >
                      {sector.nameKa}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </main>
  );
}