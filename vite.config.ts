import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

// export default defineConfig({
//   plugins: [tsconfigPaths(), envOnlyMacros(), tailwindcss(), reactRouter()],
//   build: {
//     rollupOptions: isSsrBuild ? { input: "./server/app.ts" } : undefined,
//   },
//   server: { port: 3000 },
// });
export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild ? { input: "./server/app.ts" } : undefined,
  },
  plugins: [tsconfigPaths(), envOnlyMacros(), tailwindcss(), reactRouter()],
    server: { port: 3000 },
}));