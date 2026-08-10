"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { proposalEpBadge } from "@/data/episodes";
import {
  MAX_SUMMARY,
  MAX_WHY,
  fetchTopics,
  isTopicsConfigured,
  submitTopic,
  type TopicProposal as TopicProposalRow,
} from "@/lib/topics";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default function TopicProposal() {
  const [summary, setSummary] = useState("");
  const [why, setWhy] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [topics, setTopics] = useState<TopicProposalRow[]>([]);
  const [listLoading, setListLoading] = useState(true);

  const configured = isTopicsConfigured();
  const canSubmit = summary.trim().length > 0 && status !== "submitting";

  const loadTopics = async () => {
    if (!configured) {
      setListLoading(false);
      return;
    }
    try {
      const rows = await fetchTopics();
      setTopics(rows);
    } catch {
      // 목록 로드 실패는 조용히 무시 — 입력창은 계속 동작해야 함
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      await submitTopic(summary, why, honeypot);
      setSummary("");
      setWhy("");
      setStatus("success");
      loadTopics();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="propose" className="mt-24 md:mt-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — 설명 */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
            <span className="h-px w-12 bg-white/30" />
            <span>Next Topic</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            /* display-1이 line-height 0.85를 고정해서 한글 3줄이 겹침 → !로 덮어씀 */
            className="display-1 mt-6 text-[11vw] !leading-[1.02] md:text-[4rem]"
          >
            다음 화에
            <br />
            <span className="text-lime">
              던지고 싶은
              <br />
              질문
            </span>
          </motion.h2>

          <p className="mt-6 max-w-md text-base text-white/70 md:text-lg">
            떠오를 때 미리 남겨두세요. 모아둔 발제는{" "}
            <span className="font-semibold text-white">
              모임 직전에 비슷한 것끼리 묶어서
            </span>{" "}
            순서를 정합니다.
          </p>

          {/* 등록된 발제 목록 */}
          <div className="mt-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              등록된 발제 {configured && !listLoading ? `· ${topics.length}` : ""}
            </span>
            <div className="mt-4 flex flex-col gap-3">
              {!configured && (
                <p className="text-sm text-white/40">
                  발제 저장소 설정 준비 중입니다.
                </p>
              )}
              {configured && listLoading && (
                <p className="text-sm text-white/40">불러오는 중…</p>
              )}
              {configured && !listLoading && topics.length === 0 && (
                <p className="text-sm text-white/40">
                  아직 없어요. 첫 발제를 남겨보세요.
                </p>
              )}
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <p className="text-sm font-semibold leading-relaxed text-white">
                    {t.summary}
                  </p>
                  {t.why && (
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                      {t.why}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                    {dateFormatter.format(new Date(t.created_at))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — 입력 */}
        <div className="lg:col-span-7">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            className="glass-dark rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-lime md:text-sm">
                {proposalEpBadge}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Draft
              </span>
            </div>

            {/* 한 줄 요약 */}
            <label
              htmlFor="topic-summary"
              className="mt-7 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/50"
            >
              한 줄로 하면?
            </label>
            <input
              id="topic-summary"
              type="text"
              value={summary}
              maxLength={MAX_SUMMARY}
              onChange={(e) => {
                setSummary(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="AI가 만든 결과물, 어디까지 내 것이라고 할 수 있을까"
              className="mt-3 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-4 text-base font-semibold text-white outline-none transition placeholder:font-normal placeholder:text-white/25 focus:border-lime/60 focus:bg-white/[0.06] md:text-lg"
            />

            {/* 이유 */}
            <label
              htmlFor="topic-why"
              className="mt-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/50"
            >
              왜 이 얘기를 하고 싶은지 <span className="normal-case">(선택)</span>
            </label>
            <textarea
              id="topic-why"
              rows={4}
              value={why}
              maxLength={MAX_WHY}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="계기, 겪은 일, 궁금한 지점 — 한두 줄이면 충분합니다."
              className="mt-3 w-full resize-none rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-4 text-base leading-relaxed text-white outline-none transition placeholder:text-white/25 focus:border-lime/60 focus:bg-white/[0.06]"
            />

            {/* 허니팟 — 사람 눈엔 안 보이고 봇만 채움 */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
              style={{ left: "-9999px" }}
            />

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.12em] text-white/35">
                {configured
                  ? "제출하면 바로 등록됩니다"
                  : "발제 저장소 설정 준비 중입니다"}
              </p>
              <button
                type="submit"
                disabled={!canSubmit || !configured}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-lime px-7 py-4 text-base font-bold text-ink transition enabled:hover:shadow-[0_20px_50px_-15px_rgba(200,255,61,0.6)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
              >
                <span>
                  {status === "submitting" ? "등록하는 중…" : "발제 올리기"}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {status === "success" && (
              <p className="mt-5 rounded-2xl border border-lime/25 bg-lime/[0.07] px-4 py-3 text-sm leading-relaxed text-lime-soft">
                등록됐어요. 왼쪽 목록에 반영됐습니다.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 rounded-2xl border border-red-400/25 bg-red-400/[0.07] px-4 py-3 text-sm leading-relaxed text-red-300">
                등록에 실패했어요. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
