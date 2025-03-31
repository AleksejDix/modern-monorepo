import React, { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { supportedLngs, defaultLng } from "../i18n";

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
    if (lang && supportedLngs.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [params, i18n]);

  return <Outlet />;
};

// @ts-ignore - Ignore type error for route path
export const Route = createFileRoute("/:lang" as any)({
  component: LangLayout,
});
