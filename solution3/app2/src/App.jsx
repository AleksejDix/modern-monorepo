import React, { useState, useEffect } from "react";

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
      <h1>App 2 Dashboard</h1>
      <div className="controls">
        <button onClick={handleClick}>Count: {count}</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="content">
        <p>This is a completely independent microfrontend.</p>
        <p>It has its own:</p>
        <ul>
          <li>State management</li>
          <li>Styling (isolated by Shadow DOM)</li>
          <li>Dependencies</li>
          <li>Routing (if needed)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
