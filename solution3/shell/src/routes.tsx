import React from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout";
import "./i18n"; // Import and initialize i18n

// Function to dynamically load a microfrontend
const loadMicrofrontend = (name: string): void => {
  console.log(`Loading microfrontend: ${name}`);

  const scriptId = `${name}-script`;

  // Skip if already loaded
  if (document.getElementById(scriptId)) {
    console.log(`${name} already loaded`);
    return;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.id = scriptId;

  // In development, load from the development server
  // In production, load from the deployed URL
  const baseUrl = import.meta.env.DEV
    ? `http://localhost:${name === "app1" ? "5003" : "5004"}`
    : import.meta.env[`VITE_${name.toUpperCase()}_URL`];

  script.src = `${baseUrl}/src/index.js`;

  console.log(`Inserting script for ${name}: ${script.src}`);
  document.head.appendChild(script);
};

// Define the home page component
function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="home-content">
      <h2>{t("home.title")}</h2>
      <p>{t("home.description")}</p>
      <p>{t("home.features.title")}</p>
      <ul>
        <li>{t("home.features.items.dependencies")}</li>
        <li>{t("home.features.items.styling")}</li>
        <li>{t("home.features.items.deployment")}</li>
        <li>{t("home.features.items.communication")}</li>
      </ul>
    </div>
  );
}

// Define microfrontend components
function App1Page() {
  return <app1-element key="app1"></app1-element>;
}

function App2Page() {
  return <app2-element key="app2"></app2-element>;
}

// Create the route tree using Layout component
const rootRoute = createRootRoute({
  component: Layout,
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const app1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app1",
  component: App1Page,
  beforeLoad: () => {
    // Dynamically load the app1 microfrontend
    loadMicrofrontend("app1");
  },
});

const app2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app2",
  component: App2Page,
  beforeLoad: () => {
    // Dynamically load the app2 microfrontend
    loadMicrofrontend("app2");
  },
});

// Create the router
const routeTree = rootRoute.addChildren([indexRoute, app1Route, app2Route]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Use the browser history
  history:
    typeof window !== "undefined"
      ? {
          type: "browser",
        }
      : undefined,
});

// Function to create a router for use in other files
export const createAppRouter = () => router;
