import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5003,
    cors: true,
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
      // Mark React and ReactDOM as external dependencies
      external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client"],
    },
  },
  css: {
    // Enable the ?inline functionality for CSS imports
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
