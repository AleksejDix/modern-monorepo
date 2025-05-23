import React from "react";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";
import { I18nextProvider } from 'react-i18next';
import { i18nApp1 } from "./i18n";
import { useLanguageObserver } from "./components/LanguageObserver";

export function App() {

  useLanguageObserver();
  
  return (
    <I18nextProvider i18n={i18nApp1}>
      <NuqsAdapter>
        <RouterProvider router={router} />;
      </NuqsAdapter>
    </I18nextProvider>
  );
}