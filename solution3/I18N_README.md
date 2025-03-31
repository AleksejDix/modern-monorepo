# Translation System Documentation

## Overview

This document details the internationalization (i18n) implementation in our microfrontend architecture for an internal application used by workers from different parts of Switzerland. The system prioritizes user language preferences stored in localStorage over URL language codes to ensure consistent language experience even when sharing links.

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
    LS --> AD1
    URL --> AD1
    AD1 --> AC1[Apply Translation]

    %% App2 Language Detection
    A2[App2 Initialization] --> AD2[Language Detection]
    LS --> AD2
    URL --> AD2
    AD2 --> AC2[Apply Translation]

    %% Language Attribute
    S3 --> LA1[lang Attribute App1]
    S3 --> LA2[lang Attribute App2]
    LA1 -.-> AC1
    LA2 -.-> AC2

    %% Language Detection Priority
    subgraph "Language Detection Priority"
        direction TB
        P1[1. localStorage] --> P2[2. Browser Language] --> P3[3. URL Path] --> P4[4. lang Attribute] --> P5[5. Default (de)]
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

  // Save to localStorage - this is the user's preference
  localStorage.setItem("i18nextLng", lng);

  // Update URL
  navigate(`/${lng}${pathAfterLang}`);
};

// In $lang.tsx route
useEffect(() => {
  // Get stored language preference
  const storedLang = localStorage.getItem("i18nextLng");

  if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
    // Use stored language if available and supported
    if (i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  } else if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    // Fallback to URL language if no stored preference
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  }
}, [lang, i18n]);
```

### Microfrontends (App1, App2)

Each microfrontend implements a Web Component that prioritizes localStorage over other language sources:

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
      // Only change language if there's no localStorage preference
      const storedLang = localStorage.getItem("i18nextLng");

      if (
        !storedLang &&
        window.i18n &&
        SUPPORTED_LANGUAGES.includes(newValue)
      ) {
        window.i18n.changeLanguage(newValue);
      }
    }
  }

  connectedCallback() {
    // Initialize React app
    // ...

    // Only set initial language from attribute if no localStorage preference
    const storedLang = localStorage.getItem("i18nextLng");
    if (!storedLang) {
      const lang = this.getAttribute("lang");
      if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
        window.i18n.changeLanguage(lang);
      }
    }
  }
}

// i18n initialization
i18n.init({
  // ...
  detection: {
    order: ["localStorage", "navigator", "path"],
    lookupFromPathIndex: 0,
  },
});
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

- Example: `/en/app1` - URL has English language segment
- Example: `/fr/app2` - URL has French language segment

However, unlike typical i18n implementations, **the URL language is not given priority**. This means:

- If a German-speaking user receives a link with `/fr/app1`, they will still see the content in German
- The URL language is only used when the user has no stored language preference

This behavior is designed specifically for an internal application where workers from different language regions in Switzerland may share links with each other.

## Best Practices

1. **User Preference Priority**: localStorage language preference always takes precedence
2. **Consistent Experience**: Users always see content in their preferred language regardless of URL
3. **Isolated Translations**: Each application only contains translations relevant to its own functionality
4. **Centralized Language Selection**: Only the shell provides UI for language selection
5. **Graceful Fallbacks**: Multiple fallback levels from localStorage to browser preference to URL path to default language
