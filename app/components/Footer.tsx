import { Link } from "react-router";
import { DownloadButton } from "./DownloadButton";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo" to="/" aria-label="re:form 홈">
              re<span className="colon">:</span>form
            </Link>
            <p>
              고쳐 쓰는 선택이 더 좋은 일상을 만듭니다.
              <br />
              수리·리폼을 더 가깝게, re:form.
            </p>
            <span className="footer-note">
              본 사이트는 re:form 앱의 소개와 안내를 위한 웹사이트입니다.
            </span>
          </div>
          <div className="footer-col">
            <strong>둘러보기</strong>
            <Link to="/about">서비스 소개</Link>
            <Link to="/features">주요 기능</Link>
            <Link to="/guides">분야별 수리 가이드</Link>
            <Link to="/download">앱 출시 안내</Link>
            <DownloadButton className="footer-download">
              앱 다운로드
            </DownloadButton>
          </div>
          <div className="footer-col">
            <strong>도움말 및 정책</strong>
            <Link to="/faq">자주 묻는 질문</Link>
            <Link to="/editorial-policy">콘텐츠 편집 원칙</Link>
            <Link to="/terms">이용약관</Link>
            <Link to="/privacy">개인정보처리방침</Link>
            <span className="footer-note">
              제공되는 이미지 및 앱 화면은 디자인 예시입니다.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 re:form. All rights reserved.</span>
          <span>
            작은 수리가 만드는 더 좋은 일상 ·{" "}
            <Link to="/privacy">개인정보처리방침</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
