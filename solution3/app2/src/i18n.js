import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";
import frTranslation from "./locales/fr.json";
import itTranslation from "./locales/it.json";
import ruTranslation from "./locales/ru.json";

// Define supported languages
export const SUPPORTED_LANGUAGES = ["en", "de", "fr", "it", "ru"];
export const DEFAULT_LANGUAGE = "de";

// Extract language from URL path - expected format: "/lang/..."
const extractLanguageFromURL = () => {
  const urlPath = window.location.pathname;
  const pathSegments = urlPath.split("/").filter(Boolean);

  // Check if first segment is a language code
  if (
    pathSegments.length > 0 &&
    SUPPORTED_LANGUAGES.includes(pathSegments[0])
  ) {
    return pathSegments[0];
  }

  return null;
};

// Initialize i18next
i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Use language detector as fallback
  .use(LanguageDetector)
  // Initialize configuration
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      it: {
        translation: itTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,

    // Prioritize localStorage over path
    detection: {
      order: ["localStorage", "navigator", "path"],
      lookupFromPathIndex: 0,
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Set initial language from URL if available, but ONLY if no localStorage preference
const urlLang = extractLanguageFromURL();
const storedLang = localStorage.getItem("i18nextLng");

if (urlLang && !storedLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
  i18n.changeLanguage(urlLang);
} else if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
  i18n.changeLanguage(storedLang);
}

// Make i18n instance available globally for Web Component
window.i18n = i18n;

export default i18n;
