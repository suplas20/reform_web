import { Image } from "../components/Image";
import { Link, useParams, type MetaFunction } from "react-router";
import { stories } from "../data/stories";
import { createPageMeta } from "../lib/seo";
import { DownloadCta } from "../components/DownloadCta";
import { CopyLinkButton } from "../components/CopyLinkButton";
import { ErrorContent } from "./not-found";
import { storyDetails } from "../data/story-details";
import { guides, guidePath } from "../data/guides";
import { site } from "../../site.config";
import { StoryCard } from "../components/StoryCard";

export const meta: MetaFunction = ({ params }) => {
  const story = stories.find((item) => item.slug === params.slug);
  return story
    ? createPageMeta({
        title: `${story.title} | re:form`,
        description: story.seoDescription,
        path: `/stories/${story.slug}`,
        image: story.image,
        article: true,
      })
    : [
        { title: "페이지를 찾을 수 없습니다 | re:form" },
        { name: "robots", content: "noindex" },
      ];
};

export default function StoryPage() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  if (!story) return <ErrorContent />;
  const details = storyDetails[story.slug];
  const guide = guides.find((item) => item.id === story.category)!;
  const related = stories
    .filter((item) => item.slug !== story.slug)
    .slice(0, 3);
  return (
    <>
      <section className="container story-detail-header">
        <span className="eyebrow">RE:FORM STORY / {story.label}</span>
        <h1>{story.title}</h1>
        <p className="lead">{story.description}</p>
        <span className="muted small">
          <Link to={site.editorialPath}>{site.editorialName}</Link> · 업데이트{" "}
          <time dateTime={details.updatedAt}>{details.updatedAt}</time>
        </span>
      </section>
      <div className="container">
        <div className="story-detail-cover">
          <Image src={story.image} alt={story.title} fetchPriority="high" />
        </div>
      </div>
      <article className="container">
        <div className="article-body">
          <section className="answer-summary" aria-labelledby="quick-answer">
            <h2 id="quick-answer">{details.question}</h2>
            <p>{details.answer}</p>
          </section>
          <nav className="article-toc" aria-label="글 목차">
            <strong>이 글에서 확인할 내용</strong>
            <ul>
              {story.blocks.map((block, index) =>
                block.kind === "heading" ? (
                  <li key={index}>
                    <a href={`#section-${index}`}>{block.text}</a>
                  </li>
                ) : null,
              )}
              <li>
                <a href="#consultation-checklist">상담 준비 체크리스트</a>
              </li>
            </ul>
          </nav>
          <div className="eyebrow">REPAIR GUIDE</div>
          {story.blocks.map((block, index) =>
            block.kind === "heading" ? (
              <h2 key={index} id={`section-${index}`}>
                {block.text}
              </h2>
            ) : block.kind === "paragraph" ? (
              <p key={index}>{block.text}</p>
            ) : (
              <div key={index} className="article-note">
                {block.lines.map((line, i) => (
                  <span key={i}>
                    {i === 0 ? <strong>{line}</strong> : line}
                    {i < block.lines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ),
          )}
          <h2 id="consultation-checklist">상담 준비 체크리스트</h2>
          <ul className="checklist">
            {details.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <Link to={guidePath(guide)} className="text-link">
              {guide.title} 더 알아보기 →
            </Link>
          </p>
          {details.references && (
            <section className="article-references">
              <h2>참고 자료</h2>
              <ul>
                {details.references.map((reference) => (
                  <li key={reference.url}>
                    <a href={reference.url}>{reference.title}</a>
                    <p className="small">{reference.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <p className="small muted">
            일반적인 상담 준비를 위한 정보입니다. 제품별 관리 안내와 실제 업체의
            확인을 함께 참고하세요.{" "}
            <Link to={site.editorialPath}>콘텐츠 편집 원칙</Link>
          </p>
          <div className="article-actions">
            <Link to="/stories" className="text-link">
              ← 리폼 이야기 목록
            </Link>
            <CopyLinkButton />
          </div>
        </div>
      </article>
      <section className="section-sm section-cream">
        <div className="container">
          <h2>함께 읽으면 좋은 수리·리폼 이야기</h2>
          <div className="stories-grid">
            {related.map((item) => (
              <StoryCard key={item.slug} story={item} />
            ))}
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
