import { Image } from "../components/Image";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { stories, storyCategories } from "../data/stories";
import { pages } from "../data/pages";
import { createPageMeta } from "../lib/seo";
import { ArrowIcon } from "../components/Icons";
import { DownloadButton } from "../components/DownloadButton";
import { GuideLinks } from "../components/GuideLinks";

export const meta = () => createPageMeta(pages.stories);

export default function StoriesPage() {
  const [params, setParams] = useSearchParams();
  // The static document contains all stories. Match it on the first hydration
  // render, then apply bookmarked filters without discarding the SSG markup.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const requested = params.get("category");
  const category =
    hydrated && storyCategories.some((item) => item.id === requested)
      ? requested
      : "all";
  const visibleStories = stories.filter(
    (story) => category === "all" || story.category === category,
  );
  function selectCategory(value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === "all") next.delete("category");
        else next.set("category", value);
        return next;
      },
      { preventScrollReset: true },
    );
  }
  return (
    <>
      <section className="stories-title">
        <div className="container">
          <span className="eyebrow">RE:FORM CONTENTS</span>
          <h1>리폼 이야기</h1>
          <p className="lead">
            수리와 리폼에 대한 다양한 이야기와 팁, 새로운 아이디어를 만나보세요.
            <br />
            조금만 관심을 가져도 일상의 물건은 더 오래, 더 멋지게 사용할 수
            있습니다.
          </p>
        </div>
      </section>
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="category-filters"
            role="group"
            aria-label="이야기 카테고리"
          >
            {storyCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-btn${category === item.id ? " active" : ""}`}
                aria-pressed={category === item.id}
                onClick={() => selectCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="stories-grid">
            {visibleStories.map((story) => (
              <article key={story.slug} className="story-card">
                <Link
                  className="story-card-photo"
                  to={`/stories/${story.slug}`}
                >
                  <Image src={story.image} alt={story.title} loading="lazy" />
                </Link>
                <span className="tag">{story.label}</span>
                <h3>
                  <Link to={`/stories/${story.slug}`}>{story.title}</Link>
                </h3>
                <p>{story.description}</p>
                <div className="meta">re:form 에디토리얼 · 정보 가이드</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <h2>물건별 상담 준비 가이드</h2>
          <GuideLinks />
        </div>
      </section>
      <section className="section-sm section-cream">
        <div className="container">
          <div className="story-banner">
            <div className="story-banner-photo" />
            <div className="story-banner-copy">
              <span className="eyebrow">REPAIR, REUSE, RE:FORM.</span>
              <h2>
                작은 수리가 만드는
                <br />더 좋은 일상
              </h2>
              <p className="lead">물건이 가진 가능성을 다시 발견해 보세요.</p>
              <DownloadButton className="btn">
                앱 만나보기 <ArrowIcon />
              </DownloadButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
