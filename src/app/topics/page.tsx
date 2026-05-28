"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import WeekModal from "@/components/WeekModal";
import { weeks, type Week } from "@/data/weeks";

export default function TopicsPage() {
  const [active, setActive] = useState<Week | null>(null);

  // 공개된 주차만 노출
  const visibleWeeks = weeks.filter((w) => w.available);

  return (
    <main className="min-h-screen-safe relative w-full overflow-hidden bg-ink text-white">
      {/* Soft lime orb */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-lime/15 blur-3xl md:h-[28rem] md:w-[28rem]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl md:h-96 md:w-96" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pt-6 md:px-12 md:pt-10">
        <Link
          href="/"
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 transition hover:text-lime md:text-xs"
        >
          AI Branding
          <br />
          Meetup
        </Link>
        <Link
          href="/"
          className="glass inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-lime hover:text-ink md:px-4 md:text-xs"
        >
          <span aria-hidden>←</span>
          <span>Home</span>
        </Link>
      </div>

      {/* Body */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-14 md:px-12 md:pb-32 md:pt-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
            Archive · Topic
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-1 mt-6 text-[18vw] leading-[0.85] md:text-[10vw] lg:text-[9rem]"
        >
          Topic
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-base text-white/70 md:mt-8 md:text-lg"
        >
          매주 다룬 주제와 이야기들.{" "}
          <span className="text-white">기록을 모아둡니다.</span>
        </motion.p>

        {/* Week grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {visibleWeeks.map((w, i) => (
            <motion.button
              key={w.week}
              type="button"
              onClick={() => setActive(w)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-lime/20 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-lime/60 hover:bg-lime/5 md:p-7"
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-lime md:text-[11px]">
                  {w.badge}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-[11px]">
                  #{String(w.week).padStart(2, "0")}
                </span>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                  {w.titlePrefix && (
                    <em className="not-italic text-lime">{w.titlePrefix} </em>
                  )}
                  {w.titleSuffix}
                </span>
                {w.subtitle && (
                  <span className="text-sm text-white/55 md:text-base">
                    {w.subtitle}
                  </span>
                )}
              </div>

              <div className="mt-4 flex w-full items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  {w.dateLabel}
                </span>
                <span className="text-2xl text-lime transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            Try · Fail · Learn — 2026
          </span>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime transition hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <WeekModal week={active} onClose={() => setActive(null)} />
    </main>
  );
}
