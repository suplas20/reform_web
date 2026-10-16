import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  if (env.VITE_SITE_URL) {
    const url = new URL(env.VITE_SITE_URL);
    if (
      !/^https?:$/.test(url.protocol) ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw new Error(
        "VITE_SITE_URL must be an HTTP(S) origin, e.g. https://reform.example.com",
      );
    }
  }
  return { plugins: [reactRouter()] };
});
