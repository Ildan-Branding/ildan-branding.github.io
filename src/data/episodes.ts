export type Segment = {
  /** 진행 순서상의 시점 (ex: "00:10") */
  at: string;
  title: string;
  desc: string;
  /** desc 중 강조할 단어/구문 */
  highlight?: string;
};

export type Episode = {
  ep: number;
  badge: string;
  date: string;
  dateLabel: string;
  /** 그 화가 던지는 단 하나의 질문 */
  question: string;
  /** 질문을 받쳐주는 카피 한 줄 */
  copy: string;
  titlePrefix: string; // ex: "일단,"
  titleSuffix: string; // ex: "질문"
  segments: Segment[];
  /** 끝난 화가 남긴 한 줄 (종료된 화에만 노출) */
  takeaway?: string;
  status: "next" | "done";
};

export const episodes: Episode[] = [
  {
    ep: 1,
    badge: "EP.01",
    date: "6월 1일 (일) 오후 8:30",
    dateLabel: "첫 번째 에피소드",
    question: "AI로 만든 걸 \"서비스\"라 부를 수 있을까?",
    copy: "\"서비스\"라 부를 수 있는 것을 만들어보자.",
    titlePrefix: "일단,",
    titleSuffix: "브랜딩",
    segments: [
      {
        at: "00:00",
        title: "자기소개",
        desc: "각자 준비한 한 장으로 간단히",
      },
      {
        at: "00:15",
        title: "\"사내 툴\" vs \"서비스\"",
        desc: "AI로 만드는 두 가지 결 — 우리는 배포되는 서비스를 목표로",
        highlight: "배포되는 서비스",
      },
      {
        at: "00:35",
        title: "바이브코딩은 이미 현실이다",
        desc: "거부할 수 없는 흐름, 그래서 \"기획\"이 중요해진다",
        highlight: "\"기획\"",
      },
      {
        at: "00:55",
        title: "이기적 공유",
        desc: "날것의 경험을 나누고, 그 과정 자체가 성장",
      },
      {
        at: "01:10",
        title: "\"일단, 브랜딩\" 제작 과정 공유",
        desc: "랜딩페이지는 어떻게 만들었나",
      },
    ],
    status: "done",
  },
  {
    ep: 2,
    badge: "EP.02",
    date: "6월 23일 (화) 오후 9:00",
    dateLabel: "두 번째 에피소드",
    question: "우리는 일단 뭘 만들어야 할까?",
    copy: "AI 근황을 공유하고, 일단 뭘 만들지부터 정해보자.",
    titlePrefix: "일단,",
    titleSuffix: "브레인스토밍",
    segments: [
      {
        at: "00:00",
        title: "AI 소식 공유",
        desc: "최근 발생한 AI 관련 이야깃거리 공유",
      },
      {
        at: "00:15",
        title: "AI 활용 근황 공유",
        desc: "일을 하며 AI를 어떻게 쓰고 있는지 근황 공유",
      },
      { at: "00:35", title: "LG 사내 공모전 논의", desc: "" },
      {
        at: "00:50",
        title: "프로젝트 주제 아이데이션",
        desc: "어떤 프로젝트로 시작해볼지 아이데이션",
      },
      { at: "01:15", title: "기타 논의", desc: "" },
    ],
    status: "done",
  },
  {
    ep: 3,
    badge: "EP.03",
    date: "7월 7일 (화) 오후 9:00",
    dateLabel: "세 번째 에피소드",
    question: "여러 갈래 중 무엇부터 좁혀야 할까?",
    copy: "공모전과 첫 프로젝트, 방향을 좁혀본다.",
    titlePrefix: "일단,",
    titleSuffix: "방향",
    segments: [
      { at: "00:00", title: "소식 공유", desc: "" },
      { at: "00:10", title: "활용 근황 공유", desc: "" },
      {
        at: "00:30",
        title: "공모전 논의",
        desc: "제13회 전국 ICT융합 AI 공모전",
      },
      { at: "00:55", title: "외국인 대중교통 서비스 논의", desc: "" },
      { at: "01:15", title: "기타 논의", desc: "" },
    ],
    status: "done",
  },
  {
    ep: 4,
    badge: "EP.04",
    date: "7월 28일 (화) 오후 9:00",
    dateLabel: "네 번째 에피소드",
    question: "우리는 AI 테크니션이 되어가고 있는 건 아닐까?",
    copy: "답은 AI에게, 질문은 나에게.",
    titlePrefix: "일단,",
    titleSuffix: "질문",
    segments: [
      {
        at: "00:00",
        title: "오프닝 — 요즘 우리가 AI를 쓰는 방식",
        desc: "한 주 동안 AI에게 맡긴 일들, 무심코 넘긴 판단들 꺼내보기",
      },
      {
        at: "00:10",
        title: "AI 테크니션은 늘었는데",
        desc: "도구를 잘 다루는 법은 넘쳐나지만, \"왜 만드는지\"를 묻는 사람은 줄었다",
        highlight: "\"왜 만드는지\"",
      },
      {
        at: "00:35",
        title: "너무 기술적으로만 보고 있진 않은가",
        desc: "효율과 성능으로만 판단하다 보면, 의도까지 함께 버려진다",
        highlight: "의도까지 함께 버려진다",
      },
      {
        at: "01:00",
        title: "도구를 다시 바라보기",
        desc: "AI를 대체가 아니라 확장으로 쓰려면, 시각을 어떻게 재정렬해야 할까",
        highlight: "확장으로",
      },
      {
        at: "01:15",
        title: "클로징 — 그래서 우리는 어떻게 쓸 것인가",
        desc: "각자 다음까지 붙잡고 갈 \"나만의 질문\" 하나씩",
      },
    ],
    status: "next",
  },
];

/** 다음 에피소드 (없으면 가장 최근 화) */
export const nextEpisode =
  episodes.find((e) => e.status === "next") ?? episodes[episodes.length - 1];

/** 최신순 정렬 */
export const episodesDesc = [...episodes].sort((a, b) => b.ep - a.ep);
