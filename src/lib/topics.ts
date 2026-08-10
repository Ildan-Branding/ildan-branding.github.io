import { supabase } from "@/lib/supabase";

export const MAX_SUMMARY = 80;
export const MAX_WHY = 500;

export type TopicProposal = {
  id: string;
  summary: string;
  why: string | null;
  target_ep: number;
  created_at: string;
};

export function isTopicsConfigured() {
  return supabase !== null;
}

export async function submitTopic(
  summary: string,
  why: string,
  targetEp: number
) {
  if (!supabase) throw new Error("Supabase가 아직 설정되지 않았습니다.");
  const { error } = await supabase.from("topic_proposals").insert({
    summary: summary.trim(),
    why: why.trim() || null,
    target_ep: targetEp,
  });
  if (error) throw error;
}

export async function fetchTopics(targetEp: number): Promise<TopicProposal[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("topic_proposals")
    .select("*")
    .eq("target_ep", targetEp)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
