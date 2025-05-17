import { Outlet } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { LangLinkQuery } from "../components/LangLinkQuery";
import { LanguageObserver } from "../components/ui/LanguageObserver";
import { useTranslation } from "react-i18next";

export function DefaultLayout() {
  const { t } = useTranslation();
  return (
    <div>

      {t('hello')}
      <LanguageObserver />
    
      <nav className="flex gap-4 outline">



        <LangLinkQuery to="/">Shell to Shell</LangLinkQuery>
        <LangLinkQuery to="/microfrontend">Microfrontend</LangLinkQuery>
        <LangLinkQuery to="/microfrontend/child">
          Child
        </LangLinkQuery>

        <LanguageSelector />
      </nav>
      <Outlet />
    </div>
  );
}
