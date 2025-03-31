import React from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
const Layout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>Micro Frontend Shell</h1>
          <LanguageSelector />
        </div>
        <nav>
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: "nav-link active" }}
          >
            {t("navigation.home")}
          </Link>
          <Link
            to="/app1"
            className="nav-link"
            activeProps={{ className: "nav-link active" }}
          >
            {t("navigation.app1")}
          </Link>
          <Link
            to="/app2"
            className="nav-link"
            activeProps={{ className: "nav-link active" }}
          >
            {t("navigation.app2")}
          </Link>
        </nav>
      </header>

      <main className="app-content">
        <div className="page">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </main>
    </div>
  );
};

export default Layout;
