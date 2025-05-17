import React from "react";
import { i18nShell } from "../i18n";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useQueryState("lang", {
    defaultValue: "de",
    clearOnDefault: false,
    history: "push",
  });

  // Effect to update i18n when lang changes
  useEffect(() => {
    if (!lang) return;
    if (lang === i18n.language) return;
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const switchLanguage = (lng: string): void => {
    setLang(lng);
  };

  const LANGUAGES = (i18nShell.options?.supportedLngs || ['en', 'de']).map((lng: string) => ({
    code: lng,
    name: lng,
    nativeName: lng,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button >
          <Globe className="h-4 w-4" />
          {LANGUAGES.find(lang => lang.code === i18n.language)?.nativeName || LANGUAGES[0].nativeName}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={switchLanguage}
        >
          {LANGUAGES.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              {language.nativeName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
