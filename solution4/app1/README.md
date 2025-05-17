# React App with Web Component Support

This project demonstrates how to create a React application that can be used in two ways:

1. As a Web Component (Custom Element)
2. As a standard React application

## Overview

This application is built using React and Vite, but with a special setup that allows it to be embedded in any HTML page as a custom element (`<react-app>`). This makes it perfect for micro-frontend architectures or for embedding React components in non-React applications.

## How It Works

### Web Component Implementation

The application is wrapped in a Web Component using the Custom Elements API:

```javascript
class AppElement extends HTMLElement {
  connectedCallback() {
    // Create Shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Mount React in the Shadow DOM
    const container = document.createElement("div");
    shadowRoot.appendChild(container);

    // Add styles to Shadow DOM
    const style = document.createElement("style");
    // ... styles ...
    shadowRoot.appendChild(style);

    // Render React component
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
  }
}

// Register the custom element
customElements.define("react-app", AppElement);
```

This setup provides several benefits:

- **Style Encapsulation**: The Shadow DOM isolates CSS styles from the rest of the page
- **DOM Encapsulation**: The component's DOM is isolated from the main document
- **Easy Integration**: The component can be used with a simple HTML tag

### Using as a Web Component

To use this application as a web component in any HTML page:

1. Include the built JavaScript bundle:

   ```html
   <script type="module" src="path/to/app1/dist/assets/index.js"></script>
   ```

2. Add import maps for external dependencies:

   ```html
   <script type="importmap">
     {
       "imports": {
         "react": "https://esm.sh/react@18.2.0",
         "react-dom": "https://esm.sh/react-dom@18.2.0",
         "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
         "react/jsx-runtime": "https://esm.sh/react@18.2.0/jsx-runtime"
       }
     }
   </script>
   ```

3. Use the custom element anywhere in your HTML:
   ```html
   <react-app></react-app>
   ```

**Note**: The bundle filename is static (no hashes in the filename) to ensure consistent imports from other applications. Additionally, React and ReactDOM are marked as external dependencies to reduce bundle size and allow multiple components to share the same React instance.

### Using as a Standard React App

To use this application as a standard React app, you would need to modify the code slightly:

1. Add back the standard React mounting code in `main.jsx`:

   ```javascript
   // Standard React mounting
   const rootElement = document.getElementById("root");
   if (rootElement) {
     ReactDOM.createRoot(rootElement).render(
       <React.StrictMode>
         <App />
       </React.StrictMode>
     );
   }
   ```

2. Make sure you have a `<div id="root"></div>` in your HTML where the app will mount.

## Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The build process creates files optimized for both web component usage and standard React usage.

## Integration Examples

### In HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web Component Demo</title>
    <!-- Import maps for external dependencies -->
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@18.2.0",
          "react-dom": "https://esm.sh/react-dom@18.2.0",
          "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
          "react/jsx-runtime": "https://esm.sh/react@18.2.0/jsx-runtime"
        }
      }
    </script>
    <!-- Import the web component -->
    <script type="module" src="path/to/app1/dist/assets/index.js"></script>
  </head>
  <body>
    <h1>My App</h1>
    <react-app></react-app>
  </body>
</html>
```

### In React

```jsx
// You need to ensure import maps are added to your HTML file

// Import the web component (this will self-register the custom element)
import "path/to/app1/dist/assets/index.js";

function ParentApp() {
  return (
    <div>
      <h1>Parent React App</h1>
      {/* Use the web component in React */}
      <react-app></react-app>
    </div>
  );
}
```

### In Angular

```typescript
// You need to ensure import maps are added to your index.html

// app.component.ts
@Component({
  selector: "app-root",
  template: `
    <h1>Angular App</h1>
    <react-app></react-app>
  `,
})
export class AppComponent {}

// Import the web component in your main.ts or a suitable module
import "path/to/app1/dist/assets/index.js";
```

### In Vue

```vue
<!-- You need to ensure import maps are added to your index.html -->

<template>
  <div>
    <h1>Vue App</h1>
    <react-app></react-app>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // Import the web component if not already imported elsewhere
    import("path/to/app1/dist/assets/index.js");
  },
};
</script>
```

## Technical Details

### Shadow DOM

The application uses Shadow DOM to encapsulate styles and DOM elements. This prevents CSS conflicts with the host application and keeps the DOM structure clean.

### React Integration

React is mounted inside the Shadow DOM, which is not a typical setup. This requires special consideration for events and styles.

### Styling

Styles are defined directly in the Web Component using a `<style>` element injected into the Shadow DOM. This provides complete style isolation from the host application.

### External Dependencies

This application treats React and ReactDOM as external dependencies, which provides several advantages:

1. **Smaller bundle size**: The React libraries aren't included in the final bundle
2. **Shared instances**: Multiple micro-frontends can share the same React instance
3. **Version consistency**: All components use the same React version
4. **Caching benefits**: External dependencies can be cached by the browser

The external dependencies are resolved using import maps, which map bare module specifiers to URLs:

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom": "https://esm.sh/react-dom@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
      "react/jsx-runtime": "https://esm.sh/react@18.2.0/jsx-runtime"
    }
  }
</script>
```

For production, you may want to host these dependencies on your own CDN rather than relying on external services like esm.sh.

## Known Limitations

1. Events from the React component that need to bubble up to the host application need to be re-dispatched as custom events.
2. The Shadow DOM boundary can affect certain browser APIs and third-party libraries.
3. Font loading and global styles from the host page don't affect the component unless specifically passed through.

## License

MIT
