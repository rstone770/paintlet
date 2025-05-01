import wyw from "@wyw-in-js/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [wyw()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src")
    }
  }
});
