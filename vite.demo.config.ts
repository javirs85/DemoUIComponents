import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:    resolve(__dirname, "index.html"),
        studio:  resolve(__dirname, "studio.html"),
        process: resolve(__dirname, "process.html"),
      },
    },
  },
});
