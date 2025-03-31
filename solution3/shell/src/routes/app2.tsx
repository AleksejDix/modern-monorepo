import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/app2")({
  component: About,
});

function About() {
  return <div>App2</div>;
}
