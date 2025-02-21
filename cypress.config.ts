import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
