"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "1",
    time: "30분",
    title: "각자 한 마디씩",
    desc: "최근에 AI로 해본 것, 발견한 것, 공감한 것, 아이디어 나누기. 한 사람당 5분 내외. 준비 안 했으면 \"이번엔 없어\"도 OK.",
    examples: [
      '"Claude로 브랜드 네이밍 해봤는데 좀 괜찮더라"',
      '"이런 1인 브랜드 봤는데 AI로 만든 것 같아"',
      '"노코드로 랜딩페이지 하나 띄워봤어"',
    ],
  },
  {
    num: "2",
    time: "30~40분",
    title: "하나 골라서 같이 파보기",
    desc: "앞에서 나온 이야기 중 제일 재밌는 주제 하나 골라서 자유롭게 대화.",
    examples: [
      '"그거 브랜드로 만들면 어떻게 생겼을까"',
      '"타겟이 누구야"',
      '"이름은 뭘로 하지"',
    ],
  },
  {
    num: "3",
    time: "20분",
    title: "다음까지 해볼 것",
    desc: "\"나는 다음까지 이거 한번 해볼게\" 정도로 가볍게. 안 해와도 아무도 뭐라 안 함. 이거 모임이 다음 모임에 할 얘기 생겨서 흐름이 이어짐.",
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
            <span>How it flows</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-1 text-[12vw] leading-[0.9] md:text-[6rem]"
          >
            모임 <span className="text-lime">흐름</span>
          </motion.h2>
          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
            발표가 아니라 수다. 자료 만들어올 필요 없음.
            <br />
            한 번에 약 1시간 반.
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
