import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    VitePWA(),
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: process.env.TAURI_DEBUG ? false : "esbuild",
    sourcemap: !!process.env.TAURI_DEBUG,
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: ['lodash-es'],
      },
    },
  },
}));