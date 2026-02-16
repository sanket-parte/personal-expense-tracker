<!-- markdownlint-disable-file -->

# Task Details: Core Features Implementation

## Research Reference

**Source Research**: .tracking/research/20260217-core-features-research.md

## Phase 1: Add Expense Feature

### Task 1.1: Implement Add Expense UI & Logic

Create a form screen that captures amount, title, date, and category, and submits to the store.

- **Files**:
  - src/screens/AddExpenseScreen.tsx - UI Implementation with local state and store integration.
- **Success**:
  - Form validates input (Amount > 0).
  - Submitting calls `addExpense` and navigates back.
- **Research References**:
  - .tracking/research/20260217-core-features-research.md (Lines 15-28) - Component Analysis: Add Expense Screen
- **Dependencies**:
  - useExpenseStore (Store)

## Phase 2: Dashboard Feature

### Task 2.1: Implement Dashboard Summary & List

Display total expense amount and the 5 most recent transactions.

- **Files**:
  - src/screens/DashboardScreen.tsx - Main view logic.
  - src/components/SummaryCard.tsx - New component for totals.
  - src/components/TransactionList.tsx - New reusable list component.
- **Success**:
  - Total matches sum of all items.
  - List shows strictly 5 most recent items.
- **Research References**:
  - .tracking/research/20260217-core-features-research.md (Lines 30-41) - Component Analysis: Dashboard Screen
- **Dependencies**:
  - Phase 1 completion (to have data to show)

## Phase 3: History & Settings

### Task 3.1: Implement History List Logic

Show full list of transactions grouped by date.

- **Files**:
  - src/screens/HistoryScreen.tsx - Grouping logic and SectionList.
  - src/utils/dateHelpers.ts - Helper functions for converting dates/grouping.
- **Success**:
  - Items grouped correctly (e.g., "Today", "Yesterday").
- **Research References**:
  - .tracking/research/20260217-core-features-research.md (Lines 43-49) - Component Analysis: History Screen

### Task 3.2: Implement Settings Controls

Provide mechanism to clear data and view theme info.

- **Files**:
  - src/screens/SettingsScreen.tsx - UI for controls.
  - src/services/expenseService.ts - Add `deleteAll` method for "Clear Data".
  - src/store/useExpenseStore.ts - Add `clearAll` action.
- **Success**:
  - "Clear Data" wipes DB and Store state.
- **Research References**:
  - .tracking/research/20260217-core-features-research.md (Lines 51-58) - Component Analysis: Settings Screen

## Dependencies

- zustand (Global State)
- drizzle-orm (DB Queries)

## Success Criteria

- Functional end-to-end flow: Add -> View on Dashboard -> View in History -> Clear Data.
