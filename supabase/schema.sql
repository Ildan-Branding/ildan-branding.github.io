-- 발제(topic proposal) 테이블
-- Supabase 프로젝트 생성 후 SQL Editor에서 한 번 실행하면 됨.

create extension if not exists pgcrypto;

create table if not exists topic_proposals (
  id uuid primary key default gen_random_uuid(),
  summary text not null check (char_length(summary) between 1 and 80),
  why text check (why is null or char_length(why) <= 500),
  target_ep integer not null,
  created_at timestamptz not null default now()
);

create index if not exists topic_proposals_target_ep_idx
  on topic_proposals (target_ep, created_at desc);

alter table topic_proposals enable row level security;

-- 로그인 없이 익명(anon) 키로 제출 가능
create policy "topic_proposals_public_insert"
  on topic_proposals for insert
  to anon
  with check (true);

-- 사이트에서 발제 목록을 보여주기 위한 공개 조회
create policy "topic_proposals_public_select"
  on topic_proposals for select
  to anon
  using (true);
