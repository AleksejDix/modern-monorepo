import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5004,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, Content-Type, Authorization, Origin, Accept",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    },
  },
  preview: {
    port: 5004,
    cors: true,
  },
  build: {
    target: "esnext",
    outDir: "dist",
    // Don't minify to make debugging easier
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: "exports-only",
      output: {
        entryFileNames: "src/[name].js",
      },
    },
  },
});
