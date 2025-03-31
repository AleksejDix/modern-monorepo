import "./i18n"; // Import and initialize i18n

/**
 * Utility function to load a microfrontend dynamically
 */
export const loadMicrofrontend = (name: string): void => {
  console.log(`Loading microfrontend: ${name}`);

  const scriptId = `${name}-script`;

  // Skip if already loaded
  if (document.getElementById(scriptId)) {
    console.log(`${name} already loaded`);
    return;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.id = scriptId;

  // In development, load from the development server
  // In production, load from the deployed URL
  const baseUrl = import.meta.env.DEV
    ? `http://localhost:${name === "app1" ? "5003" : "5004"}`
    : (import.meta.env[
        `VITE_${name.toUpperCase()}_URL` as keyof ImportMetaEnv
      ] as string);

  script.src = `${baseUrl}/src/index.js`;

  console.log(`Inserting script for ${name}: ${script.src}`);
  document.head.appendChild(script);
};
