import { Link } from "react-router";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
import { StoreButtons } from "../components/StoreButtons";
import { DownloadCta } from "../components/DownloadCta";
import { PhoneMockup } from "../components/PhoneMockup";
export const meta = () => createPageMeta(pages.home);
export default function Page() {
  return (
    <>
      <section className="hero-home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">Repair, Reuse, Re:form.</div>
            <h1>
              버리지 말고,
              <br />
              다시 좋은 모습으로.
            </h1>
            <p className="lead">
              우리 주변의 수리·리폼 전문 업체를 쉽게 찾고,
              <br />
              물건의 쓰임을 다시 발견하는 새로운 방법.
            </p>
            <StoreButtons />
            <span className="hero-footnote">
              앱 출시 준비 중 · 다운로드 링크는 출시 후 연결됩니다.
            </span>
          </div>
          <div
            className="hero-media"
            role="img"
            aria-label="따뜻한 거실 가구와 re:form 앱 화면 목업"
          >
            <div className="home-float">오래 쓰는 일상, re:form에서</div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container why-grid">
          <div>
            <span className="eyebrow">ABOUT RE:FORM</span>
            <h2>
              버리지 않고,
              <br />
              다시 좋은 모습으로.
            </h2>
            <p className="lead">
              re:form은 수리와 리폼이 필요한 순간, 주변의 전문 업체를 발견하고
              비교할 수 있도록 돕는 서비스입니다. 물건에 새로운 쓰임을 더하는
              선택을 응원합니다.
            </p>
            <Link to="/about" className="text-link">
              re:form 더 알아보기{" "}
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
            </Link>
          </div>
          <div className="icon-grid">
            <article className="icon-card">
              <div className="icon-bubble">
                <svg
                  width="27"
                  height="27"
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
              <strong>주변 업체 검색</strong>
              <p>내 주변의 수리·리폼 업체를 지도로 찾아보세요.</p>
            </article>
            <article className="icon-card">
              <div className="icon-bubble">
                <svg
                  width="27"
                  height="27"
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
              <strong>다양한 카테고리</strong>
              <p>가구부터 의류까지 필요한 분야를 쉽게 찾아보세요.</p>
            </article>
            <article className="icon-card">
              <div className="icon-bubble">
                <svg
                  width="27"
                  height="27"
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
              <strong>정보와 리뷰 비교</strong>
              <p>확인 가능한 업체 정보와 후기를 참고해 보세요.</p>
            </article>
            <article className="icon-card">
              <div className="icon-bubble">
                <svg
                  width="27"
                  height="27"
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
              <strong>즐겨찾기</strong>
              <p>관심 있는 업체를 저장해 두고 나중에 다시 확인하세요.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CATEGORY</span>
              <h2>카테고리로 찾아보세요.</h2>
              <p className="muted">
                일상의 다양한 물건을 고쳐 쓰는 방법을 소개합니다.
              </p>
            </div>
            <Link className="text-link" to="/stories">
              리폼 이야기 전체 보기{" "}
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
            </Link>
          </div>
          <div className="category-grid">
            <Link className="category-card" to="/stories?category=furniture">
              <img
                src="/images/category-furniture.webp"
                alt="가구"
                loading="lazy"
              />
              <strong>가구</strong>
              <span>의자·소파·테이블</span>
            </Link>
            <Link className="category-card" to="/stories?category=bag">
              <img
                src="/images/category-bag.webp"
                alt="가방/가죽"
                loading="lazy"
              />
              <strong>가방/가죽</strong>
              <span>가방·지갑·가죽</span>
            </Link>
            <Link className="category-card" to="/stories?category=shoes">
              <img
                src="/images/category-sneakers.webp"
                alt="신발"
                loading="lazy"
              />
              <strong>신발</strong>
              <span>운동화·구두</span>
            </Link>
            <Link className="category-card" to="/stories?category=clothing">
              <img
                src="/images/category-clothing.webp"
                alt="의류"
                loading="lazy"
              />
              <strong>의류</strong>
              <span>수선·리폼</span>
            </Link>
            <Link className="category-card" to="/stories?category=appliance">
              <img
                src="/images/category-appliance.webp"
                alt="가전제품"
                loading="lazy"
              />
              <strong>가전제품</strong>
              <span>소형 가전·수리</span>
            </Link>
            <Link className="category-card" to="/stories?category=living">
              <img src="/images/category-wood.webp" alt="기타" loading="lazy" />
              <strong>기타</strong>
              <span>생활용품</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container feature-spotlight">
          <div className="spotlight-copy">
            <span className="eyebrow">APP FEATURES</span>
            <h2>
              이런 순간에
              <br />
              re:form을 사용해 보세요.
            </h2>
            <p className="lead">
              가까운 업체를 빠르게 찾고, 다양한 정보를 비교한 후, 마음에 드는
              업체를 간편하게 저장할 수 있습니다.
            </p>
            <Link to="/features" className="btn">
              주요 기능 살펴보기{" "}
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
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <div
              className="spotlight-visual spotlight"
              aria-label="re:form 앱 화면 예시"
            >
              <div className="phone-wrap primary">
                <PhoneMockup variant="map" />
              </div>
              <div className="phone-wrap secondary">
                <PhoneMockup variant="detail" />
              </div>
              <span className="illustration-note">
                * 실제 앱 화면은 달라질 수 있습니다.
              </span>
            </div>
            <div className="chip c1">
              <span className="mini-icon">
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
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"></path>
                  <circle cx="12" cy="10" r="2.5"></circle>
                </svg>
              </span>
              <span>
                <strong>내 주변 업체 검색</strong>
                <small>지도에서 편리하게</small>
              </span>
            </div>
            <div className="chip c2">
              <span className="mini-icon">
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
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                </svg>
              </span>
              <span>
                <strong>다양한 카테고리</strong>
                <small>필요한 분야별로</small>
              </span>
            </div>
            <div className="chip c3">
              <span className="mini-icon">
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
                  <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3z"></path>
                </svg>
              </span>
              <span>
                <strong>정보 비교</strong>
                <small>확인 가능한 정보 확인</small>
              </span>
            </div>
            <div className="chip c4">
              <span className="mini-icon">
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
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l8.9-8.9a5.5 5.5 0 0 0-.1-7.5z"></path>
                </svg>
              </span>
              <span>
                <strong>관심 업체 저장</strong>
                <small>나중에 다시 찾아보기</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container">
          <div className="story-banner">
            <div
              className="story-banner-photo"
              role="img"
              aria-label="햇살이 드는 공간의 나무 의자"
            ></div>
            <div className="story-banner-copy">
              <span className="eyebrow">RE:FORM STORY</span>
              <h2>
                작은 수리가 만드는
                <br />
                지속 가능한 일상
              </h2>
              <p className="lead">
                고쳐 쓰는 선택이 환경을 지키고, 더 좋은 일상을 만듭니다. 오래된
                물건의 새로운 이야기를 만나보세요.
              </p>
              <Link to="/stories" className="text-link">
                리폼 이야기 둘러보기{" "}
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
              </Link>
            </div>
          </div>
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
