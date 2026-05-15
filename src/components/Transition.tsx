"use client";

import { motion } from "framer-motion";

const signals = [
  "\"이거 진짜 만들어볼까?\" 하는 아이디어가 나올 때",
  "2명 이상이 같은 주제에 에너지가 쏠릴 때",
  "대화가 아니라 실행이 하고 싶어질 때",
];

export default function Transition() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-lime/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
              <span className="h-px w-12 bg-white/30" />
              <span>Transition Point</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="display-1 text-[12vw] leading-[0.9] md:text-[5.5rem]"
            >
              전환
              <br />
              <span className="text-lime">시점</span>
            </motion.h2>
            <p className="mt-6 max-w-md text-base text-white/70 md:text-lg">
              모임을 반복하다가 아래 같은 신호가 오면
              <br />
              <span className="font-semibold text-white">프로젝트 모드</span>로 넘어갑니다.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {signals.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group glass-dark relative overflow-hidden rounded-3xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-5 md:gap-7">
                    <span className="font-mono text-3xl font-black text-lime md:text-5xl">
                      0{i + 1}
                    </span>
                    <p className="pt-1 text-lg font-medium leading-snug text-white md:pt-2 md:text-2xl">
                      {s}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 text-lime opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 md:right-8 md:h-8 md:w-8"
                  >
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
