import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const appVersion = process.env.npm_package_version ?? "0.1.0";

export default defineConfig({
  base: repositoryName ? `/${repositoryName}/` : "/",
  define: {
    __APP_VERSION__: JSON.stringify(appVersion)
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "src/test/setup-tests.ts"
  }
});
