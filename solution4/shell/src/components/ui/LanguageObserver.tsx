import { useQueryState } from "nuqs";
import { i18nShell } from "@/i18n";
import { useEffect } from "react";

export const LanguageObserver = () => {
  const [lang] = useQueryState("lang", {
    defaultValue: "de",
  });

  useEffect(() => {
    if (!lang) return;
    if (lang === i18nShell.language) return;
    console.log("shell lang", lang);
    i18nShell.changeLanguage(lang);
    document.dispatchEvent(new CustomEvent("nuqs:changeLanguage", { detail: { lang } }));
  }, [lang]);

  return null
};