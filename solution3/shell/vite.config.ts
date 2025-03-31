import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Define app1 URL based on environment
  const isDev = mode === "development";
  const app1Url = isDev ? "http://localhost:5003" : "http://localhost:5003";
  const app2Url = isDev ? "http://localhost:5004" : "http://localhost:5004";

  return {
    plugins: [react()],
    // Make the app URLs available to the application
    define: {
      "import.meta.env.VITE_APP1_URL": JSON.stringify(app1Url),
      "import.meta.env.VITE_APP2_URL": JSON.stringify(app2Url),
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
    },
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  };
});
