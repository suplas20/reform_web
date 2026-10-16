import { Link } from "react-router";
export function DownloadCta() {
  return (
    <div className="download-cta">
      <div className="download-cta-copy">
        <div className="eyebrow">DOWNLOAD APP</div>
        <h2>
          지금 바로,
          <br />
          re:form을 만나보세요.
        </h2>
        <p className="muted">
          작은 수리가 모여 더 좋은 일상을 만듭니다.
          <br />
          앱에서 나에게 필요한 수리·리폼 정보를 찾아보세요.
        </p>
        <Link to="/download" className="btn">
          앱 다운로드 안내{" "}
          <svg
            width="17"
            height="17"
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
      <div
        className="download-cta-image"
        role="img"
        aria-label="따뜻한 가구와 re:form 앱 화면"
      ></div>
    </div>
  );
}
