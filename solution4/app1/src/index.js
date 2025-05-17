import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

class App1Element extends HTMLElement {
  constructor() {
    super();
    this.root = null;
    // Don't try to bind the method before it exists
  }

  connectedCallback() {
    const container = document.createElement("div");
    container.id = "app1-root";
    this.appendChild(container);

    // Define the URL change handler as a proper method
    this.urlChangeHandler = () => {
      // Dispatch a custom event that nuqs can be configured to listen to
      const urlChangeEvent = new CustomEvent('nuqs:urlchange', {
        bubbles: true,
        detail: { url: window.location.href }
      });
      this.dispatchEvent(urlChangeEvent);
    };
    
    // Listen for all possible URL change events
    window.addEventListener('popstate', this.urlChangeHandler);
    window.addEventListener('hashchange', this.urlChangeHandler);
    
    // Initial URL sync
    setTimeout(this.urlChangeHandler, 0);

    this.root = ReactDOM.createRoot(container);
    this.root.render(React.createElement(App));
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.urlChangeHandler);
    window.removeEventListener('hashchange', this.urlChangeHandler);
    
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

if (!customElements.get("app1-element")) {
  customElements.define("app1-element", App1Element);
}

export { App1Element };
