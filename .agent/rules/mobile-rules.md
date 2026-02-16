# Mobile Development Rules

## Coding Standards
- **Naming**: 
  - Components: PascalCase (e.g., `ExpenseCard.tsx`)
  - Functions/Variables: camelCase (e.g., `calculateTotal`, `userId`)
  - File Names: PascalCase for components, camelCase for utilities.
- **Imports**: Organize imports: React, Third-party libraries, Internal components, Utils/Constants, Styles.
- **Exports**: Use named exports for better tree-shaking and consistency.

## Git & Version Control
- **Commits**: Use descriptive commit messages (e.g., `feat: add expense tracking screen`, `fix: resolve layout issue on Android`).
- **Branches**: Feature branches (e.g., `feature/add-transaction`), Bugfix branches (e.g., `fix/login-error`).

## Error Handling
- Use `try-catch` blocks for all async operations.
- Display user-friendly error messages (Toast/Alert), not raw error codes.
- Log errors to a monitoring service (or console in dev) with context.

## State Management
- Keep state local where possible.
- Use Global State (Zustand/Context) only for data shared across multiple screens (User Auth, Theme, formatted Data).

## Accessibility
- Ensure all interactive elements have `accessibilityLabel` and `accessibilityHint`.
- Test with screen readers (VoiceOver/TalkBack).
