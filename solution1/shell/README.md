# Monomedi Shell Application

This is a shell application that uses Module Federation to host and integrate multiple micro-frontends. It allows independent development of applications that can be composed into a single cohesive user experience.

## Setup

To set up the project, run:

```bash
npm install
npm run dev
```

## Architecture

This application uses Vite's Module Federation plugin to create a micro-frontend architecture. The key components are:

- **Shell Application**: The main container that hosts and orchestrates different micro-frontends
- **Micro-frontends**: Independent applications that can be developed and deployed separately

## How to Add a New Micro-frontend

### 1. Create a new Vite React application

```bash
npm create vite@latest app1 -- --template react
cd app1
npm install
npm install @module-federation/vite --save-dev
```

### 2. Configure the micro-frontend's vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        // Expose any components that you want to make available to the shell
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001, // Use a different port for each micro-frontend
  },
});
```

### 3. Add the micro-frontend to the shell application

Update the shell's vite.config.js to include the new remote:

```javascript
// In the shell's vite.config.js
federation({
  name: "shell",
  remotes: {
    app1: "http://localhost:5001/assets/remoteEntry.js",
  },
  // ...
});
```

### 4. Create a component in the shell to load the micro-frontend

```javascript
// In the shell application
import { lazy } from 'react';

// Lazy load the remote app
const RemoteApp1 = lazy(() => import('app1/App'));

// Add the route in App.jsx
<Route path="/app1/*" element={<RemoteApp1 />} />

// Add the navigation link
<li><Link to="/app1">Application 1</Link></li>
```

## Development Process

1. Each team can develop their micro-frontend independently
2. The shell application integrates all micro-frontends through Module Federation
3. Teams can deploy their applications independently, and changes will be reflected in the shell

## Benefits

- **Independent Development**: Teams can work on different micro-frontends without affecting others
- **Independent Deployment**: Each micro-frontend can be deployed independently
- **Technology Flexibility**: Different micro-frontends can use different versions of libraries or even different frameworks
- **Scalability**: The application can easily scale as more teams and features are added
