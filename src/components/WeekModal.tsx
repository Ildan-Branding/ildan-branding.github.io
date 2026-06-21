"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Week } from "@/data/weeks";

type Props = {
  week: Week | null;
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

export default function WeekModal({ week, onClose }: Props) {
  // ESC로 닫기 + 스크롤 락
  useEffect(() => {
    if (!week) return;
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
  }, [week, onClose]);

  return (
    <AnimatePresence>
      {week && (
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
            aria-labelledby="week-modal-title"
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
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="inline-block w-fit rounded-full border border-lime/25 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-lime">
                  {week.badge}
                </span>
                {week.date && (
                  <div className="text-left text-xs leading-relaxed text-white/40 sm:text-right">
                    <strong className="block font-semibold text-lime">
                      {week.date}
                    </strong>
                    <span>{week.dateLabel}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              {week.titlePrefix || week.titleSuffix ? (
                <div className="mb-12">
                  <h1
                    id="week-modal-title"
                    className="text-[clamp(32px,6vw,52px)] font-extrabold leading-[1.15] tracking-tight"
                  >
                    {week.titlePrefix && (
                      <em className="not-italic text-lime">
                        {week.titlePrefix}{" "}
                      </em>
                    )}
                    {week.titleSuffix}
                  </h1>
                  {week.subtitle && (
                    <p className="mt-4 text-base leading-relaxed text-white/60">
                      {week.subtitle}
                    </p>
                  )}
                </div>
              ) : (
                <h1
                  id="week-modal-title"
                  className="mb-12 text-3xl font-extrabold text-white/40"
                >
                  준비 중입니다
                </h1>
              )}

              {/* Topics */}
              {week.topics.length > 0 && (
                <div className="flex flex-col gap-3">
                  {week.topics.map((t, i) => (
                    <motion.div
                      key={t.num}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-5 rounded-2xl border border-lime/15 bg-white/[0.03] p-5 backdrop-blur-sm md:p-6"
                    >
                      <div className="min-w-[32px] pt-0.5 text-xl font-extrabold leading-none text-lime md:text-2xl">
                        {t.num}
                      </div>
                      <div>
                        <h3 className="text-base font-bold leading-snug md:text-lg">
                          {t.title}
                        </h3>
                        {t.desc && (
                          <p className="mt-1 text-sm leading-relaxed text-white/60">
                            {renderHighlighted(t.desc, t.highlight)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 flex flex-col gap-3 border-t border-lime/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Try · Fail · Learn — 2026
                </div>
                <div className="text-xs text-white/60">
                  <a
                    href="https://ildan-branding.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-lime transition hover:underline"
                  >
                    ildan-branding.vercel.app →
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
