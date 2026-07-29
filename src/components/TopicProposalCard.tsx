"use client";

import Link from "next/link";
import { useState } from "react";
import { episodes, proposalEpBadge } from "@/data/episodes";
import { MAX_SUMMARY, openProposal } from "@/lib/proposal";

const doneCount = episodes.filter((e) => e.status === "done").length;

/** Hero 안에 들어가는 컴팩트 발제 입력 카드 (자세한 입력은 /topics) */
export default function TopicProposalCard() {
  const [summary, setSummary] = useState("");
  const [opened, setOpened] = useState(false);

  const canSubmit = summary.trim().length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    openProposal(summary);
    setOpened(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[440px] flex-col gap-5 rounded-3xl border border-lime/30 bg-lime/5 p-6 backdrop-blur-sm md:w-[300px] md:p-7 lg:w-[380px] lg:p-8 xl:w-[440px]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-lime md:text-sm">
          {proposalEpBadge}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
          Next Topic
        </span>
      </div>

      <div>
        <label
          htmlFor="hero-topic"
          className="text-balance block text-xl font-extrabold leading-[1.3] tracking-tight text-white md:text-2xl lg:text-[1.7rem]"
        >
          다음 화에 던지고 싶은 질문은?
        </label>
        <input
          id="hero-topic"
          type="text"
          value={summary}
          maxLength={MAX_SUMMARY}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="한 줄로 남겨주세요"
          className="mt-4 w-full rounded-2xl border border-lime/25 bg-ink/40 px-4 py-3.5 text-base font-semibold text-white outline-none transition placeholder:font-normal placeholder:text-white/30 focus:border-lime/70 focus:bg-ink/60"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-3.5 text-base font-bold text-ink transition enabled:hover:shadow-[0_18px_40px_-15px_rgba(200,255,61,0.7)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
      >
        <span>발제 올리기</span>
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </button>

      {opened && (
        <p className="text-xs leading-relaxed text-lime-soft">
          GitHub 탭을 열었어요. 내용 확인하고{" "}
          <span className="font-bold">Create</span> 누르면 등록됩니다.
        </p>
      )}

      <div className="flex items-end justify-between gap-4 border-t border-lime/20 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          지난 에피소드 {doneCount}
        </span>
        <Link
          href="/topics"
          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-lime transition hover:underline"
        >
          전체 보기
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </form>
  );
}
