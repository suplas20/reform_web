import { Link } from "react-router";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
import { StoreButtons } from "../components/StoreButtons";
import { PhoneMockup } from "../components/PhoneMockup";
export const meta = () => createPageMeta(pages.download);
export default function Page() {
  return (
    <>
      <section className="download-page-hero">
        <div className="container download-grid">
          <div className="download-left">
            <span className="eyebrow">DOWNLOAD RE:FORM</span>
            <h1>
              지금 바로,
              <br />
              re:form을 만나보세요.
            </h1>
            <p className="lead">
              작은 수리가 모여 더 좋은 일상을 만듭니다.
              <br />
              지금 곁에 있는 물건도, 우리 동네의 수리·리폼 전문가도 re:form과
              함께 찾아보세요.
            </p>
            <StoreButtons />
            <div className="qr-panel">
              <div className="qr-fake" aria-label="QR코드 출시 후 제공">
                QR코드
                <br />
                출시 후 제공
              </div>
              <div>
                <strong style={{ fontSize: "14px" }}>
                  모바일에서 시작하세요.
                </strong>
                <p>
                  스토어 QR 코드 및 다운로드 링크는
                  <br />
                  정식 출시 후 안내합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="download-visual" aria-label="re:form 앱 화면 목업">
            <div className="phone-wrap primary">
              <PhoneMockup variant="map" />
            </div>
            <div className="phone-wrap secondary">
              <PhoneMockup variant="detail" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">GET STARTED</span>
              <h2>re:form을 이용하는 방법</h2>
            </div>
          </div>
          <div className="download-help">
            <article>
              <div className="icon-bubble" style={{ margin: "0 0 17px" }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"></path>
                </svg>
              </div>
              <h3>01. 앱 설치</h3>
              <p>
                앱 출시 후 사용 중인 스마트폰에 맞는 스토어에서 앱을 설치하세요.
              </p>
            </article>
            <article>
              <div className="icon-bubble" style={{ margin: "0 0 17px" }}>
                <svg
                  width="26"
                  height="26"
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
              <h3>02. 업체 찾아보기</h3>
              <p>필요한 수리·리폼 분야를 선택하고 주변의 업체를 살펴보세요.</p>
            </article>
            <article>
              <div className="icon-bubble" style={{ margin: "0 0 17px" }}>
                <svg
                  width="26"
                  height="26"
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
              <h3>03. 관심 업체 저장</h3>
              <p>
                다시 찾아보고 싶은 업체가 있다면 로그인 후 즐겨찾기를
                이용하세요.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NEED HELP?</span>
              <h2>앱 이용이 궁금하신가요?</h2>
              <p className="muted">자주 묻는 질문에서 먼저 확인해 보세요.</p>
            </div>
            <Link to="/faq" className="btn btn-outline">
              FAQ 바로가기{" "}
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
      </section>
    </>
  );
}
