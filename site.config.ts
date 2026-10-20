// Verified public identity; deployment hostnames must never become canonical URLs.
export const site = {
  origin: "https://www.dashiform.com",
  name: "re:form",
  language: "ko-KR",
  locale: "ko_KR",
  description:
    "가구 리폼, 가방·신발·의류 수선과 생활용품·가전 수리 정보를 소개하는 re:form 공식 웹사이트",
  editorialName: "re:form 에디토리얼",
  editorialPath: "/editorial-policy",
  contentUpdatedAt: "2026-10-16",
  productionBranch: "main",
} as const;

export function resolveSiteOrigin(value?: string) {
  if (value === undefined || value.trim() === "") return site.origin;
  const url = new URL(value);
  if (
    url.origin !== site.origin ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      `VITE_SITE_URL must match the official origin: ${site.origin}. Change site.config.ts for an intentional domain migration.`,
    );
  }
  return site.origin;
}

export function resolveIndexing(env: Record<string, string | undefined>) {
  if (env.VITE_INDEXING && !["enabled", "disabled"].includes(env.VITE_INDEXING))
    throw new Error("VITE_INDEXING must be enabled or disabled");
  const preview =
    env.CF_PAGES === "1" && env.CF_PAGES_BRANCH !== site.productionBranch;
  return !preview && env.VITE_INDEXING !== "disabled";
}
