import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import { resolveIndexing, resolveSiteOrigin } from "./site.config.ts";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const origin = resolveSiteOrigin(env.VITE_SITE_URL);
  const indexing = resolveIndexing(env);
  return {
    plugins: [reactRouter()],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(origin),
      "import.meta.env.VITE_INDEXING": JSON.stringify(
        indexing ? "enabled" : "disabled",
      ),
    },
  };
});
