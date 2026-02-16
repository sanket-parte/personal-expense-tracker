# Changes: MVP Implementation

## 2026-02-17

- **[INIT]**: Started MVP Implementation.
- **[FEAT]**: Configured Drizzle ORM + Expo SQLite (`src/db/schema.ts`, `src/services/database.ts`).
- **[FEAT]**: Implemented Zustand Global State (`src/store/useExpenseStore.ts`).
- **[FEAT]**: Set up Navigation Structure (`src/navigation/`).
- **[FEAT]**: Created core screen shells (`Dashboard`, `Add`, `History`, `Settings`).
- **[FEAT]**: Integrated Navigation into `App.tsx`.
- **[FIX]**: Resolved type-checking and linting errors. (Verified with `npm run typecheck` & `npm run lint`).

## 2026-02-17: Code Review & Refactor

- **[REFACTOR]**: Extracted database queries into `src/services/expenseService.ts` for better separation of concerns.
- **[REFACTOR]**: Updated `useExpenseStore.ts` to use `expenseService`.

## 2026-02-17: Reliability & Testing

- **[TEST]**: Integrated Jest with `jest-expo`.
- **[TEST]**: Achieved **97%** code coverage.
- **[TEST]**: Added unit tests for:
    -   `expenseService` (DB logic)
    -   `useExpenseStore` (State logic)
    -   `useAppTheme` (Hook logic)
    -   `DashboardScreen`, `AddExpenseScreen`, etc. (Render logic)
    -   `AppNavigator` & `RootNavigator` (Navigation logic)
