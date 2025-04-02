import React, { useState, useEffect } from "react";
import * as translate from "./paraglide/messages";

function App() {
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
      <h1>{translate["app2.title"]()} </h1>

      <div className="controls">
        <button onClick={handleClick}>
          {translate["app2.controls.count"]({ count })}
        </button>
        <button onClick={toggleTheme}>
          {translate["app2.controls.toggleTheme"]()}
        </button>
      </div>
      <div className="content">
        <p>{translate["app2.content.intro"]()}</p>
        <p>{translate["app2.content.ownItems"]()}</p>
        <ul>
          <li>{translate["app2.content.features.stateManagement"]()}</li>
          <li>{translate["app2.content.features.styling"]()}</li>
          <li>{translate["app2.content.features.dependencies"]()}</li>
          <li>{translate["app2.content.features.routing"]()}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
