import {
  Outlet,
  Link,
  createRootRoute,
  redirect,
  notFound,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants/languages";

function Layout() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || DEFAULT_LANGUAGE;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>Micro Frontend Shell</h1>
          <div className="header-controls">
            <LanguageSelector />
          </div>
        </div>
        <nav>
          <Link
            to={`/${currentLang}/`}
            className="nav-link"
            activeProps={{ className: "nav-link active" }}
          >
            {t("navigation.home")}
          </Link>
          <Link
            to={`/${currentLang}/app1`}
            className="nav-link"
            activeProps={{ className: "nav-link active" }}
          >
            {t("navigation.app1")}
          </Link>
          <Link
            to={`/${currentLang}/app2`}
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
}

export const Route = createRootRoute({
  component: Layout,
  beforeLoad: ({ location }) => {
    // If we're at the root, redirect to the default language
    if (location.pathname === "/") {
      return redirect({
        to: `/${DEFAULT_LANGUAGE}/` as any,
      });
    }

    // Check if the URL already has a language segment
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    // If no segments, redirect to default language
    if (segments.length === 0) {
      return redirect({
        to: `/${DEFAULT_LANGUAGE}/` as any,
      });
    }

    // Check if the first segment is a valid language code
    const firstSegment = segments[0];

    // If first segment exists but is not a supported language, show 404
    if (segments.length > 0 && !SUPPORTED_LANGUAGES.includes(firstSegment)) {
      // If it looks like a language code (2-3 characters), show 404
      if (firstSegment.length >= 2 && firstSegment.length <= 3) {
        return notFound();
      }

      // Otherwise, it's likely a path without language prefix, redirect
      return redirect({
        to: `/${DEFAULT_LANGUAGE}${path}` as any,
      });
    }
  },
});
