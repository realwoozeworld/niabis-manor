"use client";

import { motion } from "framer-motion";

const terroir = [
  { label: "ნიადაგი", value: "ვულკანური, კირქვოვანი" },
  { label: "სიმაღლე ზღვის დონიდან", value: "550 – 750 მ" },
  { label: "მზის საათები წლიურად", value: "2,200 სთ" },
  { label: "წლიური ნალექი", value: "600 მმ" },
  { label: "ჯიშები", value: "საფერავი · რქაწითელი · მწვანე" },
];

export default function TerroirPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute left-8 bottom-8 z-30 w-[360px]
                 rounded-2xl border border-[var(--gold)]/40
                 bg-[var(--panel)]/85 backdrop-blur-xl
                 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                 overflow-hidden"
    >
      <div className="px-6 pt-5 pb-4 border-b border-[var(--gold)]/20">
        <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase">
          ტეროარი
        </p>
        <h3 className="font-serif-display text-xl text-[var(--gold-soft)] mt-1">
          ნიაბის ვენახები · შიდა ქართლი
        </h3>
      </div>

      <dl className="px-6 py-5 space-y-4 text-sm">
        {terroir.map((item) => (
          <div key={item.label} className="flex justify-between items-baseline gap-4">
            <dt className="text-[var(--fg)]/50 shrink-0">{item.label}</dt>
            <dd className="text-right text-[var(--fg)]/90">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
    </motion.div>
  );
}