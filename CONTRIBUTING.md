# Contributing to Personal Expense Tracker

Thank you for your interest in contributing! This document outlines the standards and workflows for development.

## Development Workflow

1.  **Fork & Clone**: Fork the repo and clone it locally.
2.  **Branching**: Create a new branch for your feature or fix.
    -   Format: `feat/feature-name` or `fix/issue-description`
3.  **Dependencies**: Install with `npm install`.
4.  **Development**: Run `npx expo start` to launch the app.

## Code Quality Standards

Before submitting a PR, ensure your code passes all quality gates:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format:check

# Tests
npm test
```

## Commit Messages

We follow the **Conventional Commits** specification:

-   `feat: add expense charts`
-   `fix: resolve navigation crash`
-   `docs: update readme`
-   `refactor: simplify auth hook`

## Pull Requests

-   Use the provided PR template.
-   Keep PRs small and focused.
-   Include screenshots/videos for UI changes.
-   Ensure CI passes.

## Architecture Guidelines

-   **SOLID Principles**: Adhere to SOLID principles as documented in `.agent/antigravity/instructions.md`.
-   **Styling**: Use `useAppTheme` hook and `StyleSheet`. No hardcoded colors.
-   **State**: Use Context for global app state, local state for components.
