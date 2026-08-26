# 일단, 브랜딩 — AI Branding Meetup

> "서비스"라 부를 수 있는 것을 만들어보자.
> Try with AI. Create Anything.

AI를 활용해 이것저것 해보는 가벼운 모임. 정해진 목표 없이, 일단 모여서 각자 경험을 나누고 아이디어를 주고받는 자리.

**Live: [ildan-branding.github.io](https://ildan-branding.github.io/)**

---

## Archive

주차별 모임 아카이브는 [Topic 페이지](https://ildan-branding.github.io/topics/)에서 확인.

| EP | 날짜 | 그 화의 질문 |
|---|---|---|
| 01 | 6월 1일 (일) 20:30 | AI로 만든 걸 "서비스"라 부를 수 있을까? |
| 02 | 6월 23일 (화) 21:00 | 우리는 일단 뭘 만들어야 할까? |
| 03 | 7월 7일 (화) 21:00 | 여러 갈래 중 무엇부터 좁혀야 할까? |
| 04 | 7월 28일 (화) 21:00 | 우리는 AI 테크니션이 되어가고 있는 건 아닐까? |
| 05 | 8월 25일 (화) 21:00 | 모델이 상향평준화되면, 그래서 뭐가 남나? |

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

새 화는 [`src/data/episodes.ts`](src/data/episodes.ts)의 `episodes` 배열에 항목 추가.

```ts
{
  ep: N,
  badge: "EP.0N",
  date: "M월 D일 (요일) 오후 H:MM",
  dateLabel: "N 번째 에피소드",
  question: "그 화가 던지는 단 하나의 질문",   // 카드·모달의 주인공
  copy: "질문을 받쳐주는 카피 한 줄",
  segments: withOpening([                      // 공통 오프닝(00:00·00:10) 뒤에 붙는다
    { at: "00:20", title: "…", desc: "…", highlight: "desc 중 강조할 구문" },
    // …
  ]),
  takeaway: "끝난 화가 남긴 한 줄",            // 선택 — done인 화에만 노출
  status: "next",                              // 예정된 화는 하나만 next
}
```

- 배열에 추가하면 `/topics` 그리드 카드 + Hero의 다음 화 예고 + 지난 화 카운터가 자동 갱신된다.
- 새 화를 `next`로 올릴 때 이전 `next` 화는 `done`으로 내려준다. `nextEpisode`는 `status: "next"`인 **첫 번째** 화를 잡는다.
- 발제 입력창의 대상 화 번호(`proposalEp`)는 마지막 화 번호 + 1로 자동 계산된다.

## 발제 받기

`/topics` 페이지 하단 입력창 → GitHub Issue 프리필 링크로 연결. 별도 백엔드/DB 없이 Issues가 저장소 역할을 한다.

- 제출된 발제: [`[발제]` 이슈 목록](https://github.com/Ildan-Branding/ildan-branding.github.io/issues?q=is%3Aissue+is%3Aopen+%5B%EB%B0%9C%EC%A0%9C%5D+in%3Atitle)
- 이슈 폼: [`.github/ISSUE_TEMPLATE/topic.yml`](.github/ISSUE_TEMPLATE/topic.yml)
- 운영: 모임 직전에 비슷한 발제끼리 묶어 순서를 정하고, 다룬 발제는 close
- 라벨로도 묶으려면 repo에 `topic` 라벨을 한 번 만들어두면 됨 (없으면 무시되고 제목 접두사 `[발제]`로만 구분)

입력창에 표시되는 대상 화 번호는 [`src/data/episodes.ts`](src/data/episodes.ts)의 `proposalEp`(마지막 화 + 1)에서 자동 계산.

## License

Private / internal — 모임 아카이브 용도.
