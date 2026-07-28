"use client";

import { motion } from "framer-motion";

const vibePoints = [
  "발표가 아니라 수다. 자료 만들어올 필요 없음.",
  "한 화의 주제는 단 하나. 그것만 끝까지 이야기합니다.",
  "\"몰라\", \"안 해봤어\"가 자연스러운 모임.",
  "아이디어가 익으면 그때 프로젝트로 전환. 안 익으면 계속 이 형태로.",
];

const rules = [
  {
    icon: "?",
    title: "\"이거 그래서 뭘 할 거야?\"",
    desc: "정답을 찾는 모임이 아닙니다. 정해진 결과는 없어요.",
  },
  {
    icon: "@",
    title: "내가 뭘 배웠고 무슨 일을 하고 있는지는 중요하지 않다.",
    desc: "겸손하자.",
  },
  {
    icon: "X",
    title: "비난 절대 금지.",
    desc: "무조건 열린 마음으로 들어올 것.",
  },
  {
    icon: "M",
    title: "마이크 끄기 절대 금지.",
    desc: "항상 대화할 수 있는 준비.",
  },
];

export default function Vibe() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-40">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-lime/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-12 lg:grid-cols-2 lg:gap-20">
        {/* Vibe column */}
        <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 md:text-xs">
            <span className="h-px w-12 bg-ink/30" />
            <span>Vibe</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-1 text-[12vw] leading-[0.9] md:text-[6rem]"
          >
            분위기
          </motion.h2>

          <ul className="mt-10 flex flex-col gap-5">
            {vibePoints.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 text-lg leading-relaxed md:text-xl"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ink" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          {/* Postit */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 20 }}
            whileInView={{ opacity: 1, rotate: 4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 inline-block max-w-xs bg-lime p-6 text-ink shadow-2xl"
            style={{ boxShadow: "0 20px 50px -20px rgba(0,0,0,0.4)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
              Note
            </div>
            <div className="mt-2 text-xl font-black leading-tight md:text-2xl">
              함께 실험하고,
              <br />
              함께 만들어가요.
            </div>
          </motion.div>
        </div>

        {/* Rules column */}
        <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 md:text-xs">
            <span className="h-px w-12 bg-ink/30" />
            <span>Ground Rules</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-1 text-[12vw] leading-[0.9] md:text-[6rem]"
          >
            주의사항
          </motion.h2>

          <div className="mt-10 flex flex-col gap-4">
            {rules.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-4 rounded-2xl border border-ink/15 bg-white/50 p-5 transition hover:bg-white/70 md:bg-white/40 md:p-6 md:backdrop-blur-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xl font-bold text-lime">
                  {r.icon}
                </div>
                <div>
                  <div className="text-base font-bold md:text-lg">{r.title}</div>
                  <div className="mt-1 text-sm text-ink/60 md:text-base">
                    {r.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
