import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { waitForCustomElement } from "../utils";

interface AppRouteParams {
  lang: string;
  appId: string;
}

export const Route = createFileRoute("/$lang/$appId")({
  component: DynamicAppPage,
});

function DynamicAppPage() {
  const { appId, lang } = Route.useParams();
  const { i18n } = useTranslation();
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

  // Create element with lang attribute
  return React.createElement(`${appId}-element`, {
    lang: lang || i18n.language,
  });
}
