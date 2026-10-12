"use client";

import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
                className="group fixed top-6 right-24 z-[70] w-11 h-11 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5 text-[var(--gold)] group-hover:text-black transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}