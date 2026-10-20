export const storyCategories = [
  {
    id: "all",
    label: "전체",
  },
  {
    id: "furniture",
    label: "가구",
  },
  {
    id: "bag",
    label: "가방/가죽",
  },
  {
    id: "shoes",
    label: "신발",
  },
  {
    id: "clothing",
    label: "의류",
  },
  {
    id: "appliance",
    label: "가전제품",
  },
  {
    id: "living",
    label: "생활용품",
  },
] as const;
export const stories = [
  {
    slug: "wooden-chair",
    category: "furniture",
    label: "가구",
    title: "오래된 가구, 리폼으로 새롭게",
    description:
      "낡은 의자를 새로운 분위기로 바꾸는 방법과 알아두면 좋은 점을 소개합니다.",
    image: "/images/furniture-20261020.webp",
    seoDescription:
      "낡은 의자를 새로운 분위기로 바꾸는 방법과 알아두면 좋은 점을 소개합니다.",
    blocks: [
      {
        kind: "heading",
        text: "가구 리폼, 어디서부터 시작할까요?",
      },
      {
        kind: "paragraph",
        text: "나무 의자는 스크래치나 낡은 도장, 느슨해진 연결 부위 때문에 오래되어 보일 수 있습니다. 하지만 구조가 튼튼하다면 표면을 정리하거나 도장과 원단을 새로 선택해 완전히 다른 분위기를 만들 수 있습니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "업체에 상담하기 전에는 의자의 전체 상태와 손상 부위를 사진으로 남겨 두세요. 원하는 색감이나 재질의 참고 이미지가 있다면 함께 준비하는 것이 좋습니다.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "흔들림 등 안전과 관련된 구조적 손상은 전문가의 점검이 우선입니다.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
  {
    slug: "leather-bag",
    category: "bag",
    label: "가방/가죽",
    title: "가죽 가방 수선이 필요한 순간",
    description: "오랫동안 사용한 가죽 가방을 관리하고 수선할 때 알아둘 사항.",
    image: "/images/bag-20261020.webp",
    seoDescription:
      "오랫동안 사용한 가죽 가방을 관리하고 수선할 때 알아둘 사항.",
    blocks: [
      {
        kind: "heading",
        text: "오래 쓰는 가방의 작은 관리법",
      },
      {
        kind: "paragraph",
        text: "가죽 가방의 모서리 마모, 실밥 풀림, 손잡이 손상은 사용하면서 자연스럽게 생길 수 있는 변화입니다. 사용 흔적에 따라 클리닝, 염색, 바느질 또는 부속 교체 등 적합한 방법이 달라집니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "가죽 종류와 코팅 상태에 따라 작업 결과가 달라질 수 있으므로 수선 전 예상 결과와 주의사항을 확인해야 합니다.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "고가의 가방이라면 작업 이력과 재료, 보상 조건 등을 더 꼼꼼히 살펴보세요.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
  {
    slug: "sneaker-care",
    category: "shoes",
    label: "신발",
    title: "운동화 복원, 어떻게 해볼까요?",
    description: "좋아하는 운동화를 더 오래 신기 위한 세척과 복원 정보.",
    image: "/images/shoes-20261020.webp",
    seoDescription: "좋아하는 운동화를 더 오래 신기 위한 세척과 복원 정보.",
    blocks: [
      {
        kind: "heading",
        text: "세척과 복원은 다릅니다",
      },
      {
        kind: "paragraph",
        text: "운동화의 변색, 접착 부위 손상, 마모 정도에 따라 세탁만으로 해결되는 부분과 전문적인 복원 작업이 필요한 부분이 다릅니다. 소재마다 물과 세제에 대한 반응이 다르기 때문에 무리한 셀프 세척은 주의해야 합니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "업체에 의뢰한다면 소재와 원하는 작업 범위를 먼저 설명하고 견적, 예상 기간 등을 확인하세요.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "심한 밑창 마모나 구조 손상은 외관 복원보다 안전성을 먼저 고려하세요.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
  {
    slug: "clothes-repair",
    category: "clothing",
    label: "의류",
    title: "청바지 수선, 이렇게 달라져요",
    description: "작은 수선으로 옷의 핏과 착용감을 바꾸는 아이디어.",
    image: "/images/clothing-20261020.webp",
    seoDescription: "작은 수선으로 옷의 핏과 착용감을 바꾸는 아이디어.",
    blocks: [
      {
        kind: "heading",
        text: "내 몸에 맞는 옷으로 오래 입기",
      },
      {
        kind: "paragraph",
        text: "기장, 허리, 소매와 같은 간단한 수선만으로도 옷의 전체적인 인상을 바꿀 수 있습니다. 다만 봉제 방식과 소재, 패턴에 따라 가능한 범위가 다르니 미리 상담하는 것이 좋습니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "가장 자주 입는 신발과 함께 길이를 확인하거나, 원하는 핏의 옷을 참고로 가져가면 결과를 설명하기가 더 쉽습니다.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "옷의 원래 디자인과 여유 원단에 따라 수정 범위가 제한될 수 있습니다.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
  {
    slug: "wood-table",
    category: "living",
    label: "생활용품",
    title: "조명과 가구로 분위기 바꾸기",
    description: "이미 있는 물건을 활용해 공간을 새롭게 만드는 리폼 아이디어.",
    image: "/images/living-20261020.webp",
    seoDescription:
      "이미 있는 물건을 활용해 공간을 새롭게 만드는 리폼 아이디어.",
    blocks: [
      {
        kind: "heading",
        text: "지금 있는 물건에서 다시 시작하기",
      },
      {
        kind: "paragraph",
        text: "작은 테이블의 표면을 정리하거나 조명 커버와 손잡이를 바꾸는 방법처럼 대규모 구매 없이도 공간에 변화를 주는 방법이 있습니다. 무엇을 바꾸고 싶은지 먼저 정리하면 과도한 비용 지출을 줄일 수 있습니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "전기 조명처럼 안전과 인증이 중요한 물건은 임의로 분해하기보다 적절한 전문가의 점검을 받아야 합니다.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "전기·가스 관련 작업은 반드시 안전 요건과 전문 자격을 확인하세요.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
  {
    slug: "appliance-care",
    category: "appliance",
    label: "가전제품",
    title: "가전제품 수리 전 체크리스트",
    description: "소형 가전제품의 수리 가능성을 확인하기 전에 준비할 것.",
    image: "/images/appliance-20261020.webp",
    seoDescription: "소형 가전제품의 수리 가능성을 확인하기 전에 준비할 것.",
    blocks: [
      {
        kind: "heading",
        text: "고장 원인부터 정확하게 확인하기",
      },
      {
        kind: "paragraph",
        text: "가전제품이 작동하지 않을 때에는 전원, 케이블, 소모품 등 기본적인 상태를 우선 확인할 수 있습니다. 다만 제품 내부에는 감전이나 화재 위험이 있을 수 있으므로 임의 분해는 피하는 것이 안전합니다.",
      },
      {
        kind: "heading",
        text: "상담 전에 무엇을 준비하면 좋을까요?",
      },
      {
        kind: "paragraph",
        text: "모델명과 구입 시기, 증상, 오류 메시지, 제조사 서비스 정책을 정리하면 상담 시 도움이 됩니다. 수리비와 새 제품 가격도 함께 비교해 보세요.",
      },
      {
        kind: "note",
        lines: [
          "알아두세요",
          "보증기간 내 제품은 제조사 공식 서비스부터 확인해 보세요.",
          "실제 서비스 제공 여부, 가격, 결과는 각 업체에 직접 확인해야 합니다.",
        ],
      },
      {
        kind: "heading",
        text: "고쳐 쓰는 선택의 시작",
      },
      {
        kind: "paragraph",
        text: "물건을 수리할지, 새 제품을 선택할지는 상태와 비용, 안전성을 함께 고려해 결정할 수 있습니다. re:form은 이러한 선택에 필요한 수리·리폼 정보를 더 쉽게 탐색할 수 있도록 돕고자 합니다.",
      },
    ],
  },
] as const;
export type Story = (typeof stories)[number];
