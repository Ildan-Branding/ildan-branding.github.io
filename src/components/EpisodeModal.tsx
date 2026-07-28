"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Episode } from "@/data/episodes";

type Props = {
  episode: Episode | null;
  onClose: () => void;
};

/** 본문 내 highlight 단어를 강조 span으로 감싸기 */
function renderHighlighted(text: string, highlight?: string) {
  if (!highlight) return text;
  const idx = text.indexOf(highlight);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <em className="not-italic font-medium text-lime">{highlight}</em>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export default function EpisodeModal({ episode, onClose }: Props) {
  // ESC로 닫기 + 스크롤 락
  useEffect(() => {
    if (!episode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [episode, onClose]);

  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Content card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="episode-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-4 max-h-[90vh] w-full max-w-[760px] overflow-y-auto rounded-2xl border border-lime/20 bg-ink p-7 text-white md:p-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="닫기"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-lime/20 text-white/70 transition hover:bg-lime/10 hover:text-lime"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(200,255,61,0.10) 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Header */}
              <div className="mb-8 flex flex-wrap items-center gap-3 pr-10">
                <span className="inline-block rounded-full border border-lime/25 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-lime">
                  {episode.badge}
                </span>
                {episode.status === "next" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                    Next
                  </span>
                ) : (
                  <span className="inline-block rounded-full border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Done
                  </span>
                )}
              </div>

              {/* Question — 이 화의 주인공 */}
              <h1
                id="episode-modal-title"
                className="text-[clamp(26px,5vw,44px)] font-extrabold leading-[1.22] tracking-tight"
              >
                {episode.question}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-lime/90">
                {episode.copy}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/50">
                <span className="font-semibold text-white/80">
                  {episode.titlePrefix} {episode.titleSuffix}
                </span>
                {episode.date && (
                  <>
                    <span className="text-white/25">·</span>
                    <span>{episode.date}</span>
                  </>
                )}
                <span className="text-white/25">·</span>
                <span>{episode.dateLabel}</span>
              </div>

              {/* Segments — 대화가 흘러가는 순서 */}
              {episode.segments.length > 0 && (
                <div className="relative mt-10">
                  <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Segments
                  </div>

                  {/* Timeline track */}
                  <div
                    aria-hidden
                    className="absolute bottom-2 left-[42px] top-14 hidden w-px bg-lime/20 sm:block"
                  />

                  <ol className="flex flex-col gap-3">
                    {episode.segments.map((s, i) => (
                      <motion.li
                        key={`${s.at}-${i}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.12 + i * 0.06 }}
                        className="relative flex items-start gap-4 rounded-2xl border border-lime/15 bg-white/[0.03] p-5 backdrop-blur-sm sm:gap-5 md:p-6"
                      >
                        <span className="relative z-10 min-w-[46px] shrink-0 pt-0.5 font-mono text-xs font-semibold tabular-nums text-lime">
                          {s.at}
                        </span>
                        <div>
                          <h3 className="text-base font-bold leading-snug md:text-lg">
                            {s.title}
                          </h3>
                          {s.desc && (
                            <p className="mt-1 text-sm leading-relaxed text-white/60">
                              {renderHighlighted(s.desc, s.highlight)}
                            </p>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Takeaway */}
              {episode.takeaway && (
                <div className="mt-8 rounded-r-2xl border-l-[3px] border-lime bg-lime/[0.07] py-4 pl-5 pr-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime">
                    Takeaway
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85 md:text-base">
                    {episode.takeaway}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 flex flex-col gap-3 border-t border-lime/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Try · Fail · Learn — 2026
                </div>
                <div className="text-xs text-white/60">
                  <a
                    href="https://ildan-branding.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-lime transition hover:underline"
                  >
                    ildan-branding.github.io →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
