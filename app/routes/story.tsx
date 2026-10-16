import { Link, useParams, type MetaFunction } from "react-router";
import { stories } from "../data/stories";
import { createPageMeta } from "../lib/seo";
import { DownloadCta } from "../components/DownloadCta";
import { CopyLinkButton } from "../components/CopyLinkButton";
import { ErrorContent } from "./not-found";

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
  return (
    <>
      <section className="container story-detail-header">
        <span className="eyebrow">RE:FORM STORY / {story.label}</span>
        <h1>{story.title}</h1>
        <p className="lead">{story.description}</p>
        <span className="muted small">
          re:form 에디토리얼 · 정보 제공용 가이드
        </span>
      </section>
      <div className="container">
        <div className="story-detail-cover">
          <img src={story.image} alt={story.title} fetchPriority="high" />
        </div>
      </div>
      <article className="container">
        <div className="article-body">
          <div className="eyebrow">REPAIR GUIDE</div>
          {story.blocks.map((block, index) =>
            block.kind === "heading" ? (
              <h2 key={index}>{block.text}</h2>
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
          <div className="article-actions">
            <Link to="/stories" className="text-link">
              ← 리폼 이야기 목록
            </Link>
            <CopyLinkButton />
          </div>
        </div>
      </article>
      <section className="section-sm">
        <div className="container">
          <DownloadCta />
        </div>
      </section>
    </>
  );
}
