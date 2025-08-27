import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: "automatic",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "lib/constants/**/*",
        "lib/data/**/*",
        "lib/mock/**/*",
        "lib/types/**/*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
