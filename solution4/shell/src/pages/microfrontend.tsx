import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Tell TypeScript about our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'app1-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export function MicroFrontend() {
  const location = useLocation();

  // Load the web component script
  useEffect(() => {
    const loadWebComponent = async () => {
      try {
        // @ts-ignore - External URL import
        await import("http://localhost:5003/src/index.js");
        console.log("Web component script loaded");
      } catch (error) {
        console.error("Failed to load web component:", error);
      }
    };
    
    loadWebComponent();
  }, []);

  // When shell URL changes, notify the web component
  useEffect(() => {
    // Find the web component in the DOM
    const webComponent = document.querySelector('app1-element');
    if (webComponent) {
      console.log("Shell notifying web component of URL change:", location.search);
      
      // Dispatch our custom event to the web component
      webComponent.dispatchEvent(new CustomEvent('nuqs:urlchange', {
        bubbles: true,
        detail: { url: window.location.href }
      }));
    }
  }, [location.search]); // Depend on URL search params which include lang

  return (
    <app1-element />
  );
}
