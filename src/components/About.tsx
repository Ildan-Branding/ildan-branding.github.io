"use client";

import { motion } from "framer-motion";

const items = [
  {
    label: "장소",
    en: "Place",
    value: "기본은 온라인",
    sub: "Zoom, Google Meet · 가끔 오프라인 모임",
  },
  {
    label: "주기",
    en: "Cadence",
    value: "2~3주에 1회",
    sub: "꾸준히, 무리하지 않게",
  },
  {
    label: "시간",
    en: "Duration",
    value: "1시간 반~2시간",
    sub: "평일 저녁",
  },
  {
    label: "인원",
    en: "Members",
    value: "처음은 소수로",
    sub: "관심 있는 사람이 모이면 자연스럽게 확장",
  },
  {
    label: "참여 조건",
    en: "Who",
    value: "꾸준히 할 사람",
    sub: "잘할 필요 없습니다. 함께 계속 해보는 사람이면 충분",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-24 text-ink md:py-40">
      {/* Top accent */}
      <div className="absolute left-0 right-0 top-0 h-px bg-ink/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 md:text-xs">
              <span className="h-px w-12 bg-ink/30" />
              <span>About the Podcast</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="display-1 text-[13vw] leading-[0.85] md:text-[7rem]"
            >
              일단,
              <br />
              <span className="relative">
                브랜딩
                <span className="absolute -bottom-2 left-0 h-4 w-full bg-lime md:h-6" style={{ transform: "skewX(-12deg)" }} />
              </span>
              <span className="text-ink/40">*</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative max-w-sm shrink-0"
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-lime" style={{ transform: "rotate(-2deg) scale(1.06)" }} />
            <div className="absolute inset-0 rounded-full border-2 border-lime/70" style={{ transform: "rotate(4deg) scale(1.1)" }} />
            <div className="relative px-8 py-7 text-center font-bold leading-tight text-ink md:text-lg">
              처음은 소수로 시작,
              <br />
              나중엔 함께 더 크게.
            </div>
          </motion.div>
        </div>

        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-ink/80 md:mb-24 md:text-2xl">
          정해진 목표 없이, 일단 모여서 각자 경험을 나누고 아이디어를 주고받는 모임.
          대화 속에서 자연스럽게{" "}
          <span className="font-semibold text-ink">"이거 같이 해볼까?"</span>가 나오면 그때 움직인다.
        </p>

        {/* Glass cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/50 p-6 transition hover:border-ink/30 hover:bg-white/70 md:bg-white/40 md:p-8 md:backdrop-blur-md ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="rounded-full bg-lime px-3 py-1 text-xs font-bold tracking-wide text-ink">
                  {it.label}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  0{i + 1}
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                {it.en}
              </div>
              <div className="mt-2 text-2xl font-black tracking-tight text-ink md:text-3xl">
                {it.value}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-ink/60">
                {it.sub}
              </div>

              {/* Hover accent */}
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-lime/0 blur-2xl transition-all duration-500 group-hover:bg-lime/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
