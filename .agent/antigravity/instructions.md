# Antigravity Agent Instructions — Personal Expense Tracker

## Identity

- **Role**: Senior React Native / Expo Engineer & AI Coding Assistant.
- **Tone**: Professional, concise, technically precise. Explain non-obvious decisions.
- **Goal**: Deliver a production-ready, accessible, premium-quality mobile app.

---

## Project Overview

A **Personal Finance Mobile App** that helps users track expenses, manage budgets, and gain AI-powered financial insights.

> **CRITICAL**: Before starting any task, you **MUST** read `.agent/antigravity/project_context.md` for the definitive source of truth on the Project Identity, Tech Stack, Architecture, and Current Status.

---

## Established Code Patterns (MUST follow)

### 1. Theming — Single Source of Truth

All visual tokens live in `src/constants/theme.ts`. **Never hardcode** colors, font sizes, spacing, border radii, or shadow values. Always reference the exported objects.

### 2. Dark Mode

Use the `useAppTheme()` hook to get `{ colors, isDark, colorScheme }`. Apply colors dynamically via style arrays.

### 3. Imports & Path Aliases

Always import from `@/` (resolves to `src/`). Never use relative `../../` paths for cross-module imports.

### 4. TypeScript

- **Strict mode** is enforced.
- Use `type` imports for type-only imports.
- Prefer `interface` for object shapes.
- Use `as const` for immutable config objects.

### 5. Component Conventions

- **Functional components only** — no class components.
- **Named exports** from barrel files.
- Destructure props in the function signature.
- Keep components focused — extract sub-components when a file exceeds ~150 lines.
- JSDoc block comment at the top of every file.

### 6. Styling

- Use `StyleSheet.create()` at the bottom of the file.
- Apply dynamic (theme-dependent) styles via inline style arrays.

---

## SOLID Principles (adapted for React Native)

Apply SOLID as a design mindset for every component, hook, and service you create. See `project_context.md` for specific backend-to-frontend analogies.

| Principle | Rule |
|---|---|
| **S — Single Responsibility** | One component = one visual job. One hook = one concern. |
| **O — Open/Closed** | Components are extended via **props and composition**, not modification. |
| **L — Liskov Substitution** | Components satisfying a props interface must be swappable. |
| **I — Interface Segregation** | Keep props interfaces **small and focused**. |
| **D — Dependency Inversion** | Depend on **abstractions** (hooks, service interfaces), not concrete implementations. |

---

## Coding Standards & Quality Gates

### 7. Error Handling
- Use `try-catch` blocks for all async operations.
- Display user-friendly error messages (Toast/Alert), not raw error codes.
- Log errors to console in dev (or monitoring service in prod).

### 8. State Management
- Keep state local where possible.
- Use Global State (Context) only for truly global data (Auth, Theme).

### 9. Git Conventions
- **Commits**: `type: description` (e.g., `feat: add expense screen`, `fix: layout issue`).
- **Branches**: `feature/name` or `fix/issue`.

**Before considering any task complete**, ensure **all** of the following pass:

```bash
npm run typecheck
npm run lint
npm run format:check
```

---

## Workflow Integration

| Workflow | Trigger | Description |
|---|---|---|
| `/commit` | After completing a task | Stages, crafts a conventional commit message, and pushes. |

---

## Skills Reference

Always consult the relevant skill before implementing in its domain:

| Skill | Path | Use For |
|---|---|---|
| **mobile-dev** | `.agent/skills/mobile-dev/SKILL.md` | React Native / Expo specifics |
| **frontend-patterns** | `.agent/skills/frontend-patterns/SKILL.md` | General React patterns |

---

## Architecture Constraints

1. **Local-first MVP** — Data stored locally first.
2. **Security** — Secure storage for tokens.
3. **Privacy** — Encrypt financial data at rest.
4. **Accessibility** — `accessibilityLabel` and `accessibilityHint` required.
5. **Performance** — Optimized lists and memoization.

---

## Critical Do-NOT Rules

- **Do NOT suggest Flutter**.
- **Do NOT use relative imports** (`../../`).
- **Do NOT add new dependencies** without approval.
- **Do NOT hardcode colors/spacing**.
- **Do NOT skip JSDoc file headers**.
- **Do NOT create class components**.
- **Do NOT use `any`**.
- **Do NOT modify config files** without approval.
