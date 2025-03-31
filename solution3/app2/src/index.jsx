import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import appStyles from "./App.css?inline"; // Import CSS as a string using Vite's ?inline query
// Import i18n instance
import "./i18n";
// Explicitly import jsx-runtime to ensure it's properly bundled
import "react/jsx-runtime";
import { SUPPORTED_LANGUAGES } from "./i18n";

/**
 * Web Component Implementation for App2
 */
class App2Element extends HTMLElement {
  // Define observed attributes
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    // Create shadow root for style isolation
    this.attachShadow({ mode: "open" });
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "lang" && oldValue !== newValue && newValue) {
      // Only change language if there's no localStorage preference
      const storedLang = localStorage.getItem("i18nextLng");

      if (
        !storedLang &&
        window.i18n &&
        SUPPORTED_LANGUAGES.includes(newValue)
      ) {
        window.i18n.changeLanguage(newValue);
      }
    }
  }

  connectedCallback() {
    console.log("App2Element connected");

    // Create container for React
    const container = document.createElement("div");
    container.id = "app2-root";
    this.shadowRoot.appendChild(container);

    // Add isolated styles
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      ${appStyles}
    `;
    this.shadowRoot.appendChild(style);

    // Render React app into shadow DOM
    const root = ReactDOM.createRoot(container);
    root.render(<App />);

    // Only set initial language from attribute if no localStorage preference
    const storedLang = localStorage.getItem("i18nextLng");
    if (!storedLang) {
      const lang = this.getAttribute("lang");
      if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
        window.i18n.changeLanguage(lang);
      }
    }
  }
}

// Register custom element
if (!customElements.get("app2-element")) {
  customElements.define("app2-element", App2Element);
}

// Export for direct JavaScript imports
export { App2Element };
