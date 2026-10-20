import { Link, useParams, type MetaFunction } from "react-router";
import { guides, guidePath } from "../data/guides";
import { stories } from "../data/stories";
import { createPageMeta } from "../lib/seo";
import { StoryCard } from "../components/StoryCard";
import { GuideLinks } from "../components/GuideLinks";
import { DownloadCta } from "../components/DownloadCta";
import { ErrorContent } from "./not-found";

export const meta: MetaFunction = ({ params }) => {
  const guide = guides.find((item) => item.id === params.category);
  return guide
    ? createPageMeta({
        title: `${guide.title} | re:form`,
        description: guide.description,
        path: guidePath(guide),
      })
    : [
        { title: "가이드를 찾을 수 없습니다 | re:form" },
        { name: "robots", content: "noindex" },
      ];
};
export default function GuidePage() {
  const { category } = useParams();
  const guide = guides.find((item) => item.id === category);
  if (!guide) return <ErrorContent />;
  return (
    <>
      <section className="stories-title">
        <div className="container">
          <span className="eyebrow">REPAIR GUIDE / {guide.label}</span>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.description}</p>
        </div>
      </section>
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container content-copy">
          <div className="answer-summary">
            <h2>{guide.question}</h2>
            <p>{guide.answer}</p>
          </div>
          <h2>상담 전에 준비할 체크리스트</h2>
          <ul className="checklist">
            {guide.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>자주 확인하는 질문</h2>
          {guide.questions.map((item) => (
            <section key={item.question} className="guide-question">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </section>
          ))}
          <p className="muted small">
            일반적인 상담 준비 정보입니다. 실제 작업 가능 여부, 견적과 결과는
            제품 상태와 업체의 확인에 따라 달라집니다.{" "}
            <Link to="/editorial-policy" className="text-link">
              콘텐츠 편집 원칙
            </Link>
          </p>
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container">
          <div className="section-heading">
            <h2>{guide.label} 관련 이야기</h2>
            <Link to="/stories" className="text-link">
              전체 이야기 →
            </Link>
          </div>
          <div className="stories-grid">
            {stories
              .filter((story) => story.category === guide.id)
              .map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <h2>다른 물건의 수리·리폼도 알아보세요.</h2>
          <GuideLinks exclude={guide.id} />
          <DownloadCta />
        </div>
      </section>
    </>
  );
}
