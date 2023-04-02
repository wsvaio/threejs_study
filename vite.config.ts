import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  plugins: [
    AutoImport({
      dts: "types/auto-import.d.ts",
      defaultExportByFilename: true,
      dirs: ["src/utils"],
    }),
  ],
});
