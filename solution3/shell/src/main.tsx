import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { NotFound } from "./components/NotFound";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
// Explicitly import jsx-runtime to ensure it's bundled
import "react/jsx-runtime";
// Import date formatter utilities
import { exposeDateFormattersToWindow } from "./utils/dateFormat";

// Create a new router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultNotFoundComponent: () => <NotFound />,
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  // Expose date formatters to window for microfrontends
  exposeDateFormattersToWindow();

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
