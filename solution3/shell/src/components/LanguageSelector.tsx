import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { LANGUAGES } from "../constants/languages";

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
      <span>{t("languageSelector.label")}: </span>
      <div className="language-buttons">
        {Object.values(LANGUAGES).map((language) => (
          <button
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={i18n.language === language.code ? "active" : ""}
          >
            {language.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
