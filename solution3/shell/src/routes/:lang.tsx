import React, { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

interface LangParams {
  lang: string;
}

// Language layout component that handles language changes
const LangLayout: React.FC = () => {
  // Type cast params to our interface
  const params = Route.useParams() as LangParams;
  const { i18n } = useTranslation();

  // Set language based on URL parameter
  useEffect(() => {
    const { lang } = params;
    if (lang && SUPPORTED_LANGUAGES.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [params, i18n]);

  return <Outlet />;
};

export const Route = createFileRoute("/:lang")({
  component: LangLayout,
});
