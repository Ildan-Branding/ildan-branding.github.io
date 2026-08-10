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
- **Data**: Notion ("💡 아이디어" DB) — 발제(topic) 저장, Cloudflare Worker([`worker/`](worker))가 프록시
- **Hosting**: GitHub Pages (via GitHub Actions)
- **Fonts**: Pretendard, JetBrains Mono, Space Grotesk

## 로컬 개발

```bash
npm install
cp .env.local.example .env.local   # 배포된 Worker URL 채우기
npm run dev          # http://localhost:3000
npm run build        # 정적 export → out/
```

`.env.local`이 비어있어도 빌드/개발은 되지만 발제 입력창이 "설정 준비 중"으로 비활성화된다.

## 배포

두 개의 배포 파이프라인이 push 한 번으로 같이 돈다.

- **프론트**: `main`에 push → [`deploy.yml`](.github/workflows/deploy.yml)이 빌드해서 GitHub Pages로 배포. 빌드 시 repo secret `NEXT_PUBLIC_TOPICS_API_URL`(Worker URL)을 주입.
- **Worker**: `worker/` 변경분이 `main`에 push되면 [`deploy-worker.yml`](.github/workflows/deploy-worker.yml)이 Cloudflare에 배포.

(둘 다 Settings → Secrets and variables → Actions에서 시크릿 등록)

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

Hero 카드(메인) + `/topics` 페이지 입력창에서 제출하면 [Cloudflare Worker](worker)를 거쳐 이미 쓰고 있는 노션 워크스페이스의 **"일단, 브랜딩 — 아카이브" > "💡 아이디어" 데이터베이스**에 바로 쌓인다. 로그인 없이 제출되고, 제출 즉시 그 자리에서 등록·목록 갱신까지 끝난다 (새 탭 없음).

정적 사이트는 Notion API 토큰을 직접 들고 있을 수 없어서, Worker가 토큰을 대신 들고 중계한다.

**필드 매핑** (이미 그 DB에서 쓰는 속성 그대로 사용, 스키마 변경 없음)

| 사이트 입력 | 노션 속성 |
|---|---|
| 한 줄 요약 | `제목` (title) |
| 이유 (선택) | `내용` (text) |
| — | `상태` = `제안` (고정) |
| — | `공유자` = `웹사이트` (고정) |

`주차` 연결은 자동으로 안 채운다 — 기존 항목들도 등록 시점엔 비워뒀다가 모임 직전에 정리하면서 채우는 식으로 쓰고 있어서, 그 흐름 그대로 유지.

**최초 1회 세팅**

1. **Notion 통합(integration) 생성**: [notion.so/my-integrations](https://www.notion.so/my-integrations) → New integration → Internal Integration Secret 복사
2. **DB에 통합 연결**: "💡 아이디어" 데이터베이스 페이지 우측 상단 `···` → Connections → 방금 만든 통합 추가 (이거 안 하면 API가 그 DB를 못 봄)
3. **Cloudflare Worker 배포**
   ```bash
   cd worker
   npx wrangler login
   npx wrangler secret put NOTION_TOKEN   # 1번에서 복사한 값 붙여넣기
   npx wrangler deploy
   ```
   배포 후 나오는 `https://ildan-branding-topics.<account>.workers.dev` 같은 URL을 기록
4. **GitHub Actions로도 자동배포하려면** repo secrets에 등록: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `NOTION_TOKEN` — 이후 `worker/` 변경 push할 때마다 자동 배포
5. **프론트에 Worker URL 연결**: 로컬 `.env.local` 또는 repo secret `NEXT_PUBLIC_TOPICS_API_URL`에 3번 URL 입력

**운영**

- 발제 확인·정리는 지금 쓰는 노션 화면 그대로 (필터/정렬/그룹 다 됨)
- 모임 직전에 비슷한 발제끼리 `주차`로 묶고, `상태`를 `채택`/`보류`로 바꾸면 사이트 목록(`상태 = 제안`만 보여줌)에서 자동으로 빠짐
- 스팸 방지: 로그인 게이트는 없고, 폼에 허니팟 필드가 있고 Worker에서도 한 번 더 검증함

## License

Private / internal — 모임 아카이브 용도.
