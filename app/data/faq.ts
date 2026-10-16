export const faqCategories = [
  {
    id: "all",
    label: "전체",
  },
  {
    id: "basic",
    label: "서비스 소개",
  },
  {
    id: "use",
    label: "앱 이용",
  },
  {
    id: "search",
    label: "업체 정보",
  },
  {
    id: "review",
    label: "리뷰",
  },
  {
    id: "favorite",
    label: "즐겨찾기",
  },
  {
    id: "account",
    label: "계정/기타",
  },
] as const;
export const faqs = [
  {
    id: "1",
    category: "basic",
    question: "Q. re:form은 어떤 서비스인가요?",
    answer:
      "re:form은 주변의 수리·리폼 관련 업체와 정보를 보다 쉽게 찾고 살펴볼 수 있도록 돕는 앱 서비스입니다. 웹사이트에서는 앱 소개 및 이용 안내를 제공합니다.",
  },
  {
    id: "2",
    category: "use",
    question: "Q. 이용 요금이 있나요?",
    answer:
      "일반 사용자의 앱 탐색 기능은 무료 제공을 목표로 합니다. 향후 유료 기능이나 별도 서비스가 도입될 경우 앱과 관련 안내 페이지를 통해 사전에 안내할 예정입니다.",
  },
  {
    id: "3",
    category: "basic",
    question: "Q. 웹사이트에서도 업체를 검색할 수 있나요?",
    answer:
      "현재 웹사이트는 re:form 앱을 소개하는 마케팅 사이트입니다. 업체 검색과 즐겨찾기 등의 기능은 앱에서 이용하도록 설계되어 있습니다.",
  },
  {
    id: "4",
    category: "search",
    question: "Q. 업체 정보는 어떻게 제공되나요?",
    answer:
      "공개적으로 확인할 수 있는 업체 정보와 각종 데이터 출처를 활용할 수 있으며, 제공 내용과 정확도는 업체 및 출처에 따라 달라질 수 있습니다. 방문 전 해당 업체에 직접 확인해 주세요.",
  },
  {
    id: "5",
    category: "review",
    question: "Q. 리뷰는 어떻게 확인하나요?",
    answer:
      "앱에서 제공되는 범위 내의 리뷰 및 관련 정보를 참고할 수 있습니다. 리뷰의 출처와 제공 가능 여부는 서비스 및 연동 조건에 따라 달라질 수 있습니다.",
  },
  {
    id: "6",
    category: "favorite",
    question: "Q. 즐겨찾기는 어떻게 사용하나요?",
    answer:
      "즐겨찾기는 SNS 로그인 후 관심 업체를 저장하고 다시 확인하는 기능입니다. 로그인 방식 및 관련 처리는 출시 버전에 따라 달라질 수 있습니다.",
  },
  {
    id: "7",
    category: "account",
    question: "Q. 회원가입이 필요한가요?",
    answer:
      "기본적인 업체 정보 탐색은 로그인 없이 이용하는 방향으로 설계되어 있습니다. 즐겨찾기 등 개인화 기능에서는 SNS 로그인이 필요할 수 있습니다.",
  },
  {
    id: "8",
    category: "use",
    question: "Q. 언제부터 이용할 수 있나요?",
    answer:
      "앱 출시 일정과 스토어 링크는 확정 후 본 웹사이트를 통해 안내합니다. 현재 표시된 다운로드 버튼은 출시 준비 안내를 제공합니다.",
  },
  {
    id: "9",
    category: "search",
    question: "Q. 업체의 영업 여부나 가격을 알 수 있나요?",
    answer:
      "표시되는 정보는 변경될 수 있으며, 수리 가능 여부나 견적·운영시간 등은 업체마다 다릅니다. 서비스 이용 전 해당 업체에 직접 확인하는 것이 가장 정확합니다.",
  },
  {
    id: "10",
    category: "account",
    question: "Q. 개인정보는 어떻게 관리되나요?",
    answer:
      "실제 운영 시 적용되는 수집 항목과 이용 목적은 정식 개인정보처리방침에서 확인할 수 있습니다. 현재 정책 페이지에는 검토가 필요한 초안 문구가 포함되어 있습니다.",
  },
] as const;
