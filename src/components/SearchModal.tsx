"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { searchContent, type SearchResult } from "@/lib/search";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && <SearchModalContent onClose={onClose} />}
    </AnimatePresence>
  );
}

function SearchModalContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchContent(query), [query]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (result: SearchResult) => {
    onClose();
    router.push(`/sector/${result.sectorId}?focus=${result.id}`);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        onClose();
        router.push(
          `/sector/${results[selectedIndex].sectorId}?focus=${results[selectedIndex].id}`
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [results, selectedIndex, onClose, router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[150] bg-[var(--panel)] md:bg-black/70 md:backdrop-blur-md flex flex-col md:items-start md:justify-start md:pt-[15vh] md:px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full md:h-auto md:max-w-[600px] md:mx-auto md:rounded-2xl md:border border-[var(--gold)]/30 bg-[var(--panel)]/95 md:backdrop-blur-xl md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--gold)]/20 mt-12 md:mt-0">
          <span className="text-[var(--gold)] text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="მოძებნე: სპა, ვენახები, N-15..."
            className="flex-1 bg-transparent border-none outline-none text-base text-[var(--fg)] placeholder:text-[var(--fg)]/40"
          />
          <button onClick={onClose} className="md:hidden text-[var(--fg)]/60 text-sm font-medium px-2 py-1">
            გაუქმება
          </button>
          <kbd className="hidden md:block text-[10px] px-2 py-1 rounded bg-[var(--fg)]/10 text-[var(--fg)]/50 border border-[var(--fg)]/10">
            ESC
          </kbd>
        </div>

        <div className="max-h-full md:max-h-[50vh] overflow-y-auto no-scrollbar flex-1 md:flex-none">
          {query.trim() === "" ? (
            <div className="px-5 py-8 text-center text-sm text-[var(--fg)]/50">
              დაიწყე ტექსტის აკრეფა...
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-[var(--fg)]/50">
              ვერ მოიძებნა: &quot;{query}&quot;
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, i) => (
                <button
                  key={`${result.sectorId}-${result.type}-${result.id}-${i}`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full px-5 py-4 flex items-center gap-4 text-left transition-colors ${
                    i === selectedIndex
                      ? "bg-[var(--gold)]/15"
                      : "hover:bg-[var(--gold)]/5"
                  }`}
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold-soft)] text-xs font-bold">
                    {result.sectorId}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base text-[var(--fg)] font-medium truncate">
                      {result.titleKa}
                    </div>
                    {result.subtitle && (
                      <div className="text-xs md:text-sm text-[var(--fg)]/50 truncate">
                        {result.subtitle}
                      </div>
                    )}
                  </div>

                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-[var(--fg)]/40 hidden md:block">
                    {result.type === "location" && "ლოკაცია"}
                    {result.type === "plot" && "ნაკვეთი"}
                    {result.type === "sector" && "სექტორი"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex px-5 py-3 border-t border-[var(--gold)]/20 items-center gap-4 text-[10px] text-[var(--fg)]/40">
          <span>↑↓ ნავიგაცია</span>
          <span>Enter არჩევა</span>
          <span>ESC დახურვა</span>
        </div>
      </motion.div>
    </motion.div>
  );
}