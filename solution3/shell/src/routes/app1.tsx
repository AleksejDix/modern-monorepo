import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/app1")({
  component: Index,
});

function Index() {
  return (
    <div>
      <app1-element></app1-element>
    </div>
  );
}
