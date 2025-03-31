import React, { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../constants/languages";

// Language layout component that handles language changes
const LangLayout: React.FC = () => {
  const { lang } = Route.useParams();
  const { i18n } = useTranslation();

  // Set language based on URL parameter, but respecting localStorage preference
  useEffect(() => {
    // Get stored language preference
    const storedLang = localStorage.getItem("i18nextLng");

    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      // Use stored language if available and supported
      if (i18n.language !== storedLang) {
        i18n.changeLanguage(storedLang);
      }
    } else if (
      lang &&
      SUPPORTED_LANGUAGES.includes(lang) &&
      i18n.language !== lang
    ) {
      // Fallback to URL language if no stored preference
      i18n.changeLanguage(lang);

      // Store in localStorage for future visits
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
