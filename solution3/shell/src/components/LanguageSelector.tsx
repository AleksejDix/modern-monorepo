import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const switchLanguage = (lng: string): void => {
    // Get the current route path without the language prefix
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/").filter(Boolean);

    // Get the path after the language segment
    let pathAfterLang = "/";
    if (segments.length > 1) {
      pathAfterLang = "/" + segments.slice(1).join("/");
    }

    // Create the new URL with the new language
    const newUrl = `/${lng}${pathAfterLang}`;

    // Change language
    i18n.changeLanguage(lng);

    // Navigate to new URL
    navigate({ to: newUrl as any });
  };

  return (
    <div className="language-selector">
      <span>{t("languageSelector.label", "Language")}: </span>
      <div className="language-buttons">
        <button
          onClick={() => switchLanguage("en")}
          className={i18n.language === "en" ? "active" : ""}
        >
          English
        </button>
        <button
          onClick={() => switchLanguage("de")}
          className={i18n.language === "de" ? "active" : ""}
        >
          Deutsch
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
