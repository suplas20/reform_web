import { describe, expect, it } from "vitest";
import { resolveIndexing, resolveSiteOrigin, site } from "../site.config";
import { createPageMeta, normalizePath } from "../app/lib/seo";
import { pages } from "../app/data/pages";

describe("canonical origin and preview policy", () => {
  it("always resolves the verified production origin even with no environment variable", () => {
    expect(resolveSiteOrigin()).toBe("https://www.dashiform.com");
    expect(resolveSiteOrigin("")).toBe(site.origin);
    expect(resolveSiteOrigin(`${site.origin}/`)).toBe(site.origin);
  });
  it.each([
    "https://dashiform.com",
    "http://www.dashiform.com",
    "https://www.dashiform.com/path",
    "https://www.dashiform.com?test=1",
    "https://user:password@www.dashiform.com",
    "https://preview.pages.dev",
  ])("rejects an accidental canonical origin: %s", (value) => {
    expect(() => resolveSiteOrigin(value)).toThrow();
  });
  it("prevents preview indexing even when a production variable is inherited", () => {
    expect(
      resolveIndexing({
        CF_PAGES: "1",
        CF_PAGES_BRANCH: "preview",
        VITE_INDEXING: "enabled",
      }),
    ).toBe(false);
    expect(resolveIndexing({ CF_PAGES: "1", CF_PAGES_BRANCH: "main" })).toBe(
      true,
    );
    expect(resolveIndexing({ VITE_INDEXING: "disabled" })).toBe(false);
    expect(() => resolveIndexing({ VITE_INDEXING: "typo" })).toThrow();
  });
  it("consolidates filters, tracking parameters, fragments, and trailing slashes", () => {
    expect(normalizePath("/stories/?category=bag&utm_source=example#top")).toBe(
      "/stories",
    );
    const meta = createPageMeta({
      ...pages.stories,
      path: "/stories/?category=bag&utm_source=example",
    });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: site.origin + "/stories",
    });
    expect(() => normalizePath("https://other.example/")).toThrow();
  });
  it("keeps draft policies out of search while allowing links to be followed", () => {
    for (const page of [pages.terms, pages.privacy]) {
      expect(createPageMeta(page)).toContainEqual({
        name: "robots",
        content: "noindex,follow",
      });
    }
  });
});
