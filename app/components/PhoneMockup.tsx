type Props = { variant?: "map" | "detail"; className?: string };
export function PhoneMockup({ variant = "map", className = "" }: Props) {
  return (
    <div className={`phone ${className}`} aria-label="re:form 앱 디자인 예시">
      {variant === "map" ? (
        <>
          <div className="notch"></div>
          <div className="screen">
            <div className="screen-logo">re:form</div>
            <div className="screen-sub">내 주변 수리·리폼 업체</div>
            <div className="mock-map">
              <span className="pin a"></span>
              <span className="pin b"></span>
              <span className="pin c"></span>
              <span className="pin d"></span>
              <span className="pin e"></span>
              <span className="pin f"></span>
            </div>
            <div className="mock-section-label">
              <span>주변 업체</span>
              <span style={{ color: "#075647" }}>전체 보기 →</span>
            </div>
            <div className="mock-list">
              <div className="mock-list-item">
                <img
                  src="/images/category-furniture.webp"
                  alt=""
                  loading="lazy"
                />
                <div>
                  <strong>가구 수리·리폼</strong>
                  <small>우리 동네 업체 알아보기</small>
                </div>
              </div>
              <div className="mock-list-item">
                <img src="/images/category-bag.webp" alt="" loading="lazy" />
                <div>
                  <strong>가방·가죽 관리</strong>
                  <small>수선 정보 확인하기</small>
                </div>
              </div>
            </div>
            <div className="mock-tabs">
              <span>⌂ 홈</span>
              <span>⌕ 검색</span>
              <span>♡ 즐겨찾기</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="notch"></div>
          <div className="screen">
            <div className="screen-logo">re:form</div>
            <img
              src="/images/story-bag.webp"
              alt="가죽 가방 이미지"
              loading="lazy"
              className="mock-detail-image"
            />
            <div className="mock-detail-name">가방·가죽 수선</div>
            <p className="mock-detail-copy">
              좋아하는 물건을 오래 사용하는 방법
            </p>
            <div className="mock-detail-row">
              <span>카테고리</span>
              <b>가방 / 가죽</b>
            </div>
            <div className="mock-detail-row">
              <span>업체 정보</span>
              <b>정보 확인</b>
            </div>
            <div className="mock-detail-row">
              <span>위치</span>
              <b>지도에서 보기</b>
            </div>
            <div className="mock-detail-btn">업체 정보 살펴보기</div>
            <div className="mock-tabs">
              <span>⌂ 홈</span>
              <span>⌕ 검색</span>
              <span>♡ 즐겨찾기</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
