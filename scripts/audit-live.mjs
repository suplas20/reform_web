import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { staticPaths, draftPaths } from "../app/lib/paths.ts";
import { site } from "../site.config.ts";

const base = new URL(process.argv[2] || site.origin).origin;
const failures = [];
const warnings = [];
async function response(path) {
  return fetch(base + path, {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
}
async function check(label, fn) {
  try {
    await fn();
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}
// Limit concurrency so this remains a small, read-only deployment check.
for (let i = 0; i < staticPaths.length; i += 4) {
  await Promise.all(
    staticPaths.slice(i, i + 4).map((path) =>
      check(path, async () => {
        const result = await response(path);
        assert.equal(result.status, 200);
        if (!draftPaths.has(path))
          assert.ok(
            !result.headers.get("x-robots-tag")?.includes("noindex"),
            "Origin is being served with a noindex response header",
          );
        const { document } = new JSDOM(await result.text()).window;
        assert.equal(
          document.querySelector('link[rel="canonical"]')?.href,
          site.origin + path,
          "Canonical URL missing or incorrect",
        );
        assert.equal(document.querySelectorAll("main h1").length, 1);
        assert.ok(document.querySelector("main")?.textContent.length > 100);
        const robots =
          document.querySelector('meta[name="robots"]')?.content || "";
        assert.equal(
          robots.includes("noindex"),
          draftPaths.has(path),
          "Unexpected index policy",
        );
        assert.equal(
          document.querySelector('meta[property="og:url"]')?.content,
          site.origin + path,
        );
        assert.ok(
          document
            .querySelector('meta[property="og:image"]')
            ?.content.startsWith(site.origin + "/"),
        );
        const nodes = [
          ...document.querySelectorAll('script[type="application/ld+json"]'),
        ].flatMap((script) => {
          const data = JSON.parse(script.textContent);
          return data["@graph"] || [data];
        });
        assert.ok(
          nodes.some((node) => node["@id"] === site.origin + path + "#webpage"),
        );
      }),
    ),
  );
}
await check("sitemap.xml", async () => {
  const result = await response("/sitemap.xml");
  assert.equal(result.status, 200);
  assert.match(result.headers.get("content-type"), /xml/);
  const { document } = new JSDOM(await result.text(), {
    contentType: "text/xml",
  }).window;
  assert.deepEqual(
    [...document.querySelectorAll("loc")]
      .map((node) => node.textContent)
      .sort(),
    staticPaths
      .filter((path) => !draftPaths.has(path))
      .map((path) => site.origin + path)
      .sort(),
  );
});
await check("robots.txt", async () => {
  const result = await response("/robots.txt");
  assert.equal(result.status, 200);
  const text = await result.text();
  assert.ok(text.includes(`Sitemap: ${site.origin}/sitemap.xml`));
  for (const agent of [
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
    "ChatGPT-User",
    "Perplexity-User",
    "Claude-User",
  ]) {
    assert.ok(
      text.includes(`User-agent: ${agent}\nAllow: /`),
      `Missing retrieval policy for ${agent}`,
    );
    const pattern = new RegExp(
      `User-agent:\\s*${agent}\\s*\\nDisallow:\\s*/`,
      "i",
    );
    if (pattern.test(text))
      warnings.push(
        `Cloudflare managed robots still contains a Disallow rule for ${agent}; review Search/Agent policies and security logs. A directive alone does not prove an edge block.`,
      );
  }
});
for (const path of [
  "/seo-audit-missing-page",
  "/guides/seo-audit-missing-guide",
  "/stories/seo-audit-missing-story",
]) {
  await check(`404 ${path}`, async () =>
    assert.equal((await response(path)).status, 404),
  );
}
for (const [from, to] of [
  ["/about.html", "/about"],
  ["/story-wooden-chair.html", "/stories/wooden-chair"],
]) {
  await check(`301 ${from}`, async () => {
    const result = await response(from);
    assert.equal(result.status, 301);
    assert.equal(new URL(result.headers.get("location"), base).pathname, to);
  });
}
if (base === site.origin) {
  await check(
    "apex domain redirects to www and preserves path/query",
    async () => {
      const result = await fetch(
        "https://dashiform.com/guides?audit=canonical",
        { redirect: "manual", signal: AbortSignal.timeout(15000) },
      );
      assert.ok(
        [301, 308].includes(result.status),
        "Configure the Cloudflare hostname redirect",
      );
      assert.equal(
        new URL(result.headers.get("location"), base).href,
        site.origin + "/guides?audit=canonical",
      );
    },
  );
}
for (const warning of warnings) console.warn(`WARN ${warning}`);
console.log(
  `${staticPaths.length} pages checked; ${failures.length} failures; ${warnings.length} policy warnings. This does not establish Google indexing or access by verified bot IPs.`,
);
if (failures.length) process.exitCode = 1;
