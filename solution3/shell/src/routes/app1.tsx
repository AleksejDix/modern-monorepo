import { createFileRoute } from "@tanstack/react-router";
import { loadMicrofrontend } from "../utils";

export const Route = createFileRoute("/app1")({
  component: App1Page,
  beforeLoad: () => {
    // Dynamically load the app1 microfrontend
    loadMicrofrontend("app1");
  },
});

function App1Page() {
  return <app1-element key="app1"></app1-element>;
}
