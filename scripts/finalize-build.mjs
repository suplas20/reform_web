import { rename, rmdir, rm, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { staticPaths, draftPaths } from "../app/lib/paths.ts";
import { stories } from "../app/data/stories.ts";
import { storyDetails } from "../app/data/story-details.ts";
import { resolveIndexing, resolveSiteOrigin } from "../site.config.ts";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const origin = resolveSiteOrigin(env.VITE_SITE_URL);
const indexable = resolveIndexing(env);
const output = new URL("../build/client/", import.meta.url);

// Pages serves /about.html at /about; directory indexes would redirect to /about/.
for (const path of staticPaths.filter((path) => path !== "/")) {
  await rename(
    new URL(`${path.slice(1)}/index.html`, output),
    new URL(`${path.slice(1)}.html`, output),
  );
}
for (const path of staticPaths
  .filter((path) => path !== "/")
  .sort((a, b) => b.length - a.length)) {
  try {
    await rmdir(new URL(path.slice(1), output));
  } catch (error) {
    if (error.code !== "ENOTEMPTY") throw error;
  }
}
// Every supported URL has an HTML document. Do not publish an indexable empty shell.
await rm(new URL("__spa-fallback.html", output), { force: true });
await rm(new URL(".vite", output), { recursive: true, force: true });

const redirects = ["/index.html / 301", "/index / 301"];
for (const path of staticPaths)
  if (path !== "/") redirects.push(`${path}.html ${path} 301`);
for (const story of stories)
  redirects.push(
    `/story-${story.slug}.html /stories/${story.slug} 301`,
    `/story-${story.slug} /stories/${story.slug} 301`,
  );
await writeFile(new URL("_redirects", output), redirects.join("\n") + "\n");

const searchAgents = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "PerplexityBot",
  "Claude-SearchBot",
  "ChatGPT-User",
  "Perplexity-User",
  "Claude-User",
];
const trainingAgents = ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"];
const robots = [
  "# Search and user-requested retrieval are allowed; model training is separate.",
  "# Cloudflare managed robots and edge bot policies must be aligned separately.",
  "User-agent: *\nAllow: /",
  ...searchAgents.map((agent) => `User-agent: ${agent}\nAllow: /`),
  ...trainingAgents.map((agent) => `User-agent: ${agent}\nDisallow: /`),
  ...(indexable
    ? [`Sitemap: ${origin}/sitemap.xml`]
    : ["# Preview deployment: pages carry noindex,follow."]),
];
await writeFile(new URL("robots.txt", output), robots.join("\n\n") + "\n");
const escapeXml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const urls = indexable
  ? staticPaths.filter((path) => !draftPaths.has(path))
  : [];
if (indexable)
  await writeFile(
    new URL("sitemap.xml", output),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((path) => {
        const story = stories.find(
          (story) => path === `/stories/${story.slug}`,
        );
        const modified = story ? storyDetails[story.slug].updatedAt : null;
        return `  <url><loc>${escapeXml(origin + path)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ""}</url>`;
      })
      .join("\n")}\n</urlset>\n`,
  );
else await rm(new URL("sitemap.xml", output), { force: true });
console.log(
  `Cloudflare Pages: ${staticPaths.length} pre-rendered pages; ${urls.length} sitemap URLs; indexing ${indexable ? "enabled" : "disabled"}; canonical origin ${origin}.`,
);
