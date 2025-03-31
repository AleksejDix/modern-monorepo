import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define supported languages
export const SUPPORTED_LANGUAGES = ["en", "de", "fr", "it", "ru"];
export const DEFAULT_LANGUAGE = "de";

// Initialize i18next
i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize configuration
  .init({
    resources: {}, // Start with empty resources
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Enable dynamic loading
    partialBundledLanguages: true,
  });

// Function to load language resources on demand
const loadResources = async (language: string) => {
  if (!i18n.hasResourceBundle(language, "translation")) {
    try {
      let resources;
      switch (language) {
        case "en":
          resources = await import("./locales/en.json");
          break;
        case "de":
          resources = await import("./locales/de.json");
          break;
        case "fr":
          resources = await import("./locales/fr.json");
          break;
        case "it":
          resources = await import("./locales/it.json");
          break;
        case "ru":
          resources = await import("./locales/ru.json");
          break;
        default:
          resources = await import("./locales/de.json");
      }

      i18n.addResourceBundle(
        language,
        "translation",
        resources.default || resources
      );
    } catch (error) {
      console.error(`Failed to load resources for ${language}:`, error);
    }
  }
};

// Override changeLanguage to load resources on demand
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng?: string) => {
  if (lng && SUPPORTED_LANGUAGES.includes(lng)) {
    await loadResources(lng);
  }
  return originalChangeLanguage(lng);
};

// Preload default language
loadResources(DEFAULT_LANGUAGE);

export default i18n;
