import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Define app1 URL based on environment
  const isDev = mode === "development";
  const app1Url = isDev
    ? "http://localhost:5003/src/index.jsx"
    : "http://localhost:5003/src/index.js";

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      // Add a plugin to inject the app1 script in development
      {
        name: "inject-app1-script",
        transformIndexHtml(html) {
          if (isDev) {
            return {
              html,
              tags: [
                {
                  tag: "script",
                  attrs: {
                    type: "module",
                    src: app1Url,
                  },
                  injectTo: "head",
                },
              ],
            };
          }
          return html;
        },
      },
    ],
    // Make the app1 URL available to the application
    define: {
      "import.meta.env.VITE_APP1_URL": JSON.stringify(app1Url),
    },
    server: {
      port: 5000,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    build: {
      target: "esnext",
      outDir: "dist",
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-dom/client",
        ],
      },
    },
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  };
});
