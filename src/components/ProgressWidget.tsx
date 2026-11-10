"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const progress = 50; // 🔴 აქ შეგიძლია შეცვალო პროცენტი

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)} // მობილურზე დაჭერით გაიხსნას
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[120] bg-[#131a14]/95 backdrop-blur-xl border border-[var(--gold)]/40 rounded-2xl p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden transition-colors hover:bg-[#1c261e]"
      animate={{ width: isOpen ? 290 : 65 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-3">
        {/* პროცენტის წრე */}
        <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--gold)]/15 flex items-center justify-center text-[var(--gold)] font-bold text-xs border border-[var(--gold)]/30">
          {progress}%
        </div>

        {/* ტექსტი (იშლება მხოლოდ გახსნისას) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="text-white text-sm font-medium">საიტი მზადდება...</span>
              <span className="text-[var(--gold-soft)] text-[11px]">მალე დავასრულებთ</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* პროგრესის ხაზი ქვემოთ */}
      <div className="absolute bottom-0 left-0 h-1 bg-[#2d3b31] w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-[var(--gold)]"
        />
      </div>
    </motion.div>
  );
}