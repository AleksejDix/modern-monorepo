import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/$lang/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="home-content">
      <h2>{t("home.title")}</h2>
      <p>{t("home.description")}</p>
      <p>{t("home.features.title")}</p>
      <ul>
        <li>{t("home.features.items.dependencies")}</li>
        <li>{t("home.features.items.styling")}</li>
        <li>{t("home.features.items.deployment")}</li>
        <li>{t("home.features.items.communication")}</li>
      </ul>
    </div>
  );
}
