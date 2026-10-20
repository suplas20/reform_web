import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("features", "routes/features.tsx"),
  route("stories", "routes/stories.tsx"),
  route("stories/:slug", "routes/story.tsx"),
  route("guides", "routes/guides.tsx"),
  route("guides/:category", "routes/guide.tsx"),
  route("editorial-policy", "routes/editorial.tsx"),
  route("faq", "routes/faq.tsx"),
  route("download", "routes/download.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
