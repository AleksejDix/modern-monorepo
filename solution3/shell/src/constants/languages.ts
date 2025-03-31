/**
 * Language configuration for the application
 */

/**
 * Interface for language configuration
 */
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

/**
 * Available languages in the application
 */
export const LANGUAGES: Record<string, Language> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
  },
};

/**
 * List of supported language codes
 */
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

/**
 * Default language code
 */
export const DEFAULT_LANGUAGE = "en";
