"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    
    const seen = sessionStorage.getItem("niabis-splash-seen-v2");
    if (seen) return;

    setShow(true);
    sessionStorage.setItem("niabis-splash-seen-v2", "1");
    /* eslint-enable react-hooks/set-state-in-effect */

    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[var(--bg)] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(184,145,47,0.18) 0%, transparent 55%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative flex flex-col items-center px-8">
            <motion.img
              src="/images/logo.png"
              alt="Niabi's Manor"
              className="h-28 md:h-36 mb-8"
              initial={{ opacity: 0, scale: 0.82, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />

            <motion.h1
              className="font-serif-display text-3xl md:text-4xl text-[var(--gold-soft)] mb-3 text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              ნიაბის მამული
            </motion.h1>

            <motion.p
              className="text-[10px] md:text-xs tracking-[0.6em] text-[var(--gold)]/70 uppercase mb-10"
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
            >
              Niabi&apos;s Manor
            </motion.p>

            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
            />

            <motion.div
              className="flex gap-2 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}