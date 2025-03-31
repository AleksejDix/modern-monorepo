import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./constants/languages";

// Import translations
import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";
import frTranslation from "./locales/fr.json";
import itTranslation from "./locales/it.json";
import ruTranslation from "./locales/ru.json";

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
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
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
