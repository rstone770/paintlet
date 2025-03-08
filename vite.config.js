import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import wyw from "@wyw-in-js/vite";

export default defineConfig({
  plugins: [wyw(), preact()]
});
