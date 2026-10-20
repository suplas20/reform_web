import type { MetaDescriptor } from "react-router";
import { site } from "../../site.config";
import { pages } from "../data/pages";
import { guides, guidePath } from "../data/guides";
import { stories } from "../data/stories";
import { faqs } from "../data/faq";
import { storyDetails } from "../data/story-details";
import imageSizes from "../data/image-sizes.json";
import { draftPaths } from "./paths";

export const siteUrl = site.origin;
export const indexingEnabled = import.meta.env.VITE_INDEXING !== "disabled";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
export function normalizePath(path: string) {
  const url = new URL(path, siteUrl);
  if (url.origin !== siteUrl)
    throw new Error("Canonical paths must belong to the official site");
  return url.pathname.replace(/\/+$/, "") || "/";
}
export type Breadcrumb = { name: string; path: string };

export function getBreadcrumbs(path: string): Breadcrumb[] {
  if (path === "/") return [];
  const home = { name: "홈", path: "/" };
  const guide = guides.find((item) => guidePath(item) === path);
  if (guide)
    return [
      home,
      { name: "수리 가이드", path: "/guides" },
      { name: guide.title, path },
    ];
  const story = stories.find((item) => `/stories/${item.slug}` === path);
  if (story) {
    const category = guides.find((item) => item.id === story.category)!;
    return [
      home,
      { name: "수리 가이드", path: "/guides" },
      { name: category.label, path: guidePath(category) },
      { name: story.title, path },
    ];
  }
  const page = Object.values(pages).find((item) => item.path === path);
  return page
    ? [home, { name: page.title.replace(/ \| re:form$/, ""), path }]
    : [];
}

export function getIdentitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: `${siteUrl}/`,
        description: site.description,
        publishingPrinciples: absoluteUrl(site.editorialPath),
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#editorial`,
        name: site.editorialName,
        url: absoluteUrl(site.editorialPath),
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        url: `${siteUrl}/`,
        inLanguage: site.language,
        description: site.description,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
};

export function createPageMeta({
  title,
  description,
  path,
  image = "/images/hero-20261020.webp",
  article = false,
  noindex = false,
}: PageMeta): MetaDescriptor[] {
  path = normalizePath(path);
  const canonical = absoluteUrl(path);
  const candidate = imageSizes[image as keyof typeof imageSizes];
  const socialImage =
    candidate?.width >= 200 ? image : "/images/hero-20261020.webp";
  const socialSize = imageSizes[socialImage as keyof typeof imageSizes];
  const excluded = noindex || !indexingEnabled || draftPaths.has(path);
  const crumbs = getBreadcrumbs(path);
  const guide = guides.find((item) => guidePath(item) === path);
  const story = stories.find((item) => `/stories/${item.slug}` === path);
  const graph: Record<string, unknown>[] = [
    {
      "@type":
        path === "/faq"
          ? "FAQPage"
          : path === "/about"
            ? "AboutPage"
            : path === "/stories" || path === "/guides" || guide
              ? "CollectionPage"
              : "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: site.language,
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
      ...(crumbs.length
        ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } }
        : {}),
      ...(path === "/faq"
        ? {
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question.replace(/^Q\.\s*/, ""),
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }
        : {}),
    },
  ];
  if (crumbs.length)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  if (article && story)
    graph.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: story.title,
      description,
      url: canonical,
      image: [...new Set([absoluteUrl(image), absoluteUrl(socialImage)])],
      inLanguage: site.language,
      mainEntityOfPage: { "@id": `${canonical}#webpage` },
      articleSection: story.label,
      author: { "@id": `${siteUrl}/#editorial` },
      publisher: { "@id": `${siteUrl}/#organization` },
      dateModified: storyDetails[story.slug].updatedAt,
      ...(storyDetails[story.slug].references
        ? {
            citation: storyDetails[story.slug].references!.map(
              (reference) => reference.url,
            ),
          }
        : {}),
    });
  // ItemList is reserved for static collections; the stories list can be filtered.
  if (path === "/guides" || guide) {
    const items =
      path === "/guides"
        ? guides.map((item) => ({
            name: item.title,
            url: absoluteUrl(guidePath(item)),
          }))
        : stories
            .filter((item) => !guide || item.category === guide.id)
            .map((item) => ({
              name: item.title,
              url: absoluteUrl(`/stories/${item.slug}`),
            }));
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#list`,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...item,
      })),
    });
  }
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    {
      name: "robots",
      content: excluded
        ? "noindex,follow"
        : "index,follow,max-image-preview:large",
    },
    { property: "og:type", content: article ? "article" : "website" },
    { property: "og:locale", content: site.locale },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: absoluteUrl(socialImage) },
    ...(socialSize
      ? [
          { property: "og:image:width", content: String(socialSize.width) },
          { property: "og:image:height", content: String(socialSize.height) },
        ]
      : []),
    {
      property: "og:image:alt",
      content:
        socialImage === image && story
          ? story.title
          : "re:form, 수리와 리폼으로 오래 쓰는 일상",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteUrl(socialImage) },
    ...(article && story
      ? [
          {
            property: "article:modified_time",
            content: storyDetails[story.slug].updatedAt,
          },
        ]
      : []),
    ...(path === "/"
      ? [
          {
            tagName: "link",
            rel: "preload",
            as: "image",
            href: image,
            fetchpriority: "high",
          },
        ]
      : []),
    { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
  ];
}
