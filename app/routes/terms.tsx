import { Link } from "react-router";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
export const meta = () => createPageMeta(pages.terms);
export default function Page() {
  return (
    <>
      <section className="legal-top">
        <div className="container">
          <span className="eyebrow">LEGAL / RE:FORM</span>
          <h1>이용약관</h1>
          <p>서비스 이용 관련 정책 및 안내</p>
          <div className="notice-bar">
            <strong>검토용 초안입니다.</strong> 실제 운영자 정보, 개인정보 처리
            항목, 시행일 및 앱 기능을 확인하고 관련 법령에 맞게 검토한 뒤
            게시해야 합니다. 확정된 법률 문서가 아닙니다.
          </div>
        </div>
      </section>
      <section>
        <div className="container legal-layout">
          <aside className="legal-nav">
            <strong>정책 문서</strong>
            <Link to="/terms" className="current">
              이용약관
            </Link>
            <Link to="/privacy" className="">
              개인정보처리방침
            </Link>
            <Link to="/faq">자주 묻는 질문</Link>
          </aside>
          <article className="legal-body">
            <h2>제1조 (목적)</h2>
            <p>
              이 약관은 <span className="placeholder">[운영 사업자명]</span>
              (이하 “운영자”)이 제공하는 re:form 애플리케이션 및 관련 웹사이트
              서비스(이하 “서비스”)의 이용 조건과 절차, 이용자와 운영자의
              권리·의무 및 책임 사항에 관한 기본 사항을 정함을 목적으로 합니다.
            </p>
            <h2>제2조 (용어의 정의)</h2>
            <ol>
              <li>
                “서비스”란 수리·리폼 관련 정보를 탐색할 수 있도록 제공하는 앱과
                관련 웹사이트를 말합니다.
              </li>
              <li>
                “이용자”란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.
              </li>
              <li>
                “계정 이용자”란 제공되는 SNS 로그인 등을 통해 개인화 기능을
                이용하는 자를 의미합니다.
              </li>
            </ol>
            <h2>제3조 (서비스의 내용)</h2>
            <p>
              서비스에는 지역 및 분야별 수리·리폼 업체 정보 탐색, 업체 관련 공개
              정보 확인, 관심 업체 저장 등의 기능이 포함될 수 있습니다. 실제
              제공 범위는 서비스 버전에 따라 달라질 수 있으며, 운영자는 이를
              별도 안내할 수 있습니다.
            </p>
            <h2>제4조 (업체 정보 및 외부 서비스)</h2>
            <ol>
              <li>
                서비스의 업체 정보는 공공데이터 등 외부 출처에 기반할 수 있으며,
                운영자는 정보의 변경 가능성을 안내합니다.
              </li>
              <li>
                실제 작업 가능 여부, 견적, 일정, 결과 및 거래 조건 등은 해당
                업체에 별도로 확인해야 합니다.
              </li>
              <li>
                외부 사이트나 제3자 서비스에 연결되는 경우 해당 서비스의 약관과
                정책이 적용될 수 있습니다.
              </li>
            </ol>
            <h2>제5조 (이용자의 의무)</h2>
            <p>
              이용자는 관련 법령과 서비스 이용 안내를 준수하고 타인의 권리를
              침해하거나 서비스 운영을 방해하는 행위를 하여서는 안 됩니다.
            </p>
            <h2>제6조 (서비스 변경 및 중단)</h2>
            <p>
              운영자는 서비스 개선, 유지보수, 법령 준수 등의 사유로 서비스
              내용을 변경하거나 일부 제공을 중단할 수 있습니다. 구체적인 통지
              방법과 책임 범위는 실제 운영 정책에 맞추어 확정해야 합니다.
            </p>
            <h2>제7조 (면책 및 분쟁 해결)</h2>
            <p>
              운영자의 법적 책임 및 이용자 보호와 관련된 사항은 관련 법령에 따라
              해석됩니다. 구체적인 책임 제한, 준거법, 관할 법원 등은 사업자 정보
              및 거래 구조가 확정된 후 법률 검토를 거쳐 확정해야 합니다.
            </p>
            <h2>제8조 (약관의 게시와 변경)</h2>
            <p>
              최종 약관은 서비스 내에서 이용자가 쉽게 확인할 수 있도록 게시해야
              하며, 개정 시 관련 법령에 따른 고지 및 동의 절차를 준수해야
              합니다.
            </p>
            <h2>부칙</h2>
            <p>
              시행일: <span className="placeholder">[YYYY년 MM월 DD일]</span>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
