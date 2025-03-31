import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


// In development mode, the app1 script is already injected by the Vite plugin
// In production mode, we need to load it manually
if (!import.meta.env.DEV) {
  const app1Url = import.meta.env.VITE_APP1_URL;
  
  // Create and append script for production
  const script = document.createElement('script');
  script.type = 'module';
  script.src = app1Url;
  document.head.appendChild(script);
}

// Render the shell app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
