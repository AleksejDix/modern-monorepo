import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import appStyles from './App.css?inline'; // Import CSS as a string using Vite's ?inline query

/**
 * Web Component Implementation for App1
 */
class App1Element extends HTMLElement {
  constructor() {
    super();
    // Create shadow root for style isolation
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('App1Element connected');
    
    // Create container for React
    const container = document.createElement('div');
    container.id = 'app1-root';
    this.shadowRoot.appendChild(container);
    
    // Add isolated styles
    const style = document.createElement('style');
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
  }
}

// Register custom element
if (!customElements.get('app1-element')) {
  customElements.define('app1-element', App1Element);
}

// Export for direct JavaScript imports
export { App1Element };
