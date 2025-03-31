import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n"; // Import and initialize i18n

function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    setCount(count + 1);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Example of using custom events for communication
  useEffect(() => {
    const handleThemeChange = (event) => {
      setTheme(event.detail.theme);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <div className={`dashboard-container ${theme}`}>
      <h1>{t("app1.title")}</h1>

      <div className="controls">
        <button onClick={handleClick}>
          {t("app1.controls.count", { count })}
        </button>
        <button onClick={toggleTheme}>{t("app1.controls.toggleTheme")}</button>
      </div>
      <div className="content">
        <p>{t("app1.content.intro")}</p>
        <p>{t("app1.content.ownItems")}</p>
        <ul>
          <li>{t("app1.content.features.stateManagement")}</li>
          <li>{t("app1.content.features.styling")}</li>
          <li>{t("app1.content.features.dependencies")}</li>
          <li>{t("app1.content.features.routing")}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
