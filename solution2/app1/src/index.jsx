import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import appStyles from './App.css?inline'; // Import CSS as a string using Vite's ?inline query

/**
 * Web Component Implementation
 * 
 * This code wraps our React application in a Web Component (Custom Element),
 * allowing it to be used in any HTML page using the <react-app> tag.
 * 
 * Benefits:
 * - Style encapsulation through Shadow DOM
 * - DOM isolation from the main document
 * - Easy integration with any framework or vanilla HTML
 */
class AppElement extends HTMLElement {
  connectedCallback() {
    // Create a shadow root to encapsulate our styles
    const shadowRoot = this.attachShadow({ mode: 'open' });
    
    // Create container for React
    const container = document.createElement('div');
    container.id = 'root'; // Add id='root' to match the CSS selector from App.css
    shadowRoot.appendChild(container);
    
    // Add isolated styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      ${appStyles} /* Add the imported CSS content */
    `;
    shadowRoot.appendChild(style);
    
    // Render React app into shadow DOM
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
  }
}

// Register custom element
if (!customElements.get('react-app')) {
  customElements.define('react-app', AppElement);
}

/**
 * Usage as a standard React application
 * 
 * To use this as a normal React app, uncomment the code below
 * and ensure you have a <div id="root"></div> in your HTML.
 */
/*
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
*/

// Export for direct JavaScript imports
export { AppElement };
