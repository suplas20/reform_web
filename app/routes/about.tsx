import { Image } from "../components/Image";
import { Link } from "react-router";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
import { DownloadCta } from "../components/DownloadCta";
export const meta = () => createPageMeta(pages.about);
export default function Page() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-hero-copy">
            <span className="eyebrow">ABOUT RE:FORM</span>
            <h1>
              버려지지 않는 가치를,
              <br />
              다시 일상으로.
            </h1>
            <p className="lead">
              re:form은 우리 주변의 수리·리폼 전문가를 쉽게 발견하고, 소중한
              물건을 오래 사용할 수 있도록 돕는 서비스입니다.
              <br />
              일상의 작은 선택이 모여 더 가치 있는 변화를 만들 수 있다고
              믿습니다.
            </p>
          </div>
          <div
            className="page-hero-visual"
            role="img"
            aria-label="햇살이 머무는 거실의 의자와 식물"
          ></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR VALUES</span>
              <h2>re:form이 중요하게 생각하는 네 가지.</h2>
            </div>
          </div>
          <div className="value-grid">
            <article className="value-card">
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
              <strong>연결</strong>
              <p>사용자와 주변 전문 업체가 더 쉽게 만날 수 있도록 돕습니다.</p>
            </article>
            <article className="value-card">
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
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m20 20-4-4"></path>
                </svg>
              </div>
              <strong>발견</strong>
              <p>미처 몰랐던 수리·리폼의 다양한 가능성을 소개합니다.</p>
            </article>
            <article className="value-card">
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
                  <path d="M20 4C12 4 5 6 5 14a6 6 0 0 0 6 6c8 0 10-7 9-16z"></path>
                  <path d="M4 21c3-6 7-10 12-13"></path>
                </svg>
              </div>
              <strong>지속 가능</strong>
              <p>물건을 오래 쓰는 선택을 일상에서 더 자연스럽게 만듭니다.</p>
            </article>
            <article className="value-card">
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
                  <circle cx="9" cy="8" r="3"></circle>
                  <path d="M3 20v-2a6 6 0 0 1 12 0v2"></path>
                  <path d="M16 5a3 3 0 0 1 0 6m2 9v-2a6 6 0 0 0-3-5"></path>
                </svg>
              </div>
              <strong>함께 성장</strong>
              <p>이용자와 업체가 함께 성장하는 플랫폼을 지향합니다.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SMALL CHANGES</span>
              <h2>re:form이 만드는 변화</h2>
            </div>
          </div>
          <div className="image-triptych">
            <article>
              <Image
                src="/images/clothing-20261020.webp"
                alt="청바지와 실, 가위가 놓인 수선 작업대"
                loading="lazy"
              />
              <div className="trip-content">
                <h3>물건에 수명을 더하고</h3>
                <p>쉽게 버리는 대신, 고쳐 쓰는 방법을 먼저 떠올립니다.</p>
              </div>
            </article>
            <article>
              <Image
                src="/images/furniture-20261020.webp"
                alt="햇살 아래 나무 의자"
                loading="lazy"
              />
              <div className="trip-content">
                <h3>우리 동네의 기술을 발견하고</h3>
                <p>가까운 전문 업체와 기술을 더 쉽게 알아봅니다.</p>
              </div>
            </article>
            <article>
              <Image
                src="/images/living-20261020.webp"
                alt="식물이 놓인 따뜻한 실내"
                loading="lazy"
              />
              <div className="trip-content">
                <h3>일상을 조금 더 지속 가능하게</h3>
                <p>익숙한 물건의 다음 이야기를 이어 갑니다.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <div className="quote-banner">
        <div className="container">
          <h2>“작은 수리가 모여, 더 좋은 일상을 만듭니다.”</h2>
          <p>re:form은 지속 가능한 생활을 위한 새로운 연결을 만들어 갑니다.</p>
        </div>
      </div>
      <section className="section-sm">
        <div className="container">
          <DownloadCta />
        </div>
      </section>
    </>
  );
}
