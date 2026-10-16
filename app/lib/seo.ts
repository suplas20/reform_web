import type { MetaDescriptor } from "react-router";

export const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: boolean;
};

export function createPageMeta({
  title,
  description,
  path,
  image = "/images/hero-lifestyle.webp",
  article = false,
}: PageMeta): MetaDescriptor[] {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: article ? "article" : "website" },
    { property: "og:locale", content: "ko_KR" },
    { property: "og:site_name", content: "re:form" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: siteUrl + image },
    { name: "twitter:card", content: "summary_large_image" },
    ...(siteUrl
      ? [
          { property: "og:url", content: siteUrl + path },
          { tagName: "link", rel: "canonical", href: siteUrl + path },
        ]
      : []),
  ];
}
