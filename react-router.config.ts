import type { Config } from "@react-router/dev/config";
import { stories } from "./app/data/stories";
import { pages } from "./app/data/pages";

export default {
  ssr: false,
  prerender: [
    ...Object.values(pages).map((page) => page.path),
    ...stories.map((story) => `/stories/${story.slug}`),
  ],
} satisfies Config;
