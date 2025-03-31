# Translation System Documentation

## Overview

This document details the internationalization (i18n) implementation in our microfrontend architecture. The system uses URL-based language detection with localStorage as a fallback, and passes the current language as a web component attribute for direct synchronization between the shell and microfrontends.

## Current Languages

| Language Code | Language Name | Status    |
| ------------- | ------------- | --------- |
| de            | German        | Default   |
| en            | English       | Supported |
| fr            | French        | Supported |
| it            | Italian       | Supported |
| ru            | Russian       | Supported |

## Translation Flow Diagram

```mermaid
flowchart TD
    %% Shell Application Nodes
    S1[Shell Application] --> S2[Language Selector UI]
    S2 --> S3[Change Language]
    S3 --> S4[Update URL Path]
    S3 --> S5[Store in localStorage]

    %% URL and Shared State
    S4 --> URL["/language/path"]
    S5 --> LS[localStorage]

    %% App1 Language Detection
    A1[App1 Initialization] --> AD1[Language Detection]
    URL --> AD1
    LS --> AD1
    AD1 --> AC1[Apply Translation]

    %% App2 Language Detection
    A2[App2 Initialization] --> AD2[Language Detection]
    URL --> AD2
    LS --> AD2
    AD2 --> AC2[Apply Translation]

    %% Language Attribute
    S3 --> LA1[lang Attribute App1]
    S3 --> LA2[lang Attribute App2]
    LA1 --> AC1
    LA2 --> AC2

    %% Language Detection Priority
    subgraph "Language Detection Priority"
        direction TB
        P1[1. lang Attribute] --> P2[2. URL Path] --> P3[3. localStorage] --> P4[4. Browser Language] --> P5[5. Default (de)]
    end

    %% Styles
    classDef shell fill:#f9f,stroke:#333,stroke-width:2px
    classDef app1 fill:#bbf,stroke:#333,stroke-width:2px
    classDef app2 fill:#bfb,stroke:#333,stroke-width:2px
    classDef priority fill:#ffb,stroke:#333,stroke-width:2px
    classDef shared fill:#ddd,stroke:#333,stroke-width:2px
    classDef attribute fill:#afa,stroke:#333,stroke-width:2px

    class S1,S2,S3,S4,S5 shell
    class A1,AD1,AC1 app1
    class A2,AD2,AC2 app2
    class P1,P2,P3,P4,P5 priority
    class URL,LS shared
    class LA1,LA2 attribute
```

## Implementation Details

### Shell Application

The Shell manages the language selection and updates the URL:

```typescript
// In LanguageSelector.tsx
const switchLanguage = (lng: string): void => {
  // Change language in i18n
  i18n.changeLanguage(lng);

  // Save to localStorage
  localStorage.setItem("i18nextLng", lng);

  // Update URL
  navigate(`/${lng}${pathAfterLang}`);
};

// In DynamicAppPage.tsx - passing language to microfrontends
function DynamicAppPage() {
  const { appId, lang } = Route.useParams();
  const { i18n } = useTranslation();

  // Create element with lang attribute
  return React.createElement(`${appId}-element`, {
    lang: lang || i18n.language,
  });
}
```

### Microfrontends (App1, App2)

Each microfrontend implements a Web Component that observes language changes via the `lang` attribute:

```javascript
// Web Component implementation
class App1Element extends HTMLElement {
  // Define observed attributes
  static get observedAttributes() {
    return ["lang"];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "lang" && oldValue !== newValue && newValue) {
      // Change language when attribute changes
      if (window.i18n && SUPPORTED_LANGUAGES.includes(newValue)) {
        window.i18n.changeLanguage(newValue);
      }
    }
  }

  connectedCallback() {
    // Initialize React app
    // ...

    // Set initial language if attribute is present
    const lang = this.getAttribute("lang");
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      window.i18n.changeLanguage(lang);
    }
  }
}

// Register custom element
customElements.define("app1-element", App1Element);
```

## Translation Files Structure

Each application maintains its own translation files:

```
shell/src/locales/
├── de.json
├── en.json
├── fr.json
├── it.json
└── ru.json

app1/src/locales/
├── de.json
├── en.json
├── fr.json
├── it.json
└── ru.json

app2/src/locales/
├── de.json
├── en.json
├── fr.json
├── it.json
└── ru.json
```

## URL Language Handling

URL structure follows the pattern:

```
/{language}/{route}
```

- Example: `/en/app1` - English version of App1
- Example: `/de/app2` - German version of App2

When a URL with an unsupported language code is accessed, the application returns a 404 error.

## Web Component Attribute Synchronization

The application uses the standard Web Component attribute system for passing the current language:

1. Shell sets the `lang` attribute on the microfrontend Web Components
2. Microfrontends observe changes to this attribute via `observedAttributes` and `attributeChangedCallback`
3. When the attribute changes, the microfrontend updates its internal language setting
4. This provides real-time language updates without needing custom events or page reloads

## Best Practices

1. **Attribute-based Communication**: Using standard Web Component attributes for passing language information
2. **Isolated Translations**: Each application only contains translations relevant to its own functionality
3. **Centralized Language Selection**: Only the shell provides UI for language selection
4. **URL for Deep Linking**: URL structure preserves language preference in shareable links
5. **Graceful Fallbacks**: Multiple fallback levels from attribute to URL to localStorage to browser preference to default language
