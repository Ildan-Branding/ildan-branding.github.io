"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const APPLY_URL = "https://naver.me/GNJWHzKc";

export default function CTA() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: x * 0.25, y: y * 0.25 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-lime py-32 text-ink md:py-48"
    >
      {/* Background big text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="select-none whitespace-nowrap text-[28vw] font-black leading-none text-ink/10 md:text-[20rem]">
          JOIN US
        </div>
      </div>

      {/* Decorative orbs */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-ink/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink backdrop-blur-xl md:text-xs"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-ink" />
          <span>Now Recruiting · First Cohort</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="display-1 text-[12vw] leading-[0.88] md:text-[8rem]"
        >
          지금이 그
          <br />
          <span className="italic">첫 모임</span>이에요.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-base text-ink/70 md:text-xl"
        >
          잘할 필요 없어요. <span className="font-bold text-ink">꾸준히 할 사람만.</span>
          <br />
          AI 시대, 일단 함께 시작해봐요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex justify-center md:mt-20"
        >
          <a
            ref={btnRef}
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
              transform: `translate(${tilt.x}px, ${tilt.y}px)`,
              transition: "transform 200ms ease",
            }}
            className="group relative inline-flex items-center gap-4 rounded-full bg-ink px-8 py-5 text-base font-bold text-lime shadow-2xl transition-all hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] md:px-12 md:py-7 md:text-2xl"
          >
            <span className="absolute inset-0 rounded-full bg-ink opacity-0 blur-xl transition group-hover:opacity-100" />
            <span className="relative">참가 신청하기</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="relative h-6 w-6 transition-transform group-hover:translate-x-2 md:h-8 md:w-8"
            >
              <path
                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 md:text-xs"
        >
          naver.me/GNJWHzKc
        </motion.div>
      </div>
    </section>
  );
}
