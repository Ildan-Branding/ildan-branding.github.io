"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "1",
    time: "10분",
    title: "오프닝 — 오늘의 질문",
    desc: "이번 화의 질문을 꺼내고, 왜 지금 이걸 묻는지 짧게 공유. 주제는 미리 정해져 있으니 고르는 시간은 없습니다.",
    examples: [
      '"우리는 AI 테크니션이 되어가고 있는 건 아닐까?"',
      '"왜 하필 지금 이 질문이 걸렸는지"',
    ],
  },
  {
    num: "2",
    time: "60분",
    title: "딥다이브 — 한 주제로 끝까지",
    desc: "주제를 바꾸지 않습니다. 하나를 끝까지 파고듭니다. 결론이 안 나도 괜찮고, 중간에 생각이 바뀌어도 괜찮습니다.",
    examples: [
      '"나는 그 지점에서 반대로 생각했는데"',
      '"그럼 우리가 놓치고 있는 건 뭘까"',
      '"실제로 그렇게 해본 적 있어?"',
    ],
  },
  {
    num: "3",
    time: "20분",
    title: "클로징 — 각자의 테이크어웨이",
    desc: "각자 오늘 건진 것 한 줄씩. 정답일 필요 없습니다. 그 한 줄이 기록으로 남고, 다음 화의 질문이 되기도 합니다.",
    examples: [],
  },
];

export default function Flow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineH = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-40">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-lime/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="mb-16 md:mb-24">
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
            <span className="h-px w-12 bg-white/30" />
            <span>How an episode flows</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-1 text-[12vw] leading-[0.9] md:text-[6rem]"
          >
            에피소드 <span className="text-lime">흐름</span>
          </motion.h2>
          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
            발표가 아니라 수다. 자료 만들어올 필요 없음.
            <br />
            한 화에 약 1시간 반.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline track */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 md:left-12 md:block" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-6 top-0 hidden w-px bg-lime md:left-12 md:block"
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative md:pl-32"
              >
                {/* Step bullet */}
                <div className="absolute left-0 top-0 hidden h-12 w-12 md:flex md:items-center md:justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-lime bg-ink" />
                  <span className="relative font-mono text-sm font-bold text-lime">
                    0{s.num}
                  </span>
                </div>

                <div className="glass rounded-3xl p-6 md:p-10">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-lime md:hidden">
                      Step 0{s.num}
                    </span>
                    <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">
                      {s.time}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                    {s.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                    {s.desc}
                  </p>

                  {s.examples.length > 0 && (
                    <div className="mt-8 flex flex-col gap-2">
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        예시
                      </div>
                      {s.examples.map((ex, j) => (
                        <div
                          key={j}
                          className="glass-lime inline-block rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white md:max-w-xl md:text-base"
                        >
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
