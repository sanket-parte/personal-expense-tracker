# Project Context: Personal Expense Tracker

This document is the **Single Source of Truth** for the project's identity, technical stack, architecture, and current status. All AI agents **MUST** align with the information herein.

## 1. Project Identity
-   **Name**: Personal Expense Tracker
-   **Core Purpose**: A mobile application to help users track expenses, manage budgets, and visualize financial habits.
-   **Primary User**: Individuals seeking to improve financial discipline.
-   **Key Goal**: Deliver a production-ready, accessible, premium-quality mobile app.

## 2. Technology Stack (Locked)
This stack is definitive. Do not change without explicit user approval.

| Layer | Technology | Version / Notes |
|---|---|---|
| **Framework** | React Native (Expo managed workflow) | Expo SDK **54**, RN **0.81**, New Architecture enabled |
| **Language** | TypeScript | Strict mode (`noUnusedLocals`, `noUnusedParameters`) |
| **Linting** | ESLint v9 flat config + Prettier | Config in `eslint.config.js`, `.prettierrc` |
| **Path Aliases** | `@/*` → `src/*` | Configured in `tsconfig.json` + `babel.config.js` |
| **Orientation** | Portrait-only | `app.json` |
| **Dark Mode** | System-automatic | `useColorScheme` + `useAppTheme` hook |
| **Default Currency** | INR | `src/constants/config.ts` |

## 3. Architecture & Project Structure
The project follows a modular, separation-of-concerns architecture.

### Directory Map
```
/src
  App.tsx                 # Root component (providers, global wrappers)
  /components
    /ui                   # Primitive components (Button, Card, Input)
    /forms                # Form-specific components
  /screens                # Screen components (Full-page views)
  /hooks                  # Custom React hooks (Logic extraction)
  /services               # API services, storage, data access logic
  /utils                  # Pure helper/utility functions
  /constants              # Theme, config, env — barrel-exported via index.ts
  /types                  # Shared TypeScript interfaces and type definitions
```
**Rule**: Every new directory under `src/` MUST have a barrel `index.ts` that re-exports its public API.

## 4. Coding Conventions & Patterns
-   **Functional Components**: Use `React.FC` or explicit return types `React.JSX.Element`.
-   **Styles**:
    -   Co-located with components using `StyleSheet.create`.
    -   Use `Spacing`, `Typography`, `BorderRadius`, and dynamic `colors` from the theme hook.
    -   DO NOT hardcode hex values in components; use the theme.
-   **Imports**: Use absolute imports via `tsconfig` aliases (e.g., `@/components/...`).
-   **Experts**: Use named exports.
-   **Strict Typing**: Avoid `any`. Define interfaces in `src/types` or co-locate if specific to a component.

## 5. Agent Instructions (Contextual)
-   **Backend Alignment**: The user is a backend specialist. Explain frontend concepts using backend analogies (e.g., Hooks = Mixins/Decorators, Context = Dependency Injection).
-   **Check Before Creating**: Before creating a new UI element, check `src/components/ui`.
-   **Respect the Theme**: Always use `useAppTheme()` to ensure dark mode compatibility.

## 6. Current Implementation Status
-   **Completed**:
    -   Project Initialization (Expo, TypeScript).
    -   Theming System Foundation.
    -   Basic Folder Structure.
-   **In Progress / Next Steps**:
    -   Navigation Setup.
    -   Core Screens Implementation.
    -   State Management Setup.
