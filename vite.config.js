import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "shopease",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [tailwindcss()],
});
