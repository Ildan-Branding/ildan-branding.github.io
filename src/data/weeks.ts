export type WeekTopic = {
  num: string;
  title: string;
  desc: string;
  highlight?: string; // 본문 중 강조할 단어/구문 (원본의 <em> 역할)
};

export type Week = {
  week: number;
  badge: string;
  date: string;
  dateLabel: string;
  titlePrefix: string; // ex: "일단,"
  titleSuffix: string; // ex: "브랜딩"
  subtitle: string;
  topics: WeekTopic[];
  available: boolean;
};

export const weeks: Week[] = [
  {
    week: 1,
    badge: "Week 01 · Preview",
    date: "6월 1일 (일) 오후 8:30",
    dateLabel: "첫 번째 모임",
    titlePrefix: "일단,",
    titleSuffix: "브랜딩",
    subtitle: '"서비스"라 부를 수 있는 것을 만들어보자.',
    topics: [
      {
        num: "01",
        title: "자기소개",
        desc: "각자 준비한 한 장으로 간단히",
      },
      {
        num: "02",
        title: '"사내 툴" vs "서비스"',
        desc: "AI로 만드는 두 가지 결 — 우리는 배포되는 서비스를 목표로",
        highlight: "배포되는 서비스",
      },
      {
        num: "03",
        title: "바이브코딩은 이미 현실이다",
        desc: '거부할 수 없는 흐름, 그래서 "기획"이 중요해진다',
        highlight: '"기획"',
      },
      {
        num: "04",
        title: "이기적 공유",
        desc: "날것의 경험을 나누고, 그 과정 자체가 성장",
      },
      {
        num: "05",
        title: '"일단, 브랜딩" 제작 과정 공유',
        desc: "랜딩페이지는 어떻게 만들었나",
      },
    ],
    available: true,
  },
  {
    week: 2,
    badge: "Week 02",
    date: "6월 23일 (화) 오후 9:00",
    dateLabel: "두 번째 모임",
    titlePrefix: "일단,",
    titleSuffix: "프로젝트",
    subtitle: "AI 근황을 공유하고, 일단 뭘 만들지부터 정해보자.",
    topics: [
      { num: "01", title: "AI 소식 공유", desc: "" },
      { num: "02", title: "AI 활용 근황 공유", desc: "" },
      { num: "03", title: "LG 사내 공모전 논의", desc: "" },
      { num: "04", title: "프로젝트 주제 아이데이션", desc: "" },
      { num: "05", title: "기타 논의", desc: "" },
    ],
    available: true,
  },
  {
    week: 3,
    badge: "Week 03",
    date: "",
    dateLabel: "준비 중",
    titlePrefix: "",
    titleSuffix: "",
    subtitle: "",
    topics: [],
    available: false,
  },
  {
    week: 4,
    badge: "Week 04",
    date: "",
    dateLabel: "준비 중",
    titlePrefix: "",
    titleSuffix: "",
    subtitle: "",
    topics: [],
    available: false,
  },
];
