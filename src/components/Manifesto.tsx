"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

type Slide = {
  pre?: string;
  main: React.ReactNode;
  caption?: string;
  align?: "left" | "right" | "center";
};

const slides: Slide[] = [
  {
    pre: "01 / Why now",
    main: (
      <>
        1인 창업의 시대,
        <br />
        <span className="text-lime">당신은 지금 뭘 하고 있나요?</span>
      </>
    ),
    caption: "혼자서도 회사 하나를 굴리는 시대.",
    align: "left",
  },
  {
    pre: "02 / Reality",
    main: (
      <>
        AI는 매일 바뀌는데,
        <br />
        <span className="text-lime">혼자 따라가긴 벅차잖아요.</span>
      </>
    ),
    caption: "어제의 도구는 오늘 구식이 됩니다.",
    align: "right",
  },
  {
    pre: "03 / Promise",
    main: (
      <>
        거창한 계획은 필요 없어요.
        <br />
        한 달에 <span className="text-lime">단 몇 시간</span>이면 충분해요.
      </>
    ),
    caption: "2~3주에 1번, 평일 저녁 1시간 반.",
    align: "left",
  },
  {
    pre: "04 / Format",
    main: (
      <>
        발표도, 자료도, PPT도 No.
        <br />
        그냥 <span className="text-lime">수다 떨듯</span> 시작해요.
      </>
    ),
    caption: "준비물은 호기심 하나면 됩니다.",
    align: "right",
  },
  {
    pre: "05 / Mindset",
    main: (
      <>
        몰라도 괜찮아요.
        <br />
        <span className="text-lime">시작</span>이 더 중요하니까.
      </>
    ),
    caption: "잘하는 것보다 꾸준한 게 이깁니다.",
    align: "center",
  },
];

function ManifestoSlide({ slide, index }: { slide: Slide; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const alignClass =
    slide.align === "right"
      ? "items-start text-left md:items-end md:text-right"
      : slide.align === "center"
      ? "items-start text-left md:items-center md:text-center"
      : "items-start text-left";

  return (
    <section
      ref={ref}
      className="min-h-screen-safe relative flex w-full items-center justify-center px-5 py-20 md:px-12"
    >
      <motion.div
        style={isTouch ? { opacity } : { y, opacity }}
        className={`flex max-w-5xl flex-col gap-6 ${alignClass}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-xs">
          {slide.pre}
        </span>
        <h2 className="display-1 text-[8.5vw] leading-[1.05] md:text-[5.5rem] md:leading-[0.95] lg:text-[6.5rem]">
          {slide.main}
        </h2>
        {slide.caption && (
          <p className="max-w-xl text-sm text-white/60 md:text-base">
            {slide.caption}
          </p>
        )}
      </motion.div>
      <div className="absolute right-5 top-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 md:right-12 md:top-12 md:text-xs">
        ({String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")})
      </div>
    </section>
  );
}

export default function Manifesto() {
  return (
    <div className="relative bg-ink">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-2/3 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl" />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-32 md:px-12">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
          <span className="h-px w-12 bg-white/30" />
          <span>Manifesto</span>
        </div>
      </div>

      {slides.map((s, i) => (
        <ManifestoSlide slide={s} index={i} key={i} />
      ))}

      {/* Transition slogan */}
      <section className="min-h-80svh relative flex items-center justify-center overflow-hidden px-5 md:px-12">
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono opacity-[0.04]">
          <div className="text-[20vw] font-black leading-none">TRY</div>
          <div className="text-[20vw] font-black leading-none">FAIL</div>
          <div className="text-[20vw] font-black leading-none">LEARN</div>
        </div>
        <div className="relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="display-1 text-[10vw] leading-[0.9] md:text-7xl lg:text-8xl"
          >
            TRY SMALL,
            <br />
            FAIL SAFE,
            <br />
            <span className="text-lime">LEARN TOGETHER.</span>
          </motion.h2>
        </div>
      </section>
    </div>
  );
}
