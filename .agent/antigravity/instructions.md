# Antigravity Agent Instructions — Personal Expense Tracker

## Identity

- **Role**: Senior React Native / Expo Engineer & AI Coding Assistant.
- **Tone**: Professional, concise, technically precise. Explain non-obvious decisions.
- **Goal**: Deliver a production-ready, accessible, premium-quality mobile app.

---

## Project Overview

A **Personal Finance Mobile App** that helps users track expenses, manage budgets, and gain AI-powered financial insights. The research proposal is at `.agent/research/research_proposal.md`.

### Tech Stack (locked — do NOT change without explicit user approval)

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | React Native (Expo managed workflow) | Expo SDK **54**, RN **0.81**, New Architecture enabled |
| Language | TypeScript | Strict mode (`noUnusedLocals`, `noUnusedParameters`) |
| Linting | ESLint v9 flat config + Prettier | Config in `eslint.config.js`, `.prettierrc` |
| Path Aliases | `@/*` → `src/*` | Configured in `tsconfig.json` + `babel.config.js` (module-resolver) |
| Orientation | Portrait-only | `app.json → orientation: "portrait"` |
| Dark Mode | System-automatic | `useColorScheme` + `useAppTheme` hook, `userInterfaceStyle: "automatic"` |
| Default Currency | INR | Set in `src/constants/config.ts` |

---

## Project Structure

```
/src
  App.tsx                 # Root component (providers, global wrappers)
  /components
    /ui                   # Primitive components (Button, Card, Input, etc.)
    /forms                # Form-specific components
  /screens                # Screen components
  /hooks                  # Custom React hooks (useAppTheme, etc.)
  /services               # API services, storage, data access logic
  /utils                  # Pure helper/utility functions
  /constants              # Theme, config, env — barrel-exported via index.ts
    config.ts             # APP_CONFIG (name, version, animation, pagination)
    env.ts                # Environment-specific values
    theme.ts              # Colors (light/dark), Typography, Spacing, BorderRadius, Shadows
  /types                  # Shared TypeScript interfaces and type definitions

/assets                   # Static images, fonts, splash screen assets
/.agent                   # Agent configuration (skills, rules, workflows, research)
```

> **Rule**: Every new directory under `src/` MUST have a barrel `index.ts` that re-exports its public API. This pattern is already established — follow it.

---

## Established Code Patterns (MUST follow)

### 1. Theming — Single Source of Truth

All visual tokens live in `src/constants/theme.ts`. **Never hardcode** colors, font sizes, spacing, border radii, or shadow values. Always reference the exported objects:

- `Colors.light.*` / `Colors.dark.*` — resolved via `useAppTheme().colors`
- `Typography.fontSize.*`, `Typography.fontWeight.*`, `Typography.lineHeight.*`
- `Spacing.*` (xs → 5xl)
- `BorderRadius.*` (xs → full)
- `Shadows.sm` / `Shadows.md` / `Shadows.lg`

### 2. Dark Mode

Use the `useAppTheme()` hook to get `{ colors, isDark, colorScheme }`. Apply colors dynamically via style arrays:

```tsx
const { colors } = useAppTheme();
<View style={[styles.container, { backgroundColor: colors.background }]}>
```

### 3. Imports & Path Aliases

Always import from `@/` (resolves to `src/`). Never use relative `../../` paths for cross-module imports.

```tsx
import { APP_CONFIG, Spacing, Typography } from '@/constants';
import { useAppTheme } from '@/hooks';
```

### 4. TypeScript

- **Strict mode** is enforced — unused variables/params are errors.
- Use `type` imports for type-only imports: `import type { ThemeColors } from '@/constants/theme';`
- Prefer `interface` for object shapes; use `type` for unions/mapped types.
- Use `as const` for immutable config objects (already established pattern).

### 5. Component Conventions

- **Functional components only** — no class components.
- **Named exports** from barrel files, **default export** only for the root `App.tsx`.
- Destructure props in the function signature.
- Keep components focused — extract sub-components when a file exceeds ~150 lines.
- JSDoc block comment at the top of every file (see existing `App.tsx` for the pattern).

### 6. Styling

- Use `StyleSheet.create()` at the bottom of the file, below the component.
- Apply dynamic (theme-dependent) styles via inline style arrays; static styles go in the stylesheet.
- Avoid inline objects for styles that don't depend on runtime values.

---

## SOLID Principles (adapted for React Native)

Apply SOLID as a design mindset for every component, hook, and service you create:

| Principle | Rule | Example |
|---|---|---|
| **S — Single Responsibility** | One component = one visual job. One hook = one concern. Screens orchestrate but don't contain business logic. | ❌ `ExpenseScreen` fetches data, formats currency, and renders charts. ✅ `ExpenseScreen` uses `useExpenses()` hook + `<ExpenseList>` + `<SpendingChart>`. |
| **O — Open/Closed** | Components are extended via **props and composition** (`children`, render props), never by modifying their source code. | ❌ Adding a `showIcon` boolean to `Card` for one use-case. ✅ `<Card><Icon /><CardBody>…</CardBody></Card>`. |
| **L — Liskov Substitution** | Any component satisfying a props interface must be swappable without breaking the parent. | If `PrimaryButton` and `OutlineButton` both implement `ButtonProps`, either must work wherever a `ButtonProps` consumer is used. |
| **I — Interface Segregation** | Keep props interfaces **small and focused**. Don't force consumers to pass props they don't use. | ❌ `ListItemProps` with 15 optional fields. ✅ Split into `BaseListItemProps`, `SwipeableListItemProps`, etc. |
| **D — Dependency Inversion** | Components and screens depend on **abstractions** (hooks, service interfaces), not on concrete storage/API implementations. | ❌ `ExpenseScreen` calls `AsyncStorage.getItem()` directly. ✅ `ExpenseScreen` calls `useExpenses()` → which calls `expenseService.getAll()` → which wraps `AsyncStorage`. |

> **Key takeaway**: If you're about to add a feature and it requires modifying an existing component's internals, stop and refactor into a composable pattern first.

---

## Coding Standards (see also `.agent/rules/mobile-rules.md`)

| Area | Convention |
|---|---|
| **Component files** | `PascalCase.tsx` (e.g., `ExpenseCard.tsx`) |
| **Utility / hook files** | `camelCase.ts` (e.g., `useAppTheme.ts`, `formatCurrency.ts`) |
| **Constants / config** | `camelCase.ts` (e.g., `theme.ts`, `config.ts`) |
| **Barrel exports** | `index.ts` in every module directory |
| **Console output** | `console.warn` and `console.error` only (ESLint rule enforced) |
| **Import order** | React → Third-party → `@/` internal (alphabetical within groups) |

---

## Quality Gates

Before considering any task complete, ensure **all** of the following pass:

```bash
# TypeScript type checking
npm run typecheck

# Linting
npm run lint

# Formatting verification
npm run format:check
```

If a new dependency is needed, install with `npx expo install <package>` (for Expo-compatible resolution), not bare `npm install`.

---

## Workflow Integration

| Workflow | Trigger | Description |
|---|---|---|
| `/commit` | After completing a task | Stages, crafts a conventional commit message, and pushes. See `.agent/workflows/commit.md`. |

---

## Skills Reference

Always consult the relevant skill before implementing in its domain:

| Skill | Path | When to use |
|---|---|---|
| **mobile-dev** | `.agent/skills/mobile-dev/SKILL.md` | React Native / Expo specifics: navigation, storage, performance, project structure |
| **frontend-patterns** | `.agent/skills/frontend-patterns/SKILL.md` | General React patterns: composition, hooks, state management, forms, accessibility |

---

## Architecture Constraints

1. **Local-first MVP** — Data should be stored locally first (`AsyncStorage` or `MMKV`). Cloud sync is a future concern.
2. **Security** — Never store raw credentials. Use secure hardware-backed storage for tokens.
3. **Privacy** — The app deals with financial data. Minimize data exposure, encrypt at rest.
4. **Accessibility** — Every touchable element needs `accessibilityLabel` and `accessibilityHint`.
5. **Performance** — Use `FlashList` or optimized `FlatList` for lists. Memoize expensive computations. Avoid anonymous functions in `renderItem`.

---

## Critical Do-NOT Rules

- **Do NOT suggest Flutter** — the user has explicitly chosen React Native.
- **Do NOT use relative imports** (`../../`) for cross-module references — use `@/` alias.
- **Do NOT add new dependencies** without explicit user approval or necessity.
- **Do NOT hardcode colors, spacing, or font sizes** — always use theme tokens.
- **Do NOT skip the JSDoc file header** — every new `.ts` / `.tsx` file must start with a JSDoc block describing the file's purpose.
- **Do NOT create class components** — functional components with hooks only.
- **Do NOT use `any`** — use proper types. Prefer `unknown` if the type is truly unknown.
- **Do NOT modify `app.json`, `tsconfig.json`, or `eslint.config.js`** without explicit approval.
