import React, { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../constants/languages";

// Language layout component that handles language changes
const LangLayout: React.FC = () => {
  const { lang } = Route.useParams();
  const { i18n } = useTranslation();

  // Set language based on URL parameter
  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);

      // Also save to localStorage
      localStorage.setItem("i18nextLng", lang);
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
