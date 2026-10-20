import { Image } from "./Image";
import { Link } from "react-router";
import type { Story } from "../data/stories";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card">
      <Link className="story-card-photo" to={`/stories/${story.slug}`}>
        <Image
          src={story.image}
          alt={story.title}
          loading="lazy"
          sizes="(max-width: 760px) 100vw, 420px"
        />
      </Link>
      <span className="tag">{story.label}</span>
      <h3>
        <Link to={`/stories/${story.slug}`}>{story.title}</Link>
      </h3>
      <p>{story.description}</p>
      <div className="meta">re:form 에디토리얼 · 정보 가이드</div>
    </article>
  );
}
