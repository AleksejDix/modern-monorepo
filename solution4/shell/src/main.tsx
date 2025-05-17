import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

import { RouterProvider } from "react-router";

import { NuqsAdapter } from 'nuqs/adapters/react'

import { i18nShell } from "./i18n";
import { router } from "./router/router";
import { I18nextProvider } from "react-i18next";




const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18nShell}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
      </I18nextProvider>
    </StrictMode>
  );
}
