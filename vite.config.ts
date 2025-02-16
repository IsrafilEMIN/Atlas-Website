import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@api": path.resolve(__dirname, "api"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Include your API files
        main: path.resolve(__dirname, 'index.html'),
        api: path.resolve(__dirname, 'api/index.ts'),
      },
    },
  },
});
