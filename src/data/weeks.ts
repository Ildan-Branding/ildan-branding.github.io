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
    titleSuffix: "브레인스토밍",
    subtitle: "AI 근황을 공유하고, 일단 뭘 만들지부터 정해보자.",
    topics: [
      {
        num: "01",
        title: "AI 소식 공유",
        desc: "최근 발생한 AI 관련 이야깃거리 공유",
      },
      {
        num: "02",
        title: "AI 활용 근황 공유",
        desc: "일을 하며 AI를 어떻게 쓰고 있는지 근황 공유",
      },
      { num: "03", title: "LG 사내 공모전 논의", desc: "" },
      {
        num: "04",
        title: "프로젝트 주제 아이데이션",
        desc: "어떤 프로젝트로 시작해볼지 아이데이션",
      },
      { num: "05", title: "기타 논의", desc: "" },
    ],
    available: true,
  },
  {
    week: 3,
    badge: "Week 03",
    date: "7월 7일 (화) 오후 9:00",
    dateLabel: "세 번째 모임",
    titlePrefix: "일단,",
    titleSuffix: "방향",
    subtitle: "공모전과 첫 프로젝트, 방향을 좁혀본다.",
    topics: [
      { num: "01", title: "소식 공유", desc: "" },
      { num: "02", title: "활용 근황 공유", desc: "" },
      {
        num: "03",
        title: "공모전 논의",
        desc: "제13회 전국 ICT융합 AI 공모전",
      },
      { num: "04", title: "외국인 대중교통 서비스 논의", desc: "" },
      { num: "05", title: "기타 논의", desc: "" },
    ],
    available: true,
  },
  {
    week: 4,
    badge: "Week 04 · Podcast",
    date: "7월 28일 (화) 오후 9:00",
    dateLabel: "네 번째 모임",
    titlePrefix: "일단,",
    titleSuffix: "질문",
    subtitle: "답은 AI에게, 질문은 나에게 — AI 도구를 바라보는 시각을 다시 정렬한다.",
    topics: [
      {
        num: "01",
        title: "오프닝 — 요즘 우리가 AI를 쓰는 방식",
        desc: "한 주 동안 AI에게 맡긴 일들, 무심코 넘긴 판단들 꺼내보기",
      },
      {
        num: "02",
        title: "테크니션은 늘었는데, 사유는 줄었다",
        desc: "AI를 '잘 쓰는 법'은 넘쳐나지만, '왜 쓰는지'는 사라지고 있다",
        highlight: "'왜 쓰는지'",
      },
      {
        num: "03",
        title: "효율화의 함정",
        desc: "생각하는 것마저 위탁하고, 의도까지 버리게 되는 순간",
        highlight: "의도까지 버리게 되는 순간",
      },
      {
        num: "04",
        title: "도구를 다시 바라보기",
        desc: "AI를 대체가 아니라 확장으로 쓰려면, 시각을 어떻게 재정렬해야 할까",
        highlight: "확장으로",
      },
      {
        num: "05",
        title: "클로징 — 그래서 우리는 어떻게 쓸 것인가",
        desc: "각자 다음까지 붙잡고 갈 '나만의 질문' 하나씩",
      },
    ],
    available: true,
  },
];
