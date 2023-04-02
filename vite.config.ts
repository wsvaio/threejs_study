import { resolve } from "node:path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    AutoImport({
      dts: resolve(__dirname, "types/auto-import.d.ts"),
      defaultExportByFilename: true,
      dirs: [resolve(__dirname, "src/utils")],
    }),
  ],
});
