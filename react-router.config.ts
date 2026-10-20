import type { Config } from "@react-router/dev/config";
import { staticPaths } from "./app/lib/paths.ts";

export default {
  ssr: false,
  prerender: staticPaths,
} satisfies Config;
