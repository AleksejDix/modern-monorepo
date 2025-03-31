import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  // In dev mode, we use remote URLs. In production, we bundle the apps
  const app1Url = isDev
    ? "http://localhost:5003/src/index.jsx"
    : "http://localhost:5003/src/index.js";

  const app2Url = isDev
    ? "http://localhost:5004/src/index.jsx"
    : "http://localhost:5004/src/index.js";

  return {
    plugins: [
      TanStackRouterVite({ target: "react" }),
      react(),
      {
        name: "inject-mfe-scripts",
        transformIndexHtml() {
          return {
            tags: [
              {
                tag: "script",
                attrs: {
                  type: "module",
                  src: app1Url,
                },
                injectTo: "head",
              },
              {
                tag: "script",
                attrs: {
                  type: "module",
                  src: app2Url,
                },
                injectTo: "head",
              },
            ],
          };
        },
      },
    ],
    define: {
      "import.meta.env.VITE_APP1_URL": JSON.stringify(app1Url),
      "import.meta.env.VITE_APP2_URL": JSON.stringify(app2Url),
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
        "Access-Control-Max-Age": "86400",
        "Content-Security-Policy":
          "default-src 'self' http://localhost:5003 http://localhost:5004; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5003 http://localhost:5004; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:5003 http://localhost:5004 ws://localhost:*",
      },
    },
    preview: {
      port: 5000,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization, Origin, Accept",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
        "Content-Security-Policy":
          "default-src 'self' http://localhost:5003 http://localhost:5004; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5003 http://localhost:5004; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:5003 http://localhost:5004 ws://localhost:*",
      },
    },
    build: {
      target: "esnext",
      outDir: "dist",
    },
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  };
});
