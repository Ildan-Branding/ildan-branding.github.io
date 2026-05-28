"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { weeks, type Week } from "@/data/weeks";
import WeekModal from "./WeekModal";

export default function TopicMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Week | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 공개된 주차만 노출
  const visibleWeeks = useMemo(() => weeks.filter((w) => w.available), []);

  // 바깥 클릭 / ESC 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openWeek = (w: Week) => {
    if (!w.available) return;
    setActive(w);
    setOpen(false);
  };

  return (
    <>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/85 transition hover:bg-lime hover:text-ink md:gap-2 md:px-3.5 md:py-2 md:text-xs"
        >
          <span>Topic</span>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M2.5 4.5l3.5 3.5 3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark absolute left-0 top-[calc(100%+8px)] z-50 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 p-1.5 shadow-2xl"
            >
              {visibleWeeks.map((w) => (
                <button
                  key={w.week}
                  type="button"
                  role="menuitem"
                  onClick={() => openWeek(w)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-white/90 transition hover:bg-white/10 hover:text-lime"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                    Week {String(w.week).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                    →
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <WeekModal week={active} onClose={() => setActive(null)} />
    </>
  );
}
