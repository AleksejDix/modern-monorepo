# Modern Micro Frontend Architecture (Solution 2)

This solution implements a modern micro frontend architecture without using Module Federation, focusing on:

1. Web Components with Shadow DOM for true CSS isolation
2. Import Maps for dynamic dependency loading
3. All applications built with React
4. Custom events for cross-micro-frontend communication

## Architecture Overview

```
┌─────────────────────────────────────┐
│              Shell App              │
│                                     │
│  ┌─────────────┐   ┌─────────────┐  │
│  │    App1     │   │    App2     │  │
│  │ (Dashboard) │   │ (Settings)  │  │
│  │             │   │             │  │
│  │ <dashboard- │   │ <settings-  │  │
│  │  element>   │   │  element>   │  │
│  └─────────────┘   └─────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

- **Shell**: Container application that handles routing and composition (React)
- **App1**: Dashboard micro frontend (React wrapped in Web Component)
- **App2**: Settings micro frontend (React wrapped in Web Component)

## Key Benefits Over Module Federation

1. **Native Browser Features**: Utilizes standard web platform features (Web Components, Shadow DOM, Import Maps)
2. **Better CSS Isolation**: Shadow DOM provides true CSS isolation without leakage
3. **Independent Deployment**: Each micro frontend can be deployed without rebuilding others
4. **No Version Conflicts**: No shared runtime dependencies that could conflict
5. **Framework Agnostic**: Each team could choose different frameworks internally if needed

## Implementation Details

### Web Components

Each micro frontend is wrapped in a Web Component custom element:

```javascript
// Example: app1/src/dashboard-element.jsx
class DashboardElement extends HTMLElement {
  constructor() {
    super();
    // Create shadow DOM for CSS isolation
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.shadowRoot.appendChild(mountPoint);

    // Add styles that stay completely isolated
    const style = document.createElement("style");
    style.textContent = `/* Styles for this component only */`;
    this.shadowRoot.appendChild(style);

    // Mount React in Shadow DOM
    const root = ReactDOM.createRoot(mountPoint);
    root.render(<Dashboard />);
  }
}
customElements.define("dashboard-element", DashboardElement);
```

### Import Maps

We use Import Maps to load dependencies from CDNs:

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom": "https://esm.sh/react-dom@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
    }
  }
</script>
```

### Shadow DOM for CSS Isolation

Shadow DOM provides true encapsulation of CSS. Styles defined in one micro frontend cannot leak to other micro frontends or the shell:

```javascript
// Each micro frontend has its own isolated styles
const style = document.createElement("style");
style.textContent = `
  h1 { color: red; }
  .dashboard { background: lightblue; }
`;
this.shadowRoot.appendChild(style);
```

### Cross-Micro-Frontend Communication

Communication between micro frontends happens through custom events:

```javascript
// Dashboard micro frontend dispatching an event
const event = new CustomEvent("dashboard-action", {
  bubbles: true,
  composed: true, // Allows the event to pass through shadow DOM boundary
  detail: { message: "Dashboard action triggered", count: 5 },
});
window.dispatchEvent(event);

// Shell listening for the event
window.addEventListener("dashboard-action", (event) => {
  console.log("Received from dashboard:", event.detail);
});
```

## Getting Started

1. Navigate to each directory (shell, app1, app2)
2. Run `npm install` to install dependencies
3. Run `npm start` to start development servers:
   - Shell: http://localhost:8080
   - App1: http://localhost:5001
   - App2: http://localhost:5002

## Comparison with Solution 1 (Module Federation)

| Feature             | Solution 1 (Module Federation) | Solution 2 (Web Components) |
| ------------------- | ------------------------------ | --------------------------- |
| CSS Isolation       | Limited (can leak)             | Complete (Shadow DOM)       |
| Framework Support   | Tied to webpack/bundler        | Native browser standard     |
| Dependency Sharing  | At bundle time                 | At runtime via Import Maps  |
| Application Loading | JavaScript imports             | HTML custom elements        |
| Browser Support     | Requires polyfills             | Modern browsers natively    |
| Build Complexity    | More complex                   | Simpler                     |
