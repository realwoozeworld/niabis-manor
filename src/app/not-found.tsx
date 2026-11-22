"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0e1510] text-[#f4f4f4] flex flex-col justify-between select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-[6px] scale-105"
          style={{ backgroundImage: "url('/images/overview.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1510]/95 via-[#0c130e]/90 to-[#080d09]" />
        
        {/* Soft atmospheric backlight behind the layout */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(184,145,47,0.12)_0%,rgba(20,40,26,0.08)_50%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(30,58,41,0.18)_0%,transparent_70%)] blur-[90px]" />
      </div>

      {/* Top Header / Brand */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 pt-8 pb-4 w-full max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group active:scale-95 transition-transform"
        >
          <span className="font-serif-display text-lg sm:text-xl text-[var(--gold)] tracking-wide">
            ნიაბის მამული
          </span>
        </Link>

        <Link
          href="/sectors"
          className="px-4 py-2 rounded-full bg-[#162219]/80 hover:bg-[#1f3024] border border-[#2d4233] text-xs sm:text-sm text-[var(--gold-soft)] transition-all shadow-md"
        >
          სექტორები →
        </Link>
      </header>

      {/* Main Content Area: Editorial Asymmetric Split Layout with Watermark & Snapped Branch SVG */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-8">
        
        {/* ========================================================= */}
        {/* Oversized Ultra-thin Editorial Serif Watermark "404" */}
        {/* ========================================================= */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-20 pointer-events-none select-none z-0">
          <span
            className="font-serif-display text-[180px] sm:text-[260px] md:text-[340px] lg:text-[400px] font-thin leading-none text-[#b8912f]/[0.06] tracking-tighter"
            style={{ fontFamily: "Georgia, serif" }}
          >
            404
          </span>
        </div>

        {/* ========================================================= */}
        {/* Left Side: Editorial Typography (Left-aligned on desktop) */}
        {/* ========================================================= */}
        <div className="relative z-10 max-w-xl text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1 mt-6 md:mt-0">
          
          {/* 404 Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-soft)] text-xs font-medium tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-ping" />
            <span>შეცდომა 404</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#f4f4f4] leading-tight tracking-wide drop-shadow-md">
            ტოტი მოტყდა, გვერდი ვერ მოიძებნა
          </h1>

          {/* Subtle Horizontal Gold Hairline Divider */}
          <div className="w-20 md:w-28 h-[1px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold)]/60 to-transparent my-5 sm:my-6" />

          {/* Description */}
          <p className="text-sm sm:text-base text-[#f4f4f4]/70 leading-relaxed font-sans max-w-lg mb-8">
            სამწუხაროდ, თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან დროებით მიუწვდომელია.
            გადადით მთავარ გვერდზე ან დაათვალიერეთ მამულის სექტორები.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] text-[#0e1510] font-medium text-sm shadow-[0_10px_25px_-5px_rgba(212,178,86,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>მთავარზე დაბრუნება</span>
              <span>→</span>
            </Link>
            <Link
              href="/sectors"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#162219]/90 hover:bg-[#1f3024] border border-[#2d4233] text-[var(--fg)]/85 hover:text-[var(--gold)] text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>სექტორების რუკა</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right Side: Refined Botanical Snapped Tree Branch SVG */}
        {/* Clean vector line-art + Emerald (#1e3a29) & Brushed Gold (#b8912f) */}
        {/* ========================================================= */}
        <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] flex items-center justify-center order-1 md:order-2">
          
          {/* Subtle warm halo behind the botanical art */}
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(184,145,47,0.15)_0%,rgba(30,58,41,0.12)_50%,transparent_70%)] blur-2xl pointer-events-none" />

          <svg
            viewBox="0 0 320 320"
            className="w-full h-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Brushed Gold Gradient for wood fracture and golden leaves */}
              <linearGradient id="goldStemGrad" x1="60" y1="280" x2="160" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2c1f14" />
                <stop offset="40%" stopColor="#4a3522" />
                <stop offset="80%" stopColor="#b8912f" />
                <stop offset="100%" stopColor="#dfba5b" />
              </linearGradient>

              <linearGradient id="fractureGold" x1="140" y1="150" x2="165" y2="135" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f7e49e" />
                <stop offset="60%" stopColor="#d4b256" />
                <stop offset="100%" stopColor="#8c6a22" />
              </linearGradient>

              {/* Deep Emerald / Gold Botanical Leaf Gradient */}
              <linearGradient id="emeraldLeaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#78b888" />
                <stop offset="45%" stopColor="#2d5e3c" />
                <stop offset="100%" stopColor="#153220" />
              </linearGradient>

              <linearGradient id="goldLeafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fae7a0" />
                <stop offset="50%" stopColor="#cf9f3b" />
                <stop offset="100%" stopColor="#7a5518" />
              </linearGradient>
            </defs>

            {/* 1. LOWER MAIN BOUGH / TRUNK (Solid base that remains anchored) */}
            <g id="lower-bough">
              {/* Slender main trunk rising from lower-left */}
              <path
                d="M60 295 C85 260 115 220 138 162"
                stroke="url(#goldStemGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Inner delicate botanical contour line */}
              <path
                d="M66 295 C90 262 118 224 140 166"
                stroke="#1e3a29"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Small side twig with tiny delicate olive bud */}
              <path
                d="M98 245 C115 240 128 244 140 238"
                stroke="#b8912f"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M140 238 C148 234 156 238 158 245 C150 248 143 244 140 238 Z"
                fill="url(#emeraldLeaf)"
                stroke="#b8912f"
                strokeWidth="0.8"
              />

              {/* Lower jagged fracture point (where the wood tore apart) */}
              <polygon
                points="136,164 141,154 144,166 148,152 153,165 150,172 136,170"
                fill="url(#fractureGold)"
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.95"
              />
              {/* Fine splinter hair lines */}
              <line x1="141" y1="154" x2="143" y2="145" stroke="#f7e49e" strokeWidth="1" strokeLinecap="round" />
              <line x1="148" y1="152" x2="150" y2="143" stroke="#d4b256" strokeWidth="0.8" strokeLinecap="round" />
            </g>

            {/* 2. UPPER BROKEN BRANCH (Hangs downward at an angle with soft spring physics) */}
            <motion.g
              id="hanging-broken-branch"
              style={{ transformOrigin: "148px 158px" }}
              initial={{ rotate: -15, y: -8 }}
              animate={{
                rotate: [-15, 28, 22, 25, 24],
                y: [-8, 6, 2, 4, 3],
              }}
              transition={{
                duration: 2.4,
                ease: [0.34, 1.3, 0.64, 1], // Soft natural spring bounce
              }}
            >
              {/* Mating jagged wood fracture on the snapped branch */}
              <polygon
                points="146,156 150,146 153,158 157,144 162,157 156,162 146,160"
                fill="url(#fractureGold)"
                stroke="#f7e49e"
                strokeWidth="0.5"
              />

              {/* Broken branch stem bending and hanging downward to the right */}
              <path
                d="M152 156 C175 162 205 180 238 215"
                stroke="url(#goldStemGrad)"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
              <path
                d="M154 158 C176 164 204 182 236 216"
                stroke="#1e3a29"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Secondary offshoot stem */}
              <path
                d="M192 172 C210 162 232 165 248 158"
                stroke="#b8912f"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Leaf 1: Attached to secondary offshoot (Delicate Botanical Emerald & Gold) */}
              <g transform="translate(248, 158) rotate(15)">
                <path
                  d="M0 0 C16 -12 36 -10 48 0 C34 14 14 12 0 0 Z"
                  fill="url(#emeraldLeaf)"
                  stroke="#b8912f"
                  strokeWidth="0.8"
                />
                <line x1="0" y1="0" x2="42" y2="0" stroke="#f7e49e" strokeWidth="0.75" strokeLinecap="round" opacity="0.85" />
                <line x1="14" y1="0" x2="24" y2="-6" stroke="#f7e49e" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
                <line x1="24" y1="0" x2="34" y2="6" stroke="#f7e49e" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
              </g>

              {/* Leaf 2: Hanging from mid branch (Gold Accent Leaf) */}
              <g transform="translate(182, 168) rotate(75)">
                <path
                  d="M0 0 C14 -10 32 -8 42 0 C30 12 12 10 0 0 Z"
                  fill="url(#goldLeafGrad)"
                  stroke="#b8912f"
                  strokeWidth="0.8"
                />
                <line x1="0" y1="0" x2="38" y2="0" stroke="#1e3a29" strokeWidth="0.75" strokeLinecap="round" opacity="0.8" />
              </g>

              {/* Leaf 3: Lower tip leaf (Deep Emerald with gold edge) */}
              <g transform="translate(238, 215) rotate(45)">
                <path
                  d="M0 0 C18 -14 40 -12 52 0 C38 16 16 14 0 0 Z"
                  fill="url(#emeraldLeaf)"
                  stroke="#b8912f"
                  strokeWidth="0.8"
                />
                <line x1="0" y1="0" x2="46" y2="0" stroke="#f7e49e" strokeWidth="0.75" strokeLinecap="round" opacity="0.85" />
                <line x1="16" y1="0" x2="28" y2="-7" stroke="#f7e49e" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
                <line x1="28" y1="0" x2="40" y2="7" stroke="#f7e49e" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
              </g>

              {/* Leaf 4: Small top leaf drooping downward */}
              <g transform="translate(216, 192) rotate(110)">
                <path
                  d="M0 0 C12 -8 26 -6 34 0 C24 10 10 8 0 0 Z"
                  fill="url(#emeraldLeaf)"
                  stroke="#b8912f"
                  strokeWidth="0.75"
                />
                <line x1="0" y1="0" x2="28" y2="0" stroke="#f7e49e" strokeWidth="0.6" strokeLinecap="round" opacity="0.8" />
              </g>
            </motion.g>

            {/* 3. DETACHED FALLEN LEAF: Gently drifting downward in a continuous slow loop */}
            <motion.g
              animate={{
                x: [0, -18, -32, -45, -55],
                y: [0, 35, 75, 120, 160],
                rotate: [0, 24, -18, 32, 15],
                opacity: [0, 1, 0.9, 0.7, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              style={{ transformOrigin: "center" }}
            >
              <g transform="translate(155, 165)">
                <path
                  d="M0 0 C14 -10 32 -8 40 0 C28 12 12 10 0 0 Z"
                  fill="url(#goldLeafGrad)"
                  stroke="#b8912f"
                  strokeWidth="0.8"
                />
                <line x1="0" y1="0" x2="35" y2="0" stroke="#1e3a29" strokeWidth="0.6" strokeLinecap="round" opacity="0.8" />
              </g>
            </motion.g>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 py-6 text-center text-xs text-[#f4f4f4]/40 font-sans pointer-events-none">
        ნიაბის მამული · Niabi&apos;s Manor © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
