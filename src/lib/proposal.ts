/**
 * 발제 제출 — 정적 사이트(GitHub Pages)라 서버가 없어서
 * 입력값을 GitHub Issue 프리필 URL로 넘겨 Issues에 쌓는다.
 */

const REPO = "Ildan-Branding/ildan-branding.github.io";

/** 발제 목록 — 라벨 유무와 무관하게 동작하도록 제목 접두사로 검색 */
export const PROPOSAL_LIST_URL = `https://github.com/${REPO}/issues?q=${encodeURIComponent(
  "is:issue is:open [발제] in:title sort:created-desc"
)}`;

export const MAX_SUMMARY = 80;
export const MAX_WHY = 500;

export function buildProposalUrl(summary: string, why = "") {
  const params = new URLSearchParams({
    template: "topic.yml",
    title: `[발제] ${summary}`,
    summary,
  });
  if (why) params.set("why", why);
  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}

/** 새 탭에서 이슈 작성 화면을 연다 */
export function openProposal(summary: string, why = "") {
  window.open(
    buildProposalUrl(summary.trim(), why.trim()),
    "_blank",
    "noopener,noreferrer"
  );
}
