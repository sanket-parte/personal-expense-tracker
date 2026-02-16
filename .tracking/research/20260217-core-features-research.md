# Research: Core Features Implementation
**Date**: 2026-02-17
**Task**: Implement Dashboard, Add Expense, History, and Settings screens.

## 1. Project Context & Patterns
- **Architecture**: Expo + React Native + Drizzle ORM + Zustand.
- **Database**: SQLite with `drizzle-orm/expo-sqlite`.
- **State Management**: Zustand `useExpenseStore`.
- **Navigation**: React Navigation (Native Stack + Bottom Tabs).
- **Styling**: `useAppTheme` hook for dynamic theming (Light/Dark).

## 2. Component Analysis

### A. Add Expense Screen
- **Goal**: Allow users to create a new expense record.
- **Data Model**: `NewExpense` interface from `@/services/database`.
  - `amount`: number (real)
  - `title`: string (text)
  - `date`: Date (timestamp)
  - `categoryId`: number (integer, optional)
- **Store Action**: `useExpenseStore.getState().addExpense(data)`.
- **Validation**:
  - Amount must be > 0.
  - Title must be non-empty.
  - Date defaults to `new Date()`.

### B. Dashboard Screen
- **Goal**: Show high-level financial summary.
- **Data Source**: `useExpenseStore((state) => state.items)`.
- **Derived State**:
  - `totalExpenses`: Sum of all items (filter by month later).
  - `recentTransactions`: `items.slice(0, 5)`.
- **UI Components**:
  - `SummaryCard`: Displays total amount.
  - `TransactionList`: Reusable list component.

### C. History Screen
- **Goal**: List all past transactions.
- **Data Source**: `useExpenseStore((state) => state.items)`.
- **Logic**:
  - Group by Date (Today, Yesterday, [Date String]).
  - Sort by `date` desc.

### D. Settings Screen
- **Goal**: App configuration.
- **Features**:
  - Theme Toggle: `useAppTheme` does not yet have a toggle method exposed directly; might need `Appearance` module or Context if not using system default. *Note: Current `useAppTheme` detects system theme. MVP can just show current status or link to system settings.*
  - Data Management: "Clear All Data" -> `expenseService.deleteAll()` (needs implementation).

## 3. Implementation Strategy

### Phase 1: Add Expense
1.  Create `AddExpenseScreen.tsx` UI.
2.  Implement Form State (local `useState`).
3.  Call `addExpense` on submit.
4.  Navigate back on success.

### Phase 2: Dashboard
1.  Connect `useExpenseStore`.
2.  Compute totals on the fly (or memoize).
3.  Render `FlatList` for recent items.

### Phase 3: History & Settings
1.  Implement specific filtering/grouping for History.
2.  Add rudimentary Settings controls.

## 4. Dependencies
- `drizzle-orm` (installed)
- `zustand` (installed)
- `react-native-safe-area-context` (installed)
- `@react-navigation/native` (installed)
