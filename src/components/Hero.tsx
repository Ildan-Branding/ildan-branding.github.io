"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { episodes, nextEpisode } from "@/data/episodes";

const doneCount = episodes.filter((e) => e.status === "done").length;

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    let pending = false;
    const tick = () => {
      pending = false;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="min-h-screen-safe relative w-full overflow-hidden bg-ink">
      {/* Lime glow follow — desktop only via @media hover */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 hidden h-[36rem] w-[36rem] rounded-full opacity-60 blur-[120px] will-change-transform md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(200,255,61,0.35) 0%, rgba(200,255,61,0) 70%)",
          transform: "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)",
        }}
      />

      {/* Glass orb decorations */}
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-lime/20 blur-3xl md:h-96 md:w-96" />
      <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl md:h-[28rem] md:w-[28rem]" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 pt-6 md:px-12 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 md:text-xs"
        >
          AI Branding
          <br />
          Podcast
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60 md:flex"
        >
          <span className="h-px w-12 bg-white/30" />
          <span>Try with AI.</span>
          <span className="text-lime">Create Anything.</span>
        </motion.div>
        <motion.a
          href="#cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass shrink-0 rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-lime hover:text-ink md:px-4 md:text-xs"
        >
          참가 신청
        </motion.a>
      </div>

      {/* Hero copy */}
      <div className="min-h-hero-inner relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-5 pb-20 pt-16 md:px-12 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 flex items-center gap-3 md:mb-10"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
            New Community · 2026
          </span>
        </motion.div>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-10 lg:gap-16">
          <h1 className="display-1 text-[18vw] leading-[0.82] md:text-[14vw] lg:text-[12rem]">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              일단,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              <span className="relative inline-block">
                브랜딩
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute -bottom-2 left-0 h-3 w-full origin-left bg-lime md:h-5"
                  style={{ transform: "skewX(-12deg)" }}
                />
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="ml-2 inline-block text-lime"
              >
                *
              </motion.span>
            </motion.span>
          </h1>

          {/* 다음 에피소드 예고 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full shrink-0 flex-col gap-4 md:w-auto md:pb-3"
          >
            <Link
              href="/topics"
              className="group relative flex w-full max-w-[440px] flex-col gap-6 overflow-hidden rounded-3xl border border-lime/30 bg-lime/5 p-6 backdrop-blur-sm transition hover:border-lime hover:bg-lime/10 md:w-[300px] md:p-7 lg:w-[380px] lg:p-8 xl:w-[440px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-lime md:text-sm">
                  {nextEpisode.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                  Next
                </span>
              </div>

              <p className="text-balance text-xl font-extrabold leading-[1.3] tracking-tight text-white md:text-2xl lg:text-[1.7rem]">
                {nextEpisode.question}
              </p>

              <div className="flex items-end justify-between gap-4 border-t border-lime/20 pt-5">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-lime">
                    {nextEpisode.date}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    지난 에피소드 {doneCount}
                  </span>
                </div>
                <span className="text-3xl leading-none text-lime transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
            {/* 추후 다른 버튼 추가 자리 */}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 max-w-xl text-base text-white/80 md:mt-12 md:text-xl"
        >
          AI를 활용해 이것저것 해보는{" "}
          <span className="text-white">가벼운 모임.</span>
          <br />
          한 화에 하나의 질문을 정하고,{" "}
          <br className="hidden md:block" />
          그 하나만 끝까지 파고드는 자리.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center gap-3 md:mt-16"
        >
          <div className="glass-lime rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-lime md:text-xs">
            · Try Small
          </div>
          <div className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 md:text-xs">
            · Fail Safe
          </div>
          <div className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 md:text-xs">
            · Learn Together
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
      >
        <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-6 w-px bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
