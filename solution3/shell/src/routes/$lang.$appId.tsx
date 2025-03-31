import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { waitForCustomElement } from "../utils";

interface AppRouteParams {
  lang: string;
  appId: string;
}

export const Route = createFileRoute("/$lang/$appId")({
  component: DynamicAppPage,
});

function DynamicAppPage() {
  const { appId } = Route.useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const elementName = `${appId}-element`;
    waitForCustomElement(elementName).then((success) => {
      setLoaded(success);
    });
  }, [appId]);

  if (!loaded) {
    return <div>Loading {appId}...</div>;
  }

  return React.createElement(`${appId}-element`);
}
