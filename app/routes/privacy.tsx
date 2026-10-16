import { Link } from "react-router";
import { createPageMeta } from "../lib/seo";
import { pages } from "../data/pages";
export const meta = () => createPageMeta(pages.privacy);
export default function Page() {
  return (
    <>
      <section className="legal-top">
        <div className="container">
          <span className="eyebrow">LEGAL / RE:FORM</span>
          <h1>개인정보처리방침</h1>
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
            <Link to="/terms" className="">
              이용약관
            </Link>
            <Link to="/privacy" className="current">
              개인정보처리방침
            </Link>
            <Link to="/faq">자주 묻는 질문</Link>
          </aside>
          <article className="legal-body">
            <h2>1. 개인정보 처리의 목적</h2>
            <p>
              운영자는 re:form 서비스 제공 및 이용자 식별, 즐겨찾기 등 개인화
              기능 유지, 문의 대응, 서비스 보안 등을 위해 필요한 범위 내에서
              개인정보를 처리할 수 있습니다. 실제 목적은 운영 환경에 맞춰
              확정해야 합니다.
            </p>
            <h2>2. 처리하는 개인정보 항목</h2>
            <p>
              다음 표는 <strong>설계 검토용 예시</strong>입니다. 적용되는 SNS
              로그인 방식, 서버 로그, 분석 도구 등에 따라 달라질 수 있습니다.
            </p>
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>검토 대상 항목</th>
                  <th>목적</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SNS 로그인</td>
                  <td>
                    <span className="placeholder">
                      [제공자별 식별값 등 실제 수집 항목 확인]
                    </span>
                  </td>
                  <td>계정 구분 및 즐겨찾기 제공</td>
                </tr>
                <tr>
                  <td>서비스 이용 기록</td>
                  <td>
                    <span className="placeholder">
                      [접속 기록·기기 관련 데이터 확인]
                    </span>
                  </td>
                  <td>서비스 운영 및 보안</td>
                </tr>
                <tr>
                  <td>문의 처리</td>
                  <td>
                    <span className="placeholder">
                      [문의 접수 채널과 항목 확정]
                    </span>
                  </td>
                  <td>문의 내용 확인 및 답변</td>
                </tr>
              </tbody>
            </table>
            <h2>3. 처리 및 보유 기간</h2>
            <p>
              개인정보는 수집 목적 달성 시 또는 관계 법령에서 요구하는 기간 동안
              보유합니다. 구체적인 보유 기간과 파기 시점은{" "}
              <span className="placeholder">[항목별 보유 기간 기입]</span> 후
              게시해야 합니다.
            </p>
            <h2>4. 제3자 제공 및 처리 위탁</h2>
            <p>
              개인정보의 제3자 제공 또는 처리 위탁이 있는 경우 제공받는 자,
              목적, 항목, 보유 기간 등의 필수 사항을 법령에 따라 공개해야
              합니다.{" "}
              <span className="placeholder">
                [SNS 로그인·클라우드·분석 서비스 등 실제 업체 확인 필요]
              </span>
            </p>
            <h2>5. 개인정보의 파기</h2>
            <p>
              보유 기간의 경과 및 처리 목적 달성 등으로 개인정보가 불필요하게
              되었을 때에는 관계 법령에서 정한 방법에 따라 지체 없이 파기합니다.
            </p>
            <h2>6. 정보주체의 권리와 행사 방법</h2>
            <p>
              이용자는 관련 법령에 따라 자신의 개인정보에 대한 열람, 정정, 삭제,
              처리 정지 등을 요구할 수 있습니다. 실제 신청 경로는{" "}
              <span className="placeholder">[고객센터·문의 채널]</span>에
              안내해야 합니다.
            </p>
            <h2>7. 개인정보의 안전성 확보 조치</h2>
            <p>
              개인정보의 안전한 처리를 위해 접근 권한 관리, 통신 암호화, 접근
              기록 관리 등 서비스 환경에 필요한 기술적·관리적 조치를 적용해야
              합니다. 시행 조치는 실제 시스템 구현 후 정확하게 기술해야 합니다.
            </p>
            <h2>8. 쿠키 및 분석 기술</h2>
            <p>
              현재 제공되는 HTML 시안에는 별도의 광고·분석 스크립트가 포함되어
              있지 않습니다. 운영 중 통계 도구, 쿠키 또는 광고 기술을 도입할
              경우 관련 처리 내용을 고지하고 필요한 동의 체계를 마련해야 합니다.
            </p>
            <h2>9. 개인정보 보호책임자</h2>
            <table>
              <tbody>
                <tr>
                  <th>운영 사업자</th>
                  <td>
                    <span className="placeholder">[사업자명 기입]</span>
                  </td>
                </tr>
                <tr>
                  <th>개인정보 보호책임자</th>
                  <td>
                    <span className="placeholder">[성명 또는 부서 기입]</span>
                  </td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>
                    <span className="placeholder">[이메일 및 연락처 기입]</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>10. 시행일 및 변경 안내</h2>
            <p>
              시행일: <span className="placeholder">[YYYY년 MM월 DD일]</span>.
              변경 시 홈페이지 또는 서비스 내 공지를 통해 관련 법령에 따라
              안내합니다.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
