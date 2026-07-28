"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import EpisodeModal from "@/components/EpisodeModal";
import { episodesDesc, type Episode } from "@/data/episodes";

export default function EpisodesPage() {
  const [active, setActive] = useState<Episode | null>(null);

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
          Podcast
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
            All Episodes
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-1 mt-6 text-[16vw] leading-[0.85] md:text-[10vw] lg:text-[8.5rem]"
        >
          Episodes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-base text-white/70 md:mt-8 md:text-lg"
        >
          한 화에 하나의 질문.{" "}
          <span className="text-white">지금까지 던진 질문들입니다.</span>
        </motion.p>

        {/* Episode grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {episodesDesc.map((e, i) => {
            const isNext = e.status === "next";
            return (
              <motion.button
                key={e.ep}
                type="button"
                onClick={() => setActive(e)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex min-h-[15rem] flex-col items-start gap-5 overflow-hidden rounded-3xl border p-6 text-left transition hover:-translate-y-1 md:p-8 ${
                  isNext
                    ? "border-lime/50 bg-lime/[0.07] hover:border-lime hover:bg-lime/10"
                    : "border-lime/15 bg-white/[0.03] hover:border-lime/50 hover:bg-lime/5"
                }`}
              >
                {/* Head: EP number + status */}
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-lime md:text-sm">
                    {e.badge}
                  </span>
                  {isNext ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                      Next
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Done
                    </span>
                  )}
                </div>

                {/* Question — 카드의 주인공 */}
                <h2 className="text-balance text-2xl font-extrabold leading-[1.28] tracking-tight text-white md:text-[1.75rem]">
                  {e.question}
                </h2>

                {/* Foot: title + date */}
                <div className="mt-auto flex w-full items-end justify-between gap-4 pt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-white/70">
                      {e.date}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                      {e.dateLabel}
                    </span>
                  </div>
                  <span className="text-2xl text-lime transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </motion.button>
            );
          })}
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

      <EpisodeModal episode={active} onClose={() => setActive(null)} />
    </main>
  );
}
