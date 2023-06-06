import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    VitePWA(),
  ],
  optimizeDeps: {
    exclude: ['@swc/core'],
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Specify any custom chunks you want to create
          // For example, splitting Vue-related libraries into a separate chunk
          'vue-related': ['vue', 'vue-router', 'vuex'],
        },
      },
      treeshake: {
        // Specify any additional modules you want to exclude from tree shaking
        // For example, excluding certain utility libraries or dependencies
        moduleSideEffects: ['lodash-es'],
      },
    },
  },
}));