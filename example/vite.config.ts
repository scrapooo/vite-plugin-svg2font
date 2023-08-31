import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svg2font from "vite-plugin-svg2font";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svg2font({
      svgPath: "src/assets/svg-icons",
      fileName: "iconfont",
      targetPath: "assets",
      log: false,
    }),
  ],
});
