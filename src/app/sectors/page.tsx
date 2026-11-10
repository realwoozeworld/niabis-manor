"use client";

import Link from "next/link";
import { useState } from "react";
import { sectors } from "@/data/sectors";
import WeatherWidget from "@/components/WeatherWidget";

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
      {/* 📱 MOBILE VIEW (Carousel + Info + Buttons) */}
      {/* ========================================== */}
      <div className="md:hidden relative w-full h-full overflow-y-auto pb-28 bg-[#0e1510]">
        
        {/* 🪄 Ambient Glow Background Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[var(--gold)]/10 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-[#2e5c3e]/20 blur-[100px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 px-6 pt-14 pb-4">
          <p className="text-[10px] text-[var(--gold)]/70 uppercase tracking-[0.2em] mb-1">
            ნიაბის მამული
          </p>
          <h1 className="font-serif-display text-3xl text-[var(--fg)] leading-tight mb-2">
            კეთილი იყოს თქვენი მობრძანება
          </h1>
          <p className="text-sm text-[var(--fg)]/60 mb-4">
            აირჩიე სასურველი სექტორი.
          </p>

          {/* 🔍 Mobile Search Bar */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#131a14]/90 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--fg)]/50 shadow-lg text-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[var(--gold)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs sm:text-sm text-[var(--fg)]/60 font-sans">
              მოძებნე: სპა, ვენახები, N-15...
            </span>
          </button>
        </div>

        {/* 🌤 Centered Weather Widget */}
        <div className="relative z-10 flex justify-center px-6 mb-4">
          <WeatherWidget />
        </div>

        {/* 🎠 Horizontal Carousel (Scroll Snap) - შევამცირე სიმაღლე */}
        <div className="relative z-10 w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 px-6 pb-6 h-[45vh] items-center">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={`/sector/${sector.id}`}
              className="relative flex-shrink-0 snap-center w-[85vw] h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] border border-[#2d3b31] group"
            >
              {/* ფოტო */}
              <img
                src={sector.id === 4 ? '/images/overview.jpg' : sector.image}
                alt={sector.nameKa}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
              />
              
              {/* მუქი გრადიენტი ტექსტისთვის */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-[#0a0f0c]/40 to-transparent opacity-90" />

              {/* ტექსტი (ქვემოთ) */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <h2 className="font-serif-display text-3xl text-[var(--gold-soft)] mb-1">
                  {sector.nameKa}
                </h2>
                <p className="text-[11px] text-[var(--gold)]/80 uppercase tracking-widest mb-3">
                  {sector.subtitleKa}
                </p>
                <p className="text-sm text-[var(--fg)]/70 line-clamp-2 leading-relaxed mb-4">
                  {sectorDescriptions[sector.id]}
                </p>
                <div className="flex items-center gap-2 text-[var(--gold)] text-sm font-medium">
                  <span>გამოკვლევა</span>
                  <span className="w-6 h-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Carousel Hint (წერტილები ქვემოთ) */}
        <div className="relative z-10 flex justify-center gap-2 mb-6">
           {sectors.map((s) => (
             <div key={s.id} className="w-1.5 h-1.5 rounded-full bg-[var(--fg)]/20" />
           ))}
        </div>

        {/* 📝 ინფორმაციული ტექსტი კარუსელის ქვემოთ */}
        <div className="relative z-10 px-6 pb-6">
          <div className="bg-[#131a14]/80 backdrop-blur-md border border-[#2d3b31] rounded-2xl p-5 shadow-lg">
            <h3 className="font-serif-display text-xl text-[var(--gold-soft)] mb-2">
              ნიაბის მამული
            </h3>
            <p className="text-sm text-[var(--fg)]/70 leading-relaxed">
              უნიკალური საცხოვრებელი და აგრო-ტურისტული კომპლექსი, რომელიც აერთიანებს თანამედროვე არქიტექტურას, ტრადიციულ ვენახებსა და ბუნებასთან ჰარმონიას. 
              აირჩიეთ სექტორი, რომ გაეცნოთ დეტალებს, იხილოთ ინტერაქტიული რუკა და დაუკავშირდეთ ჩვენს გუნდს.
            </p>
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

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40">
          <WeatherWidget />
        </div>

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