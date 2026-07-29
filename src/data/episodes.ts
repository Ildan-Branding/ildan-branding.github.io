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
  segments: Segment[];
  /** 끝난 화가 남긴 한 줄 (종료된 화에만 노출) */
  takeaway?: string;
  status: "next" | "done";
};

/**
 * 모든 화가 공통으로 여는 구간.
 * 주제로 들어가기 전에 지난 화 이후의 AI 이슈와 각자의 활용·고민을 먼저 나눈다.
 */
const OPENING: Segment[] = [
  {
    at: "00:00",
    title: "AI 이슈 공유",
    desc: "지난 화 이후에 있었던 AI 소식 중 얘깃거리가 될 만한 것",
  },
  {
    at: "00:10",
    title: "각자의 활용과 고민",
    desc: "일하면서 AI를 어떻게 썼는지, 그러다 어떤 고민이 생겼는지",
    highlight: "어떤 고민이 생겼는지",
  },
];

/** 공통 오프닝 뒤에 그 화의 주제 구간을 잇는다 */
const withOpening = (topicSegments: Segment[]): Segment[] => [
  ...OPENING,
  ...topicSegments,
];

export const episodes: Episode[] = [
  {
    ep: 1,
    badge: "EP.01",
    date: "6월 1일 (일) 오후 8:30",
    dateLabel: "첫 번째 에피소드",
    question: "AI로 만든 걸 \"서비스\"라 부를 수 있을까?",
    copy: "\"서비스\"라 부를 수 있는 것을 만들어보자.",
    // 첫 화라 앞선 모임이 없어 공통 오프닝 대신 자기소개로 시작했다.
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
    copy: "일단 뭘 만들지부터 정해보자.",
    segments: withOpening([
      { at: "00:20", title: "LG 사내 공모전 논의", desc: "" },
      {
        at: "00:40",
        title: "프로젝트 주제 아이데이션",
        desc: "어떤 프로젝트로 시작해볼지 아이데이션",
      },
      { at: "01:15", title: "기타 논의", desc: "" },
    ]),
    status: "done",
  },
  {
    ep: 3,
    badge: "EP.03",
    date: "7월 7일 (화) 오후 9:00",
    dateLabel: "세 번째 에피소드",
    question: "여러 갈래 중 무엇부터 좁혀야 할까?",
    copy: "공모전과 첫 프로젝트, 방향을 좁혀본다.",
    segments: withOpening([
      {
        at: "00:20",
        title: "공모전 논의",
        desc: "제13회 전국 ICT융합 AI 공모전",
      },
      { at: "00:50", title: "외국인 대중교통 서비스 논의", desc: "" },
      { at: "01:15", title: "기타 논의", desc: "" },
    ]),
    status: "done",
  },
  {
    ep: 4,
    badge: "EP.04",
    date: "7월 28일 (화) 오후 9:00",
    dateLabel: "네 번째 에피소드",
    question: "우리는 AI 테크니션이 되어가고 있는 건 아닐까?",
    copy: "답은 AI에게, 질문은 나에게.",
    segments: withOpening([
      {
        at: "00:20",
        title: "AI 테크니션은 늘었는데",
        desc: "도구를 잘 다루는 법은 넘쳐나지만, \"왜 만드는지\"를 묻는 사람은 줄었다",
        highlight: "\"왜 만드는지\"",
      },
      {
        at: "00:45",
        title: "너무 기술적으로만 보고 있진 않은가",
        desc: "효율과 성능으로만 판단하다 보면, 의도까지 함께 버려진다",
        highlight: "의도까지 함께 버려진다",
      },
      {
        at: "01:05",
        title: "도구를 다시 바라보기",
        desc: "AI를 대체가 아니라 확장으로 쓰려면, 시각을 어떻게 재정렬해야 할까",
        highlight: "확장으로",
      },
      {
        at: "01:20",
        title: "그래서 우리는 어떻게 쓸 것인가",
        desc: "각자 다음까지 붙잡고 갈 \"나만의 질문\" 하나씩",
      },
    ]),
    status: "next",
  },
];

/** 다음 에피소드 (없으면 가장 최근 화) */
export const nextEpisode =
  episodes.find((e) => e.status === "next") ?? episodes[episodes.length - 1];

/** 최신순 정렬 */
export const episodesDesc = [...episodes].sort((a, b) => b.ep - a.ep);

/**
 * 발제를 받는 대상 화 번호.
 * 예정된 화는 이미 구간이 정해져 있으므로 항상 마지막 화의 다음 번호가 된다.
 */
export const proposalEp = Math.max(...episodes.map((e) => e.ep)) + 1;

/** 발제 대상 화의 배지 문자열 (ex: "EP.05") */
export const proposalEpBadge = `EP.${String(proposalEp).padStart(2, "0")}`;
