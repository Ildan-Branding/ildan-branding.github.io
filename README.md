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
- **Hosting**: GitHub Pages (via GitHub Actions)
- **Fonts**: Pretendard, JetBrains Mono, Space Grotesk

## 로컬 개발

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 정적 export → out/
```

## 배포

`main` 브랜치에 push하면 [GitHub Actions](.github/workflows/deploy.yml)가 자동으로 빌드해서 GitHub Pages로 배포. 별도 조작 필요 없음.

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

`/topics` 페이지 하단 입력창 → GitHub Issue 프리필 링크로 연결. 별도 백엔드/DB 없이 Issues가 저장소 역할을 한다.

- 제출된 발제: [`[발제]` 이슈 목록](https://github.com/Ildan-Branding/ildan-branding.github.io/issues?q=is%3Aissue+is%3Aopen+%5B%EB%B0%9C%EC%A0%9C%5D+in%3Atitle)
- 이슈 폼: [`.github/ISSUE_TEMPLATE/topic.yml`](.github/ISSUE_TEMPLATE/topic.yml)
- 운영: 모임 직전에 비슷한 발제끼리 묶어 순서를 정하고, 다룬 발제는 close
- 라벨로도 묶으려면 repo에 `topic` 라벨을 한 번 만들어두면 됨 (없으면 무시되고 제목 접두사 `[발제]`로만 구분)

입력창에 표시되는 대상 화 번호는 [`src/data/episodes.ts`](src/data/episodes.ts)의 `proposalEp`(마지막 화 + 1)에서 자동 계산.

## License

Private / internal — 모임 아카이브 용도.
