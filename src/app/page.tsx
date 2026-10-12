"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  const router = useRouter();

  const handleExplore = () => {
    router.push("/sectors");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--bg)]">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/overview.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        className="absolute top-10 left-12 flex items-center gap-3 z-20"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)]">
          Estate Development
        </span>
        <span className="w-10 h-px bg-[var(--gold)]/60" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)]">
          Georgia
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="absolute top-10 right-12 z-20"
      >
        <WeatherWidget />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ delay: 0.3, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display text-[64px] md:text-[112px] lg:text-[136px] leading-none text-[var(--gold-soft)] text-center"
          style={{
            textShadow:
              "0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(184,145,47,0.25)",
          }}
        >
          ნიაბის მამული
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 1.4, duration: 1.4, ease: "easeOut" }}
          className="mt-8 text-[10px] md:text-xs uppercase text-[var(--fg)]/60 text-center"
        >
          Niabi&apos;s Manor · Est. 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: "easeOut" }}
          className="mt-16"
        >
          <button
            onClick={handleExplore}
            className="group relative inline-flex items-center gap-5 px-10 py-4 border border-[var(--gold)]/50 bg-black/30 backdrop-blur-md hover:bg-[var(--gold)]/10 hover:border-[var(--gold)] transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
            <span className="relative text-xs tracking-[0.35em] uppercase text-[var(--gold-soft)] group-hover:text-[var(--gold)] transition-colors">
              სექტორების გამოკვლევა
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative text-[var(--gold)] text-lg"
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 1, ease: "easeOut" }}
        className="absolute bottom-10 left-12 flex items-end gap-10 z-20"
      >
        <Stat value="3" label="სექტორი" delay={2.5} />
        <Stat value="52+" label="ნაკვეთი" delay={2.6} />
        <Stat value="∞" label="ბუნება" delay={2.7} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
        className="absolute bottom-10 right-12 z-20"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]/50">
          Niabi&apos;s Manor Estate
        </p>
      </motion.div>
    </main>
  );
}

function Stat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-start"
    >
      <span className="font-serif-display text-3xl md:text-4xl text-[var(--gold-soft)] leading-none">
        {value}
      </span>
      <span className="mt-2 text-[10px] tracking-[0.35em] uppercase text-[var(--fg)]/50">
        {label}
      </span>
    </motion.div>
  );
}