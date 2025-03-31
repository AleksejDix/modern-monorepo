import React, { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../constants/languages";

// Declare route path type
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/$lang": {
      parentRoute: typeof import("./__root").Route;
      params: {
        lang: string;
      };
    };
  }
}

// Define our language route params interface
type LangParams = {
  lang: string;
};

// Language layout component that handles language changes
const LangLayout: React.FC = () => {
  const { lang } = Route.useParams();
  const { i18n } = useTranslation();

  // Set language based on URL parameter
  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
};

export const Route = createFileRoute("/$lang")({
  validateSearch: (search: Record<string, unknown>) => ({}),
  parseParams: (params) => ({
    lang:
      (params as { lang?: string }).lang &&
      SUPPORTED_LANGUAGES.includes((params as { lang: string }).lang)
        ? (params as { lang: string }).lang
        : DEFAULT_LANGUAGE,
  }),
  component: LangLayout,
});
