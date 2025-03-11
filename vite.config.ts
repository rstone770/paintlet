import preact from "@preact/preset-vite";
import wyw from "@wyw-in-js/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact({ prefreshEnabled: false }), wyw()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src")
    }
  }
});
