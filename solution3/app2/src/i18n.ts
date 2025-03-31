import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";
import frTranslation from "./locales/fr.json";
import itTranslation from "./locales/it.json";
import ruTranslation from "./locales/ru.json";

// Define supported languages
export const SUPPORTED_LANGUAGES = ["en", "de", "fr", "it", "ru"];
export const DEFAULT_LANGUAGE = "de";

// Initialize i18next
i18n
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

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
