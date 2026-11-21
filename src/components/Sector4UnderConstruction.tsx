"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";

export default function Sector4UnderConstruction() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0c130e] text-[#f4f4f4]">
      {/* Background with subtle glowing gradient and organic nature ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[3px] scale-105"
          style={{ backgroundImage: "url('/images/overview.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c130e]/95 via-[#0e1711]/85 to-[#080d09]" />
        
        {/* Soft magical glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-[#3d7a4f]/15 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-[var(--gold)]/10 blur-[100px]" />
      </div>

      {/* ========================================== */}
      {/* 📱 MOBILE HEADER (matches SectorMap exact mobile layout) */}
      {/* ========================================== */}
      <div className="md:hidden relative z-20 flex flex-col w-full">
        <div className="flex items-center justify-between px-5 pt-8 pb-1 shrink-0">
          <Link
            href="/sectors"
            className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e]/80 backdrop-blur-md flex items-center justify-center text-[var(--gold)] border border-[#2d3b31] shadow-lg active:scale-95 transition-all"
          >
            ←
          </Link>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[#f4f4f4] font-serif-display text-base sm:text-lg tracking-wide drop-shadow-md">
              ნიაბის მამული
            </span>
            <span className="text-[var(--gold)] font-serif-display text-base sm:text-lg tracking-wide drop-shadow-md">
              4 სექტორი
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="w-10 h-10 shrink-0 rounded-full bg-[#1c261e] border border-[#2d3b31] flex items-center justify-center text-[var(--gold)] shadow-lg active:scale-95 transition-all"
            aria-label="Search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 🌤 Mobile Centered Weather Widget */}
        <div className="flex justify-center px-4 pt-0.5 pb-1 z-20 shrink-0">
          <WeatherWidget size="sm" />
        </div>
      </div>

      {/* ========================================== */}
      {/* 💻 DESKTOP HEADER (matches SectorMap exact desktop absolute positioning) */}
      {/* ========================================== */}
      <div className="hidden md:block">
        {/* Back Button on top-left */}
        <div className="absolute top-6 left-8 z-40 flex items-center gap-6 pointer-events-none">
          <Link
            href="/sectors"
            className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-black/60 backdrop-blur-md text-sm hover:bg-[var(--gold)] hover:text-black transition"
          >
            ← უკან
          </Link>
        </div>

        {/* Centered Weather Widget in exact same position: absolute top-6 left-1/2 -translate-x-1/2 z-40 */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40">
          <WeatherWidget />
        </div>

        {/* Sector title top-right */}
        <div className="absolute top-24 right-8 z-30 pointer-events-none text-right">
          <h1 className="font-serif-display text-3xl text-[var(--gold-soft)] drop-shadow-md leading-none">
            4 სექტორი
          </h1>
          <p className="text-sm text-[var(--fg)]/70 mt-2">ბაღები და ფერმა</p>
        </div>

        {/* Previous Sector navigation arrow */}
        <Link
          href="/sector/3"
          className="group absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] transition-all"
        >
          <span className="text-[var(--gold)] group-hover:text-black text-2xl font-bold">←</span>
        </Link>
      </div>

      {/* ========================================== */}
      {/* Main Content Area: Plant growing animation & Under construction text */}
      {/* ========================================== */}
      <div className="relative z-10 w-full h-[calc(100vh-140px)] md:h-full flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        
        {/* Animated Growing Plant SVG Illustration */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 mb-3 sm:mb-4 flex items-center justify-center">
          {/* Subtle halo glow behind the plant */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-t from-[#2a4d35]/30 to-[#d4b256]/20 blur-2xl"
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <svg
            viewBox="0 0 200 220"
            className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground / Soil Mound */}
            <ellipse cx="100" cy="190" rx="60" ry="12" fill="#1b281f" stroke="#2e4233" strokeWidth="2" />
            <ellipse cx="100" cy="189" rx="42" ry="7" fill="#24362a" />
            
            {/* Small glowing soil sparkles / seeds */}
            <motion.circle
              cx="80"
              cy="188"
              r="2"
              fill="#d4b256"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="122"
              cy="189"
              r="2.5"
              fill="#95c78f"
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: 0.5 }}
            />

            {/* Stem: Grows upward with strokeDashoffset */}
            <motion.path
              d="M100 190 Q98 140 100 95 Q102 65 100 48"
              stroke="#5ba46a"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0.15 }}
              animate={{ pathLength: [0.2, 1, 1, 0.2] }}
              transition={{
                duration: 6,
                times: [0, 0.45, 0.85, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Lower Left Leaf */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 0, 1, 1, 0],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.2, 0.4, 0.85, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "99px 150px" }}
            >
              <path
                d="M99 150 C75 145 60 125 65 108 C80 120 95 138 99 150 Z"
                fill="url(#leafGradLeft)"
                stroke="#73ba82"
                strokeWidth="1.5"
              />
              <path d="M99 150 Q80 132 70 115" stroke="#366b42" strokeWidth="1" strokeLinecap="round" />
            </motion.g>

            {/* Lower Right Leaf */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 0, 1, 1, 0],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.28, 0.5, 0.85, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "101px 130px" }}
            >
              <path
                d="M101 130 C125 125 140 105 135 88 C120 100 105 118 101 130 Z"
                fill="url(#leafGradRight)"
                stroke="#73ba82"
                strokeWidth="1.5"
              />
              <path d="M101 130 Q120 112 130 95" stroke="#366b42" strokeWidth="1" strokeLinecap="round" />
            </motion.g>

            {/* Upper Left Leaf */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 0, 1, 1, 0],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.38, 0.6, 0.85, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "100px 92px" }}
            >
              <path
                d="M100 92 C82 82 72 65 78 52 C90 62 98 78 100 92 Z"
                fill="url(#leafGradLeft)"
                stroke="#8ed49c"
                strokeWidth="1.5"
              />
              <path d="M100 92 Q88 77 82 60" stroke="#3b7a4a" strokeWidth="1" strokeLinecap="round" />
            </motion.g>

            {/* Top Sprout / Bud (Blooms at peak growth) */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 0, 1.1, 1, 0],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.45, 0.68, 0.85, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "100px 48px" }}
            >
              <circle cx="100" cy="46" r="9" fill="url(#goldBudGrad)" />
              <circle cx="95" cy="44" r="6" fill="#e8cf78" opacity="0.9" />
              <circle cx="105" cy="44" r="6" fill="#e8cf78" opacity="0.9" />
              <circle cx="100" cy="39" r="6.5" fill="#f4df91" />
              <circle cx="100" cy="44" r="3.5" fill="#ffffff" />
            </motion.g>

            {/* Glowing floating pollen particles */}
            <motion.circle
              cx="92"
              cy="40"
              r="2"
              fill="#d4b256"
              animate={{
                cy: [40, 20, 10],
                cx: [92, 85, 80],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
            />
            <motion.circle
              cx="108"
              cy="42"
              r="2.5"
              fill="#f7e49f"
              animate={{
                cy: [42, 22, 12],
                cx: [108, 118, 125],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 3.2, repeat: Infinity, delay: 2.8 }}
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="leafGradLeft" x1="60" y1="108" x2="99" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#89d899" />
                <stop offset="0.6" stopColor="#4e995e" />
                <stop offset="1" stopColor="#2c6239" />
              </linearGradient>
              <linearGradient id="leafGradRight" x1="140" y1="88" x2="101" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9de2ab" />
                <stop offset="0.6" stopColor="#55a566" />
                <stop offset="1" stopColor="#2c6239" />
              </linearGradient>
              <linearGradient id="goldBudGrad" x1="90" y1="36" x2="110" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f5e08b" />
                <stop offset="0.5" stopColor="#d4b256" />
                <stop offset="1" stopColor="#a37d22" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Section title & badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-soft)] text-xs tracking-wider uppercase mb-3">
          <span>მზადების ეტაპი</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#f4f4f4] mb-3 leading-tight tracking-wide drop-shadow-md">
          გვერდი დამუშავების პროცესშია
        </h1>

        {/* Description text */}
        <p className="text-sm sm:text-base text-[#f4f4f4]/70 leading-relaxed font-sans max-w-lg mb-6 sm:mb-8">
          მე-4 სექტორის საინფორმაციო და ინტერაქტიული სივრცე ამჟამად მზადდება. 
          მალე აქ იხილავთ ხილის ბაღების, ფერმისა და ეკოლოგიური მეურნეობის დეტალურ რუკას.
        </p>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/sectors"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] font-medium text-sm shadow-[0_10px_25px_-5px_rgba(212,178,86,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>სხვა სექტორების ნახვა</span>
            <span>→</span>
          </Link>
          <Link
            href="/sector/3"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#162219]/80 hover:bg-[#1f3024] border border-[#2d4233] text-[var(--fg)]/80 hover:text-[var(--gold)] text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>3 სექტორი (აგრო ზონა)</span>
          </Link>
        </div>
      </div>

      {/* Footer minimal info */}
      <footer className="absolute bottom-4 left-0 right-0 z-20 text-center text-xs text-[#f4f4f4]/40 font-sans pointer-events-none">
        ნიაბის მამული · Niabi&apos;s Manor © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
