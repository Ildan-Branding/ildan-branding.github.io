# 일단, 브랜딩 — AI Branding Meetup

> "서비스"라 부를 수 있는 것을 만들어보자.
> Try with AI. Create Anything.

AI를 활용해 이것저것 해보는 가벼운 모임. 정해진 목표 없이, 일단 모여서 각자 경험을 나누고 아이디어를 주고받는 자리.

**Live: [ildan-branding.github.io](https://ildan-branding.github.io/)**

---

## Archive

주차별 모임 아카이브는 [Topic 페이지](https://ildan-branding.github.io/topics/)에서 확인.

| Week | 날짜 | 주제 |
|---|---|---|
| 01 | 6월 1일 (일) 20:30 | 일단, 브랜딩 |
| 02 | 6월 23일 (화) 21:00 | 일단, 브레인스토밍 |
| 03 | 7월 7일 (화) 21:00 | 일단, 방향 |

## Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS + custom design tokens
- **Motion**: Framer Motion, Lenis
- **Data**: Supabase (Postgres) — 발제(topic) 저장
- **Hosting**: GitHub Pages (via GitHub Actions)
- **Fonts**: Pretendard, JetBrains Mono, Space Grotesk

## 로컬 개발

```bash
npm install
cp .env.local.example .env.local   # Supabase URL / anon key 채우기
npm run dev          # http://localhost:3000
npm run build        # 정적 export → out/
```

`.env.local`이 비어있어도 빌드/개발은 되지만 발제 입력창이 "설정 준비 중"으로 비활성화된다.

## 배포

`main` 브랜치에 push하면 [GitHub Actions](.github/workflows/deploy.yml)가 자동으로 빌드해서 GitHub Pages로 배포. 빌드 시 아래 두 GitHub Actions secret을 주입해 Supabase에 연결한다.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

(Settings → Secrets and variables → Actions에서 등록. anon key는 공개돼도 되는 키지만 편의상 secret으로 관리)

## 콘텐츠 추가

새 주차 아카이브는 [`src/data/weeks.ts`](src/data/weeks.ts)에 항목 추가.

```ts
{
  week: N,
  badge: "Week 0N",
  date: "M월 D일 (요일) 오후 H:MM",
  dateLabel: "N 번째 모임",
  titlePrefix: "일단,",
  titleSuffix: "…",
  subtitle: "…",
  topics: [
    { num: "01", title: "…", desc: "" },
    // …
  ],
  available: true,
}
```

`available: true`가 되면 자동으로 `/topics` 그리드에 카드 추가 + Hero 카운터 갱신.

## 발제 받기

Hero 카드(메인) + `/topics` 페이지 입력창에서 Supabase `topic_proposals` 테이블에 바로 저장된다. 로그인 없이 제출되고, 제출 즉시 그 자리에서 등록·목록 갱신까지 끝난다 (새 탭 없음).

**최초 1회 세팅**

1. [supabase.com](https://supabase.com)에서 프로젝트 생성 (무료 티어, organization당 2개까지)
2. SQL Editor에서 [`supabase/schema.sql`](supabase/schema.sql) 실행 — `topic_proposals` 테이블 + RLS 정책(익명 insert/select 허용) 생성
3. 프로젝트 Settings → API에서 `Project URL`, `anon public` key 확인
4. 로컬: `.env.local`에 채우기 / 배포: repo secrets에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 등록

**운영**

- 발제 확인·정리는 Supabase 대시보드의 Table Editor에서 (스프레드시트처럼 필터/정렬 가능)
- 모임 직전에 비슷한 발제끼리 묶어 순서를 정하고, 다룬 발제는 행 삭제 또는 별도 컬럼으로 표시
- 스팸 방지: 로그인 게이트는 없고, 폼에 허니팟 필드만 있음 — 트래픽이 커지면 Supabase Auth나 Turnstile 추가 고려

입력창에 표시되는 대상 화 번호는 [`src/data/episodes.ts`](src/data/episodes.ts)의 `proposalEp`(마지막 화 + 1)에서 자동 계산.

## License

Private / internal — 모임 아카이브 용도.
