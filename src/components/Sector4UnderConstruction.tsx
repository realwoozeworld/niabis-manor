"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";

export default function Sector4UnderConstruction() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a100c] text-[#f4f4f4]">
      {/* ========================================== */}
      {/* Background with Topographic Lines & Ambient Gold Glow */}
      {/* ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle estate photo base with deep blur */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-[6px] scale-105"
          style={{ backgroundImage: "url('/images/overview.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d0a]/95 via-[#0b140f]/90 to-[#060a08]" />

        {/* Dynamic Faint Topographic Map Contours (SVG Background) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] stroke-[var(--gold)]"
          fill="none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-100 200 C300 120 600 280 900 160 C1200 40 1400 240 1600 180" strokeWidth="1.2" />
          <path d="M-100 320 C250 240 580 400 880 280 C1180 160 1380 340 1600 300" strokeWidth="1.5" />
          <path d="M-100 460 C200 380 540 520 860 410 C1150 300 1350 470 1600 420" strokeWidth="1.2" />
          <path d="M-100 600 C220 530 500 660 840 540 C1130 420 1320 610 1600 560" strokeWidth="1.5" />
          <path d="M-100 740 C180 670 470 800 810 680 C1100 560 1300 740 1600 700" strokeWidth="1.2" />
          <path d="M-100 880 C260 810 520 920 850 820 C1150 710 1380 870 1600 830" strokeWidth="1" />
          {/* Contour island circles */}
          <ellipse cx="1150" cy="380" rx="220" ry="120" strokeWidth="1.2" />
          <ellipse cx="1150" cy="380" rx="150" ry="80" strokeWidth="1" />
          <ellipse cx="1150" cy="380" rx="80" ry="40" strokeWidth="0.8" />
          <ellipse cx="280" cy="620" rx="190" ry="100" strokeWidth="1.2" />
          <ellipse cx="280" cy="620" rx="120" ry="60" strokeWidth="1" />
        </svg>

        {/* Soft radial gold and emerald glows behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] rounded-full bg-[radial-gradient(circle,rgba(184,145,47,0.18)_0%,rgba(30,60,38,0.12)_45%,transparent_70%)] blur-[90px]" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#244b30]/15 blur-[120px]" />
      </div>

      {/* ========================================== */}
      {/* 📱 MOBILE HEADER (Exact SectorMap compatibility) */}
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
      {/* 💻 DESKTOP HEADER (Exact SectorMap absolute positioning) */}
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

        {/* Centered Weather Widget */}
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
      {/* Main Glassmorphism Card: Obsidian Glass & Botanical Grapevine */}
      {/* ========================================== */}
      <div className="relative z-10 w-full h-[calc(100vh-140px)] md:h-full flex items-center justify-center px-4 sm:px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0c140e]/75 backdrop-blur-xl border border-[var(--gold)]/25 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_60px_-15px_rgba(184,145,47,0.15)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle inner card border highlight */}
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-b from-white/[0.05] via-transparent to-black/[0.4]" />

          {/* ========================================== */}
          {/* Bespoke Botanical Georgian Grapevine (ვაზი) SVG */}
          {/* ========================================== */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-3 sm:mb-4 flex items-center justify-center">
            {/* Ambient golden aura */}
            <motion.div
              className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(212,178,86,0.22)_0%,rgba(38,76,50,0.15)_50%,transparent_75%)] blur-2xl"
              animate={{
                scale: [0.94, 1.08, 0.94],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <svg
              viewBox="0 0 240 250"
              className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Woody Vine Stem Gradient */}
                <linearGradient id="vineWood" x1="120" y1="230" x2="120" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2c1a0e" />
                  <stop offset="30%" stopColor="#4a301c" />
                  <stop offset="70%" stopColor="#63452c" />
                  <stop offset="100%" stopColor="#435832" />
                </linearGradient>

                {/* Grape Leaves Deep Emerald / Olive Gradient */}
                <linearGradient id="grapeLeaf1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6eb07b" />
                  <stop offset="45%" stopColor="#3d7a4f" />
                  <stop offset="100%" stopColor="#1a4226" />
                </linearGradient>

                <linearGradient id="grapeLeaf2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#89c894" />
                  <stop offset="50%" stopColor="#47885b" />
                  <stop offset="100%" stopColor="#204f2f" />
                </linearGradient>

                <linearGradient id="grapeLeafOlive" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8da857" />
                  <stop offset="55%" stopColor="#557532" />
                  <stop offset="100%" stopColor="#2c4217" />
                </linearGradient>

                {/* Golden Amber & Deep Green Grapes */}
                <radialGradient id="amberGrape" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#fae7a0" />
                  <stop offset="45%" stopColor="#d4b256" />
                  <stop offset="85%" stopColor="#8e6a1d" />
                  <stop offset="100%" stopColor="#523908" />
                </radialGradient>

                <radialGradient id="greenGrape" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#b4e49c" />
                  <stop offset="45%" stopColor="#6ca952" />
                  <stop offset="85%" stopColor="#386b24" />
                  <stop offset="100%" stopColor="#1c3b10" />
                </radialGradient>

                {/* Minimalist Soil Gold Rim */}
                <linearGradient id="goldRim" x1="40" y1="225" x2="200" y2="225" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="25%" stopColor="#b8912f" />
                  <stop offset="50%" stopColor="#f3dd8e" />
                  <stop offset="75%" stopColor="#b8912f" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Minimalist Golden-rimmed Soil Mound */}
              <ellipse cx="120" cy="225" rx="65" ry="11" fill="#131c15" />
              <ellipse cx="120" cy="224" rx="48" ry="7" fill="#19261c" />
              <ellipse cx="120" cy="225" rx="65" ry="11" stroke="url(#goldRim)" strokeWidth="1.8" />

              {/* Floating golden soil particles */}
              <motion.circle
                cx="102"
                cy="224"
                r="1.8"
                fill="#d4b256"
                animate={{ opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <motion.circle
                cx="138"
                cy="225"
                r="1.5"
                fill="#9ed48b"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
              />

              {/* ======================================================== */}
              {/* Step A: Main Curved Woody Vine Stem (ღერო) */}
              {/* Slow organic pathLength grow (0 -> 1 over 1.4s) */}
              {/* ======================================================== */}
              <motion.path
                d="M120 225 C118 195 128 175 116 142 C104 110 126 80 118 42"
                stroke="url(#vineWood)"
                strokeWidth="4.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              />
              {/* Vine bark rib texture */}
              <motion.path
                d="M119 220 C117 195 125 178 116 144"
                stroke="#1c1008"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
              />

              {/* ======================================================== */}
              {/* Step B: Secondary Shoots and Spiraling Tendrils (ულვაშები) */}
              {/* Draw outwards after main stem reaches them (~1.0s - 1.8s) */}
              {/* ======================================================== */}
              {/* Left shoot branch */}
              <motion.path
                d="M117 142 C100 134 82 136 68 126"
                stroke="url(#vineWood)"
                strokeWidth="2.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              />
              {/* Right shoot branch */}
              <motion.path
                d="M119 115 C135 106 156 108 174 98"
                stroke="url(#vineWood)"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              />
              {/* Central shoot stem to grape bunch */}
              <motion.path
                d="M118 135 C122 145 122 152 120 162"
                stroke="#435832"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              />

              {/* Tendril 1: Left curling spiral */}
              <motion.path
                d="M68 126 C56 120 50 110 56 102 C62 95 70 102 66 108 C63 111 59 108 61 104"
                stroke="#7bbd6c"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 1.2, ease: "easeOut" }}
              />
              {/* Tendril 2: Top curling spiral */}
              <motion.path
                d="M118 42 C122 28 132 20 140 24 C148 29 143 38 135 37 C130 36 131 31 135 30"
                stroke="#8ec979"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 1.4, ease: "easeOut" }}
              />
              {/* Tendril 3: Right curling spiral */}
              <motion.path
                d="M174 98 C186 92 195 95 197 104 C198 112 189 115 186 110 C184 106 189 104 191 107"
                stroke="#7bbd6c"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, delay: 1.5, ease: "easeOut" }}
              />

              {/* ======================================================== */}
              {/* Step C: 4-5 Detailed Jagged Grape Leaves (ვაზის ფოთოლი) */}
              {/* Grow/unfurl with scale & rotation (~1.6s - 2.6s) */}
              {/* Gentle continuous wind-sway loop after initial growth */}
              {/* ======================================================== */}

              {/* Leaf 1: Lower Left Vine Leaf */}
              <motion.g
                style={{ transformOrigin: "85px 132px" }}
                initial={{ scale: 0, opacity: 0, rotate: -25 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 1],
                  rotate: [-25, 0, 3, -2, 0],
                }}
                transition={{
                  scale: { duration: 0.8, delay: 1.5, ease: "easeOut" },
                  opacity: { duration: 0.6, delay: 1.5 },
                  rotate: {
                    delay: 2.3,
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* 5-lobed jagged grapevine leaf geometry */}
                <path
                  d="M85 132 
                     C72 138 65 132 55 142 
                     C53 133 46 132 40 134 
                     C44 122 36 116 34 106 
                     C45 106 50 98 56 88 
                     C66 96 74 93 84 94 
                     C88 106 97 114 96 125 
                     Z"
                  fill="url(#grapeLeaf1)"
                  stroke="#1c4524"
                  strokeWidth="1.2"
                />
                {/* Leaf veins */}
                <path d="M85 132 L56 102 M85 132 L40 130 M85 132 L74 98" stroke="#89cf94" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              </motion.g>

              {/* Leaf 2: Upper Left Leaf (Olive / Emerald) */}
              <motion.g
                style={{ transformOrigin: "106 95" }}
                initial={{ scale: 0, opacity: 0, rotate: -15 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 1],
                  rotate: [-15, 0, -3, 2, 0],
                }}
                transition={{
                  scale: { duration: 0.8, delay: 1.7, ease: "easeOut" },
                  opacity: { duration: 0.6, delay: 1.7 },
                  rotate: {
                    delay: 2.5,
                    duration: 5.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <path
                  d="M106 95 
                     C92 98 84 92 76 99 
                     C76 90 68 88 64 88 
                     C70 78 64 70 65 60 
                     C76 63 82 56 90 48 
                     C98 58 108 57 116 60 
                     C116 72 122 80 118 89 
                     Z"
                  fill="url(#grapeLeafOlive)"
                  stroke="#2c4217"
                  strokeWidth="1.2"
                />
                <path d="M106 95 L84 66 M106 95 L68 84 M106 95 L98 55" stroke="#b2d67d" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
              </motion.g>

              {/* Leaf 3: Top Canopy Leaf (Crown) */}
              <motion.g
                style={{ transformOrigin: "118px 55px" }}
                initial={{ scale: 0, opacity: 0, rotate: 10 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 1],
                  rotate: [10, 0, 2.5, -3, 0],
                }}
                transition={{
                  scale: { duration: 0.85, delay: 1.9, ease: "easeOut" },
                  opacity: { duration: 0.65, delay: 1.9 },
                  rotate: {
                    delay: 2.7,
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <path
                  d="M118 55 
                     C108 45 98 48 90 40 
                     C96 32 92 24 95 16 
                     C106 18 114 12 122 8 
                     C130 15 138 12 148 15 
                     C150 25 146 32 152 40 
                     C144 48 135 46 128 55 
                     Z"
                  fill="url(#grapeLeaf2)"
                  stroke="#1c4524"
                  strokeWidth="1.2"
                />
                <path d="M118 55 L122 14 M118 55 L98 32 M118 55 L145 32" stroke="#a2e4ac" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              </motion.g>

              {/* Leaf 4: Right Upper Leaf */}
              <motion.g
                style={{ transformOrigin: "142px 105px" }}
                initial={{ scale: 0, opacity: 0, rotate: 20 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 1],
                  rotate: [20, 0, -2, 3.5, 0],
                }}
                transition={{
                  scale: { duration: 0.85, delay: 2.1, ease: "easeOut" },
                  opacity: { duration: 0.65, delay: 2.1 },
                  rotate: {
                    delay: 2.9,
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <path
                  d="M142 105 
                     C154 112 162 108 172 115 
                     C174 105 182 104 186 104 
                     C182 92 190 85 190 74 
                     C178 76 174 68 166 60 
                     C156 68 148 66 138 68 
                     C136 80 130 88 134 98 
                     Z"
                  fill="url(#grapeLeaf1)"
                  stroke="#1c4524"
                  strokeWidth="1.2"
                />
                <path d="M142 105 L176 82 M142 105 L154 68 M142 105 L178 100" stroke="#89cf94" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              </motion.g>

              {/* Leaf 5: Right Lower Supporting Leaf */}
              <motion.g
                style={{ transformOrigin: "135px 128px" }}
                initial={{ scale: 0, opacity: 0, rotate: 15 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 1],
                  rotate: [15, 0, 2, -2, 0],
                }}
                transition={{
                  scale: { duration: 0.75, delay: 2.3, ease: "easeOut" },
                  opacity: { duration: 0.6, delay: 2.3 },
                  rotate: {
                    delay: 3.0,
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <path
                  d="M135 128 
                     C145 135 155 132 165 140 
                     C167 130 174 130 178 128 
                     C172 118 178 110 175 100 
                     C164 104 158 98 152 92 
                     C144 102 136 102 130 108 
                     Z"
                  fill="url(#grapeLeafOlive)"
                  stroke="#2c4217"
                  strokeWidth="1.1"
                />
              </motion.g>

              {/* ======================================================== */}
              {/* Step D: Hanging Cluster of Golden-Amber & Green Grapes (ყურძნის მტევანი) */}
              {/* Fades in smoothly under leaves (~2.6s - 3.5s) */}
              {/* Gentle pendular wind-sway loop after initial growth */}
              {/* ======================================================== */}
              <motion.g
                id="grape-cluster"
                style={{ transformOrigin: "120px 158px" }}
                initial={{ opacity: 0, scale: 0.4, y: -8 }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0.4, 1, 1],
                  y: [-8, 0, 0],
                  rotate: [0, 0, 2.5, -2.5, 0],
                }}
                transition={{
                  opacity: { duration: 0.9, delay: 2.6, ease: "easeOut" },
                  scale: { duration: 0.9, delay: 2.6, ease: [0.34, 1.56, 0.64, 1] },
                  y: { duration: 0.9, delay: 2.6, ease: "easeOut" },
                  rotate: {
                    delay: 3.5,
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Stemlet connecting grapes */}
                <path d="M120 160 Q121 172 120 188" stroke="#486333" strokeWidth="2" strokeLinecap="round" />
                <path d="M120 166 L112 172" stroke="#486333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M120 168 L128 174" stroke="#486333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M120 178 L114 184" stroke="#486333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M120 180 L126 186" stroke="#486333" strokeWidth="1.5" strokeLinecap="round" />

                {/* --- Row 1 (Top / Widest) --- */}
                <circle cx="106" cy="172" r="6.8" fill="url(#greenGrape)" stroke="#234a17" strokeWidth="0.8" />
                <circle cx="118" cy="170" r="7.2" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />
                <circle cx="130" cy="173" r="7.0" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />
                <circle cx="140" cy="176" r="6.5" fill="url(#greenGrape)" stroke="#234a17" strokeWidth="0.8" />

                {/* --- Row 2 --- */}
                <circle cx="112" cy="182" r="7.2" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />
                <circle cx="124" cy="180" r="7.4" fill="url(#greenGrape)" stroke="#234a17" strokeWidth="0.8" />
                <circle cx="134" cy="184" r="6.8" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />

                {/* --- Row 3 --- */}
                <circle cx="115" cy="193" r="6.8" fill="url(#greenGrape)" stroke="#234a17" strokeWidth="0.8" />
                <circle cx="126" cy="192" r="7.0" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />

                {/* --- Row 4 --- */}
                <circle cx="118" cy="202" r="6.5" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />
                <circle cx="126" cy="203" r="6.2" fill="url(#greenGrape)" stroke="#234a17" strokeWidth="0.8" />

                {/* --- Tip (Bottom single grape) --- */}
                <circle cx="121" cy="212" r="5.5" fill="url(#amberGrape)" stroke="#68470e" strokeWidth="0.8" />

                {/* Glowing Sun Kiss Highlights */}
                <circle cx="116" cy="168" r="1.8" fill="#ffffff" opacity="0.6" />
                <circle cx="123" cy="178" r="1.6" fill="#ffffff" opacity="0.6" />
                <circle cx="124" cy="190" r="1.5" fill="#ffffff" opacity="0.6" />
                <circle cx="119" cy="210" r="1.2" fill="#ffffff" opacity="0.6" />
              </motion.g>

              {/* Floating golden pollen / light specks */}
              <motion.circle
                cx="155"
                cy="140"
                r="1.8"
                fill="#d4b256"
                animate={{
                  cy: [140, 110, 80],
                  cx: [155, 165, 172],
                  opacity: [0, 0.9, 0],
                }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 2.8 }}
              />
              <motion.circle
                cx="85"
                cy="110"
                r="1.5"
                fill="#b8e49c"
                animate={{
                  cy: [110, 85, 60],
                  cx: [85, 78, 70],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 4.8, repeat: Infinity, delay: 3.2 }}
              />
            </svg>
          </div>

          {/* Badge: მზადების ეტაპი */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/35 text-[var(--gold-soft)] text-xs font-medium tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span>მზადების ეტაპი</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif-display text-2xl sm:text-4xl text-[#f4f4f4] mb-3 leading-tight tracking-wide drop-shadow-md">
            გვერდი დამუშავების პროცესშია
          </h1>

          {/* Description text */}
          <p className="text-xs sm:text-sm md:text-base text-[#f4f4f4]/75 leading-relaxed font-sans max-w-lg mb-6 sm:mb-8">
            მე-4 სექტორის საინფორმაციო და ინტერაქტიული სივრცე ამჟამად მზადდება. 
            მალე აქ იხილავთ ხილის ბაღების, ფერმისა და ეკოლოგიური მეურნეობის დეტალურ რუკას.
          </p>

          {/* Buttons / Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/sectors"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] font-medium text-sm shadow-[0_10px_25px_-5px_rgba(212,178,86,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>სხვა სექტორების ნახვა</span>
              <span>→</span>
            </Link>
            <Link
              href="/sector/3"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#162219]/90 hover:bg-[#1f3024] border border-[#2d4233] text-[var(--fg)]/85 hover:text-[var(--gold)] text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>3 სექტორი (აგრო ზონა)</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer minimal info */}
      <footer className="absolute bottom-4 left-0 right-0 z-20 text-center text-xs text-[#f4f4f4]/40 font-sans pointer-events-none">
        ნიაბის მამული · Niabi&apos;s Manor © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
