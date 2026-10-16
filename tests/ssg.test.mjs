import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { test } from "node:test";
import { loadEnv } from "vite";
import { JSDOM } from "jsdom";
import { pages } from "../app/data/pages.ts";
import { stories } from "../app/data/stories.ts";

const output = new URL("../build/client/", import.meta.url);
const siteUrl = loadEnv(
  "production",
  process.cwd(),
  "VITE_",
).VITE_SITE_URL?.replace(/\/$/, "");
const expectedPages = [
  ...Object.values(pages),
  ...stories.map((story) => ({
    path: `/stories/${story.slug}`,
    title: `${story.title} | re:form`,
    description: story.seoDescription,
  })),
];

for (const page of expectedPages) {
  test(`SSG ${page.path}: content and metadata are present without executing JS`, async () => {
    const html = await readFile(
      new URL(
        page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`,
        output,
      ),
      "utf8",
    );
    const { document } = new JSDOM(html).window;
    assert.equal(document.documentElement.lang, "ko");
    assert.equal(document.title, page.title);
    assert.equal(
      document.querySelector('meta[name="description"]').content,
      page.description,
    );
    assert.equal(document.querySelectorAll("main h1").length, 1);
    assert.ok(document.querySelector("main").textContent.length > 100);
    assert.equal(document.querySelectorAll("header").length, 1);
    assert.equal(document.querySelectorAll("footer").length, 1);
    assert.equal(document.querySelectorAll('a[href*=".html"]').length, 0);
    for (const element of document.querySelectorAll(
      "img[src], script[src], link[href]",
    )) {
      const path = element.getAttribute("src") || element.getAttribute("href");
      if (path?.startsWith("/")) await access(new URL(path.slice(1), output));
    }
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const path = link.getAttribute("href").split(/[?#]/)[0];
      assert.ok(
        expectedPages.some((p) => p.path === path),
        `Unknown internal link ${path}`,
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (siteUrl) {
      assert.equal(canonical.href, siteUrl + page.path);
      assert.ok(
        document
          .querySelector('meta[property="og:image"]')
          .content.startsWith(siteUrl),
      );
    } else assert.equal(canonical, null);
  });
}

test("Cloudflare output preserves legacy URLs and has a real static 404", async () => {
  const redirects = await readFile(new URL("_redirects", output), "utf8");
  for (const story of stories)
    assert.ok(
      redirects.includes(
        `/story-${story.slug}.html /stories/${story.slug} 301`,
      ),
    );
  for (const page of Object.values(pages))
    if (page.path !== "/")
      assert.ok(redirects.includes(`${page.path}.html ${page.path} 301`));
  assert.ok(redirects.includes("/index.html / 301"));
  assert.ok(
    !redirects.includes("/* "),
    "SSG pages must not be rewritten to an SPA shell",
  );
  const { document } = new JSDOM(
    await readFile(new URL("404.html", output), "utf8"),
  ).window;
  assert.equal(
    document.querySelector('meta[name="robots"]').content,
    "noindex",
  );
  assert.ok(
    document
      .querySelector("h1")
      .textContent.includes("페이지를 찾을 수 없습니다"),
  );
  assert.equal(document.querySelectorAll("script").length, 0);
});

test("sitemap and robots use the configured official domain", async () => {
  const robots = await readFile(new URL("robots.txt", output), "utf8");
  if (siteUrl) {
    const xml = await readFile(new URL("sitemap.xml", output), "utf8");
    const { document } = new JSDOM(xml, { contentType: "text/xml" }).window;
    assert.deepEqual(
      [...document.querySelectorAll("loc")].map((loc) => loc.textContent),
      expectedPages.map((page) => siteUrl + page.path),
    );
    assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
  } else {
    await assert.rejects(access(new URL("sitemap.xml", output)));
    assert.ok(!robots.includes("Sitemap:"));
  }
});
