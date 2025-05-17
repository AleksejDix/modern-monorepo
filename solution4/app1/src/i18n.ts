import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


export const i18nApp1 = createInstance()

i18nApp1
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "sausage": "Sausage",
        },
      },
      de: {
        translation: {
          "sausage": "Wurst",
        },
      },
      fr: {
        translation: {
          "sausage": "Saucisse",
        },
      },
      it: {
        translation: {
          "sausage": "Salsiccia",
        },
      },
    }, // Start with empty resources
    fallbackLng: 'it',
    supportedLngs: ['en', 'de', 'fr', 'it'],
    // debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["querystring", "navigator", "path"],
      lookupQuerystring: "lang",
    },

    // Enable dynamic loading
    partialBundledLanguages: true,
  });


