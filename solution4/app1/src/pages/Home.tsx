
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { LangLinkQuery } from "../components/LangLinkQuery";
export function Home() {
  const { t } = useTranslation();
  return (
    <div>
     {t("sausage")}
    <LangLinkQuery to="/">Home</LangLinkQuery>
      <LangLinkQuery to="/child">Child</LangLinkQuery>
      <LangLinkQuery to="/child/child2">Child2</LangLinkQuery>
      <LangLinkQuery to="/child/child3">Child3</LangLinkQuery>

      <Outlet />
    </div>
  );
}
