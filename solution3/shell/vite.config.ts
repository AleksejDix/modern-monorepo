import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      TanStackRouterVite({ target: "react" }),
      react(),
      process.env.ANALYZE === "true" &&
        visualizer({
          open: true,
          filename: "stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      port: 5000,
      strictPort: true,
      hmr: {
        port: 5000,
      },
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization, Origin, Accept",
        "Access-Control-Allow-Credentials": "true",
        "Content-Security-Policy":
          "default-src 'self'; style-src 'self' 'unsafe-inline' http://localhost:5003; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5003; font-src 'self' http://localhost:5003; img-src 'self' data: http://localhost:5003;",
      },
    },
    preview: {
      port: 5000,
      cors: true,
    },
    build: {
      target: "esnext",
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
        },
      },
      sourcemap: isDev,
    },
  };
});
