import { rename, rmdir, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { pages } from "../app/data/pages.ts";
import { stories } from "../app/data/stories.ts";

const output = new URL("../build/client/", import.meta.url);
const siteUrl = loadEnv(
  "production",
  process.cwd(),
  "VITE_",
).VITE_SITE_URL?.replace(/\/$/, "");
const paths = [
  ...Object.values(pages).map((page) => page.path),
  ...stories.map((story) => `/stories/${story.slug}`),
];
// Pages serves /about.html at /about, while /about/index.html redirects to /about/.
// Keep clean URLs consistent with React Router links and canonical metadata.
for (const path of paths.filter((path) => path !== "/")) {
  await rename(
    new URL(`${path.slice(1)}/index.html`, output),
    new URL(`${path.slice(1)}.html`, output),
  );
}
for (const path of paths
  .filter((path) => path !== "/")
  .sort((a, b) => b.length - a.length)) {
  try {
    await rmdir(new URL(path.slice(1), output));
  } catch (error) {
    if (error.code !== "ENOTEMPTY") throw error;
  }
}
const redirects = ["/index.html / 301", "/index / 301"];
for (const page of Object.values(pages)) {
  if (page.path !== "/") redirects.push(`${page.path}.html ${page.path} 301`);
}
for (const story of stories) {
  redirects.push(
    `/story-${story.slug}.html /stories/${story.slug} 301`,
    `/story-${story.slug} /stories/${story.slug} 301`,
  );
}
await writeFile(new URL("_redirects", output), redirects.join("\n") + "\n");
await writeFile(
  new URL("robots.txt", output),
  `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
);
if (siteUrl) {
  const escapeXml = (text) =>
    text
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  await writeFile(
    new URL("sitemap.xml", output),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeXml(siteUrl + path)}</loc></url>`).join("\n")}\n</urlset>\n`,
  );
}
console.log(
  `Cloudflare Pages output: build/client (${paths.length} pre-rendered pages).${siteUrl ? " Sitemap generated." : " Set VITE_SITE_URL to generate canonical URLs and sitemap.xml."}`,
);
