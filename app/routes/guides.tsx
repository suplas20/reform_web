import { Link } from "react-router";
import { guides, guidePath } from "../data/guides";
import { pages } from "../data/pages";
import { createPageMeta } from "../lib/seo";
import { DownloadCta } from "../components/DownloadCta";

export const meta = () => createPageMeta(pages.guides);
export default function GuidesPage() {
  return (
    <>
      <section className="stories-title">
        <div className="container">
          <span className="eyebrow">REPAIR GUIDES</span>
          <h1>수리·리폼, 상담 준비부터 시작하세요.</h1>
          <p className="lead">
            고쳐 쓰고 싶은 물건의 상태와 원하는 변화를 정리해 보세요.
            <br />
            분야별 확인 사항과 견적 상담에 필요한 정보를 모았습니다.
          </p>
        </div>
      </section>
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container guide-grid">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-card">
              <span className="eyebrow">{guide.label}</span>
              <h2>
                <Link to={guidePath(guide)}>{guide.title}</Link>
              </h2>
              <p>{guide.description}</p>
              <Link to={guidePath(guide)} className="text-link">
                상담 준비 살펴보기 →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container content-copy">
          <h2>수리 업체에 문의하기 전 공통으로 확인하세요.</h2>
          <ol>
            <li>전체 상태와 손상 부위를 사진으로 남겨 두세요.</li>
            <li>유지할 기능과 바꾸고 싶은 부분을 구분해 설명하세요.</li>
            <li>견적에 포함되는 작업, 재료, 운반·배송비를 확인하세요.</li>
            <li>작업 기간, 결과의 한계와 추가 비용 조건을 확인하세요.</li>
          </ol>
          <p>
            웹에서는 상담에 필요한 정보를 안내합니다. 업체 탐색과 저장 기능은
            출시 예정인 앱에서 제공할 계획입니다.
          </p>
          <Link to="/features" className="text-link">
            앱의 주요 기능 알아보기 →
          </Link>
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
