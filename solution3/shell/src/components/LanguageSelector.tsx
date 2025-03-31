import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      <span>{t("languageSelector.label")}: </span>
      <div className="language-buttons">
        <button onClick={() => changeLanguage("en")}>English</button>

        <button onClick={() => changeLanguage("de")}>Deutsch</button>
      </div>
    </div>
  );
};

export default LanguageSelector;
