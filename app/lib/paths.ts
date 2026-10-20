import { pages } from "../data/pages.ts";
import { stories } from "../data/stories.ts";
import { guides, guidePath } from "../data/guides.ts";

// Shared inventory for pre-rendering, sitemap, and release checks.
export const staticPages = [
  ...Object.values(pages),
  ...guides.map((guide) => ({
    path: guidePath(guide),
    title: `${guide.title} | re:form`,
    description: guide.description,
  })),
  ...stories.map((story) => ({
    path: `/stories/${story.slug}`,
    title: `${story.title} | re:form`,
    description: story.seoDescription,
  })),
];
export const staticPaths = staticPages.map((page) => page.path);
export const draftPaths = new Set(["/terms", "/privacy"]);
