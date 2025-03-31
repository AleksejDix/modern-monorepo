import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5003,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  preview: {
    port: 5003,
    cors: true,
  },
  build: {
    // Ensure the output files have static names without hashes
    rollupOptions: {
      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
        assetFileNames: "src/[name].[ext]",
      },
      // No external dependencies - everything is bundled
    },
    // Ensure we're building for modern browsers
    target: "esnext",
    // Generate source maps for better debugging
    sourcemap: true,
  },
  css: {
    // Enable the ?inline functionality for CSS imports
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  // Ensure we're using the latest features
  esbuild: {
    target: "esnext",
    supported: {
      "top-level-await": true,
    },
  },
});
