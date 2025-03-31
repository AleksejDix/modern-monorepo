import React from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

export const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Check if URL has an unsupported language code
  const urlPath = window.location.pathname;
  const pathSegments = urlPath.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  const isUnsupportedLanguage =
    firstSegment &&
    !SUPPORTED_LANGUAGES.includes(firstSegment) &&
    firstSegment.length >= 2 &&
    firstSegment.length <= 3;

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>

      {isUnsupportedLanguage ? (
        <>
          <p>
            <strong>Unsupported language code: {firstSegment}</strong>
          </p>
          <p>Please choose one of the supported languages:</p>
          <ul className="language-list">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang}>
                <Link to={`/${lang}/`}>{lang}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>The page you are looking for could not be found.</p>
      )}

      <Link to={`/${currentLanguage}/`} className="back-link">
        Return to Home
      </Link>
    </div>
  );
};
