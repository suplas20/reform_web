import { DownloadButton } from "../components/DownloadButton";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
import { DownloadCta } from "../components/DownloadCta";
import { PhoneMockup } from "../components/PhoneMockup";
export const meta = () => createPageMeta(pages.features);
export default function Page() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <span className="eyebrow">FEATURES</span>
            <h1>
              필요한 수리·리폼,
              <br />더 쉽고 빠르게.
            </h1>
            <p className="lead">
              re:form의 다양한 기능으로 원하는 업체를 쉽게 찾고, 비교하고, 관심
              업체를 저장할 수 있습니다.
            </p>
            <DownloadButton className="btn">
              앱 다운로드 안내{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12h16m-6-6 6 6-6 6"></path>
              </svg>
            </DownloadButton>
          </div>
          <div
            className="page-hero-visual features-hero"
            role="img"
            aria-label="햇빛이 드는 거실의 소파"
          ></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT YOU CAN DO</span>
              <h2>일상을 바꾸는 여섯 가지 기능</h2>
            </div>
          </div>
          <div className="feature-overview-grid">
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"></path>
                  <circle cx="12" cy="10" r="2.5"></circle>
                </svg>
              </div>
              <h3>주변 업체 검색</h3>
              <p>현재 지역을 기준으로 필요한 수리·리폼 업체를 찾아보세요.</p>
            </div>
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                </svg>
              </div>
              <h3>카테고리 탐색</h3>
              <p>물건과 서비스 종류에 맞춰 필요한 분야를 살펴보세요.</p>
            </div>
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 11v6m0-10v1"></path>
                </svg>
              </div>
              <h3>업체 정보 확인</h3>
              <p>위치와 업종 등 확인 가능한 정보를 살펴보세요.</p>
            </div>
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3z"></path>
                </svg>
              </div>
              <h3>리뷰 비교</h3>
              <p>제공 가능한 후기 및 평점 정보를 참고해 보세요.</p>
            </div>
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l8.9-8.9a5.5 5.5 0 0 0-.1-7.5z"></path>
                </svg>
              </div>
              <h3>즐겨찾기</h3>
              <p>관심 있는 업체를 저장하고 필요할 때 다시 보세요.</p>
            </div>
            <div className="overview-card">
              <div className="icon-bubble">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m20 20-4-4"></path>
                </svg>
              </div>
              <h3>지도에서 보기</h3>
              <p>지역의 업체를 지도로 살펴보고 위치를 확인해 보세요.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container">
          <span className="eyebrow">APP EXPERIENCE</span>
          <h2 style={{ margin: "12px 0 0" }}>
            re:form 앱을 더 자세히 살펴보세요.
          </h2>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 01</span>
              <h2>내 주변 업체 검색</h2>
              <p className="lead">
                어디에 있는지 몰라서 찾기 어려웠던 수리·리폼 업체. 지도와 지역
                기반 검색으로 주변의 업체를 더 간편하게 발견할 수 있습니다.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  지역 기반 탐색
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  지도에서 위치 확인
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  업체 목록 확인
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="map" />
            </div>
          </article>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 02</span>
              <h2>다양한 카테고리</h2>
              <p className="lead">
                가구, 가방, 신발, 의류, 가전제품 등 다양한 카테고리를 살펴보고
                내 물건에 맞는 수리·리폼 분야를 찾아보세요.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  분야별 탐색
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  직관적인 카테고리 구성
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  관련 업체 정보 연결
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="detail" />
            </div>
          </article>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 03</span>
              <h2>확인 가능한 업체 정보</h2>
              <p className="lead">
                업체를 선택하기 전에 위치와 분류, 공개된 정보 등을 한눈에 살펴볼
                수 있습니다. 실제 서비스 범위와 영업 여부는 해당 업체에 확인해
                주세요.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  업체 소개 및 업종 정보
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  위치 등 기본 정보
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  상세 확인을 위한 안내
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="detail" />
            </div>
          </article>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 04</span>
              <h2>정보와 리뷰 비교</h2>
              <p className="lead">
                한 곳만 보고 결정하기 어렵다면 여러 업체의 공개된 정보와 이용
                가능한 리뷰를 비교해 보세요. 제공 범위는 업체와 출처에 따라
                다릅니다.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  업체별 정보 비교
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  제공 가능한 리뷰 참고
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  나에게 맞는 선택
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="map" />
            </div>
          </article>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 05</span>
              <h2>즐겨찾기</h2>
              <p className="lead">
                당장 방문하지 않더라도 관심 있는 업체를 저장해 두었다가 필요한
                순간 다시 확인할 수 있습니다. 즐겨찾기는 로그인 후 이용할 수
                있습니다.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  관심 업체 저장
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  다시 찾아보기
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  SNS 로그인 기반 이용
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="detail" />
            </div>
          </article>
          <article className="feature-detail-row">
            <div className="feature-detail-copy">
              <span className="feature-detail-number">FEATURE 06</span>
              <h2>지역의 수리·리폼 발견</h2>
              <p className="lead">
                익숙한 동네에도 몰랐던 업체가 있을 수 있습니다. 지역을 중심으로
                다양한 수리·리폼 서비스를 새롭게 발견해 보세요.
              </p>
              <div className="feature-list">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  지역별 업체 탐색
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  새로운 분야 발견
                </span>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m4 12 5 5L20 6"></path>
                  </svg>{" "}
                  지속 가능한 선택 확장
                </span>
              </div>
            </div>
            <div className="feature-detail-visual">
              <PhoneMockup variant="map" />
            </div>
          </article>
          <p className="small muted" style={{ marginTop: "28px" }}>
            * 앱 화면은 이해를 돕기 위한 디자인 예시로, 실제 앱의 기능 및 화면은
            출시 버전에 따라 달라질 수 있습니다.
          </p>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <DownloadCta />
        </div>
      </section>
    </>
  );
}
