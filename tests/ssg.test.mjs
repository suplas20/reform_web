import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { test } from "node:test";
import { loadEnv } from "vite";
import { JSDOM } from "jsdom";
import { staticPages, staticPaths, draftPaths } from "../app/lib/paths.ts";
import { stories } from "../app/data/stories.ts";
import { guides, guidePath } from "../app/data/guides.ts";
import { storyDetails } from "../app/data/story-details.ts";
import { faqs } from "../app/data/faq.ts";
import { resolveIndexing, resolveSiteOrigin, site } from "../site.config.ts";

const output = new URL("../build/client/", import.meta.url);
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const origin = resolveSiteOrigin(env.VITE_SITE_URL);
const indexable = resolveIndexing(env);
const documents = new Map();
const graphFor = (document) =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent);
      return data["@graph"] || [data];
    },
  );
const normalize = (text) => text.replace(/\s+/g, "");

test("image variants contain real WebP data at their declared resolution", async () => {
  const manifest = JSON.parse(
    await readFile(
      new URL("../app/data/image-sizes.json", import.meta.url),
      "utf8",
    ),
  );
  for (const [path, dimensions] of Object.entries(manifest)) {
    assert.ok(dimensions.width >= 1536, `Low-resolution source: ${path}`);
    for (const candidate of dimensions.srcSet.split(",")) {
      const [src, descriptor] = candidate.trim().split(/\s+/);
      const data = await readFile(new URL(src.slice(1), output));
      assert.equal(data.toString("ascii", 0, 4), "RIFF", src);
      assert.equal(data.toString("ascii", 8, 12), "WEBP", src);
      assert.equal(
        data.readUInt32LE(4) + 8,
        data.length,
        `Truncated image: ${src}`,
      );
      // These photo assets use the lossy VP8 format. Read the actual frame dimensions.
      let offset = 12;
      while (
        offset < data.length &&
        data.toString("ascii", offset, offset + 4) !== "VP8 "
      ) {
        const size = data.readUInt32LE(offset + 4);
        offset += 8 + size + (size % 2);
      }
      assert.ok(offset + 18 <= data.length, `Missing WebP frame: ${src}`);
      const width = data.readUInt16LE(offset + 14) & 0x3fff;
      const height = data.readUInt16LE(offset + 16) & 0x3fff;
      assert.equal(width, parseInt(descriptor), src);
      assert.equal(height / width, dimensions.height / dimensions.width, src);
      if (src === path) {
        assert.equal(width, dimensions.width, src);
        assert.equal(height, dimensions.height, src);
      }
    }
  }
  await access(new URL("images/image-fallback.svg", output));
});

for (const page of staticPages) {
  test(`SSG ${page.path}: crawlable content, canonical, metadata, schema and assets`, async () => {
    const html = await readFile(
      new URL(
        page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`,
        output,
      ),
      "utf8",
    );
    const { document } = new JSDOM(html).window;
    documents.set(page.path, document);
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
    assert.equal(
      document.querySelectorAll(
        'header a[href="/stories"], #mobile-menu a[href="/stories"], footer a[href="/stories"]',
      ).length,
      0,
      "리폼 이야기 must not appear in desktop, mobile or footer menus",
    );
    assert.equal(document.querySelectorAll('a[href*=".html"]').length, 0);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(
      document.querySelector('link[rel="canonical"]').href,
      origin + page.path,
    );
    assert.equal(
      document.querySelector('meta[property="og:url"]').content,
      origin + page.path,
    );
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ]) {
      const image = new URL(document.querySelector(selector).content);
      assert.equal(image.origin, origin);
      await access(new URL(image.pathname.slice(1), output));
    }
    const robots = document.querySelector('meta[name="robots"]').content;
    assert.equal(
      robots,
      !indexable || draftPaths.has(page.path)
        ? "noindex,follow"
        : "index,follow,max-image-preview:large",
    );
    for (const element of document.querySelectorAll(
      "img[src], script[src], link[href]",
    )) {
      const path = element.getAttribute("src") || element.getAttribute("href");
      if (path?.startsWith("/")) await access(new URL(path.slice(1), output));
    }
    for (const image of document.querySelectorAll("img")) {
      assert.ok(image.hasAttribute("alt"));
      assert.ok(
        Number(image.getAttribute("width")) > 0 &&
          Number(image.getAttribute("height")) > 0,
        `Missing image dimensions on ${page.path}`,
      );
      for (const candidate of (image.getAttribute("srcset") || "")
        .split(",")
        .filter(Boolean)) {
        await access(
          new URL(candidate.trim().split(/\s+/)[0].slice(1), output),
        );
      }
    }
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const path = link.getAttribute("href").split(/[?#]/)[0];
      assert.ok(staticPaths.includes(path), `Unknown internal link ${path}`);
    }
    for (const anchor of document.querySelectorAll('main a[href^="#"]')) {
      assert.ok(
        document.getElementById(anchor.getAttribute("href").slice(1)),
        "Broken article anchor",
      );
    }
    const graph = graphFor(document);
    assert.equal(
      new Set(graph.map((node) => node["@id"])).size,
      graph.length,
      "Schema IDs must be unique",
    );
    const webpage = graph.find(
      (node) => node["@id"] === origin + page.path + "#webpage",
    );
    assert.equal(webpage.url, origin + page.path);
    assert.ok(
      graph.some(
        (node) => node["@type"] === "WebSite" && node.url === origin + "/",
      ),
    );
    assert.ok(
      graph.some(
        (node) => node["@type"] === "Organization" && node.name === site.name,
      ),
    );
    const knownIds = new Set(graph.map((node) => node["@id"]));
    const validateRefs = (value) => {
      if (Array.isArray(value)) return value.forEach(validateRefs);
      if (!value || typeof value !== "object") return;
      if (value["@id"] && Object.keys(value).length === 1)
        assert.ok(
          knownIds.has(value["@id"]),
          `Unresolved schema reference: ${value["@id"]}`,
        );
      Object.values(value).forEach(validateRefs);
    };
    graph.forEach(validateRefs);
    const itemList = graph.find((node) => node["@type"] === "ItemList");
    if (itemList) {
      for (const item of itemList.itemListElement) {
        const path = new URL(item.url).pathname;
        assert.ok(
          document.querySelector(`main a[href="${path}"]`),
          "ItemList entries must be visible links",
        );
      }
    }
    if (page.path !== "/") {
      const schema = graph.find((node) => node["@type"] === "BreadcrumbList");
      const visible = document.querySelector('nav[aria-label="현재 위치"]');
      assert.equal(
        schema.itemListElement.length,
        visible.querySelectorAll("li").length,
      );
      assert.equal(schema.itemListElement.at(-1).item, origin + page.path);
    }
    const story = stories.find(
      (story) => page.path === `/stories/${story.slug}`,
    );
    if (story) {
      const article = graph.find((node) => node["@type"] === "Article");
      assert.equal(article.headline, story.title);
      assert.equal(article.dateModified, storyDetails[story.slug].updatedAt);
      assert.ok(!article.datePublished, "Do not invent a publication date");
      assert.equal(
        document.querySelector("time").dateTime,
        article.dateModified,
      );
      assert.ok(document.querySelector("#quick-answer"));
      assert.equal(
        document.querySelectorAll(".checklist li").length,
        storyDetails[story.slug].checklist.length,
      );
      assert.ok(
        document.querySelector(
          `a[href="${guidePath(guides.find((guide) => guide.id === story.category))}"]`,
        ),
      );
    }
    if (page.path === "/faq") {
      const faq = graph.find((node) => node["@type"] === "FAQPage");
      assert.equal(faq.mainEntity.length, faqs.length);
      for (const item of faq.mainEntity) {
        assert.ok(
          normalize(document.querySelector("main").textContent).includes(
            normalize(item.name),
          ),
        );
        assert.ok(
          normalize(document.querySelector("main").textContent).includes(
            normalize(item.acceptedAnswer.text),
          ),
        );
      }
    }
  });
}

test("all pages can be discovered from home through real HTML links", () => {
  const reached = new Set(["/"]);
  const pending = ["/"];
  while (pending.length) {
    const path = pending.shift();
    for (const link of documents.get(path).querySelectorAll('a[href^="/"]')) {
      const target = link.getAttribute("href").split(/[?#]/)[0];
      if (!reached.has(target)) {
        reached.add(target);
        pending.push(target);
      }
    }
  }
  assert.deepEqual([...reached].sort(), [...staticPaths].sort());
  assert.equal(
    new Set(staticPages.map((page) => page.title)).size,
    staticPages.length,
  );
  assert.equal(
    new Set(staticPages.map((page) => page.description)).size,
    staticPages.length,
  );
});

test("Cloudflare output retains redirects and a real 404 without an SPA fallback", async () => {
  const redirects = await readFile(new URL("_redirects", output), "utf8");
  for (const path of staticPaths)
    if (path !== "/") assert.ok(redirects.includes(`${path}.html ${path} 301`));
  for (const story of stories)
    assert.ok(
      redirects.includes(
        `/story-${story.slug}.html /stories/${story.slug} 301`,
      ),
    );
  assert.ok(redirects.includes("/index.html / 301"));
  assert.ok(!redirects.includes("/* "));
  await assert.rejects(access(new URL("__spa-fallback.html", output)));
  const { document } = new JSDOM(
    await readFile(new URL("404.html", output), "utf8"),
  ).window;
  assert.equal(
    document.querySelector('meta[name="robots"]').content,
    "noindex",
  );
  assert.equal(document.querySelectorAll("script").length, 0);
});

test("sitemap and crawl policy distinguish production from preview", async () => {
  const robots = await readFile(new URL("robots.txt", output), "utf8");
  assert.equal(robots.includes(`Sitemap: ${origin}/sitemap.xml`), indexable);
  for (const agent of [
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
    "ChatGPT-User",
    "Perplexity-User",
    "Claude-User",
  ])
    assert.ok(robots.includes(`User-agent: ${agent}\nAllow: /`));
  assert.ok(robots.includes("User-agent: GPTBot\nDisallow: /"));
  if (!indexable) {
    await assert.rejects(access(new URL("sitemap.xml", output)));
    return;
  }
  const { document } = new JSDOM(
    await readFile(new URL("sitemap.xml", output), "utf8"),
    { contentType: "text/xml" },
  ).window;
  assert.equal(document.querySelectorAll("parsererror").length, 0);
  const locations = [...document.querySelectorAll("loc")].map(
    (node) => node.textContent,
  );
  assert.deepEqual(
    locations,
    staticPaths
      .filter((path) => !draftPaths.has(path))
      .map((path) => origin + path),
  );
  for (const entry of document.querySelectorAll("url")) {
    const lastmod = entry.querySelector("lastmod");
    if (lastmod) {
      const slug = entry.querySelector("loc").textContent.split("/").at(-1);
      assert.equal(lastmod.textContent, storyDetails[slug].updatedAt);
    }
  }
});
