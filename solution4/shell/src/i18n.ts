import { createInstance} from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const i18nShell = createInstance()

i18nShell
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize configuration
  .init({
    resources: {
      en: {
        translation: {
          "hello": "Hello",
        },
      },
      de: {
        translation: {
          "hello": "Hallo",
        },
      },
      fr: {
        translation: {
          "hello": "Bonjour",
        },
      },
      it: {
        translation: {
          "hello": "Ciao",
        },
      },
      
    }, // Start with empty resources
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'fr', 'it'],
    // debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["querystring", "navigator"],
      lookupQuerystring: "lang",
    },

    // Enable dynamic loading
    partialBundledLanguages: true,
  });
