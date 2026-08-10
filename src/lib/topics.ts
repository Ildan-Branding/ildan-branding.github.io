/**
 * 발제 제출/조회 — Cloudflare Worker(worker/)를 통해 Notion "💡 아이디어" DB에 쌓인다.
 * Worker가 Notion 토큰을 대신 들고 있어서 정적 사이트에서 직접 호출 가능.
 */

const API_URL = process.env.NEXT_PUBLIC_TOPICS_API_URL;

export const MAX_SUMMARY = 80;
export const MAX_WHY = 500;

export type TopicProposal = {
  id: string;
  summary: string;
  why: string | null;
  created_at: string;
};

export function isTopicsConfigured() {
  return Boolean(API_URL);
}

export async function submitTopic(
  summary: string,
  why: string,
  honeypot = ""
) {
  if (!API_URL) throw new Error("발제 API가 아직 설정되지 않았습니다.");
  const res = await fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: summary.trim(),
      why: why.trim(),
      honeypot,
    }),
  });
  if (!res.ok) throw new Error("발제 등록에 실패했습니다.");
}

export async function fetchTopics(): Promise<TopicProposal[]> {
  if (!API_URL) return [];
  const res = await fetch(`${API_URL}/list`);
  if (!res.ok) throw new Error("발제 목록을 불러오지 못했습니다.");
  const data = await res.json();
  return data.items ?? [];
}
