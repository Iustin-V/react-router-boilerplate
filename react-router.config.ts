import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  future: {
    v8_middleware: true,
    unstable_optimizeDeps: false,
    unstable_splitRouteModules: false,
    unstable_viteEnvironmentApi: false,
  },
  presets: [vercelPreset()],
} satisfies Config;
