import { i18nApp1 } from "@/i18n";
import { useEffect } from "react";

interface UrlChangeEvent extends Event {
  detail: { lang: string };
}

export const LanguageObserver = () => {
  useEffect(() => {
    const handleUrlChange = (event: Event) => {

      if ('detail' in event) {
        const { lang = 'de' } = (event as UrlChangeEvent).detail;
          i18nApp1.changeLanguage(lang);
      }
    };
    
    document.addEventListener('nuqs:changeLanguage', handleUrlChange as EventListener);
    return () => {
      document.removeEventListener('nuqs:changeLanguage', handleUrlChange as EventListener);
    };
  }, []);

  return null;
};