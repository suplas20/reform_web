import { Link } from "react-router";
import { site } from "../../site.config";
import { pages } from "../data/pages";
import { createPageMeta } from "../lib/seo";

export const meta = () => createPageMeta(pages.editorial);
export default function EditorialPage() {
  return (
    <section className="section">
      <div className="container content-copy">
        <span className="eyebrow">EDITORIAL PRINCIPLES</span>
        <h1>콘텐츠 작성과 편집 원칙</h1>
        <p className="lead">
          re:form은 수리·리폼 상담을 준비할 때 확인할 정보를 안내합니다.
        </p>
        <p className="small muted">
          작성 주체: {site.editorialName} · 문서 수정일:{" "}
          <time dateTime={site.contentUpdatedAt}>{site.contentUpdatedAt}</time>
        </p>
        <h2>어떤 정보를 제공하나요?</h2>
        <p>
          수리 가이드와 이야기는 물건의 상태를 정리하고 업체에 문의할 내용을
          준비하기 위한 일반 정보입니다. 현재 콘텐츠는 특정 업체의 시공 실적이나
          전문가가 검증한 작업 결과를 의미하지 않습니다. 웹사이트는 앱 소개와
          정보 안내를 제공하며, 앱은 출시 준비 중입니다.
        </p>
        <h2>자료는 어떻게 확인하나요?</h2>
        <p>
          제품별 소재와 관리 방법은 제조사·판매처의 제품 안내서와 관리 라벨을
          먼저 확인하세요. 실제 작업 범위와 가격은 업체의 확인이 필요합니다.
          글에 외부 자료를 참고한 경우에는 해당 자료의 이름과 링크를 함께
          표시하고, 일반적인 상담 제안과 구분합니다.
        </p>
        <h2>작성자와 수정일은 어떻게 표시하나요?</h2>
        <p>
          현재 가이드의 작성 주체는 {site.editorialName}입니다. 개인 작성자나
          전문 검토자가 확인되지 않은 글에는 이름·자격·검수 사실을 임의로
          표시하지 않습니다. 수정일은 내용이 실제로 변경된 날짜를 기록하며,
          빌드나 배포만으로 갱신하지 않습니다.
        </p>
        <h2>내용의 한계와 정정</h2>
        <p>
          안전과 관련된 손상은 해당 분야 전문가에게 먼저 확인해야 합니다.
          보증·서비스 조건은 제조사와 구매처의 최신 안내를 확인하세요. 특정
          가격, 효과, 수리 성공률이나 업체의 영업 상태를 이 콘텐츠가 보장하지
          않습니다.
        </p>
        <p>
          실제 사례를 추가할 때는 작업 범위·확인 날짜·자료 출처를 구분하고,
          잘못되거나 오래된 내용은 확인 후 수정합니다.
        </p>
        <Link to="/guides" className="btn btn-outline">
          분야별 수리 가이드 보기
        </Link>
      </div>
    </section>
  );
}
