import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import appStyles from "./App.css?inline"; // Import CSS as a string using Vite's ?inline query
// Import i18n instance directly
import { locales, setLocale } from "./paraglide/runtime";
// Explicitly import jsx-runtime to ensure it's bundled
import "react/jsx-runtime";

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
      // Always prioritize the lang attribute from the shell
      if (locales.includes(newValue)) {
        setLocale(newValue);
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

    // Set initial language
    const lang = this.getAttribute("lang");
    if (lang && locales.includes(lang)) {
      setLocale(lang);
    }
  }

  disconnectedCallback() {
    // Clean up React root when component is removed
    const container = this.shadowRoot?.getElementById("app2-root");
    if (container) {
      const root = ReactDOM.createRoot(container);
      root.unmount();
    }
  }
}

// Register custom element
if (!customElements.get("app2-element")) {
  customElements.define("app2-element", App2Element);
}

// Export for direct JavaScript imports
export { App2Element };
