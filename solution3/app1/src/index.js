import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class App1Element extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const container = document.createElement("div");
    container.id = "app1-root";
    this.appendChild(container);

    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App));
  }

  disconnectedCallback() {
    const container = this.querySelector("#app1-root");
    if (container) {
      const root = ReactDOM.createRoot(container);
      root.unmount();
    }
  }
}

if (!customElements.get("app1-element")) {
  customElements.define("app1-element", App1Element);
}

export { App1Element };
