import "./i18n"; // Import and initialize i18n

/**
 * Utility functions for microfrontend shell application
 */

// Check if a custom element is registered
export const isCustomElementDefined = (elementName: string): boolean => {
  return !!customElements.get(elementName);
};

// Create a helper to safely load microfrontends
export const waitForCustomElement = (
  elementName: string,
  timeoutMs: number = 5000
): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check immediately first
    if (isCustomElementDefined(elementName)) {
      resolve(true);
      return;
    }

    // Set up interval to periodically check
    const interval = setInterval(() => {
      if (isCustomElementDefined(elementName)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(true);
      }
    }, 100);

    // Set up timeout to avoid waiting forever
    const timeout = setTimeout(() => {
      clearInterval(interval);
      resolve(false);
    }, timeoutMs);
  });
};

// Export any other utility functions here
