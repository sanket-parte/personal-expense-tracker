# Design: MVP Architecture Implementation

## 1. Overview
This design outlines the technical architecture for the **Personal Expense Tracker** MVP. 
The goal is to establish a robust, local-first foundation using **React Native (Expo)**, **TypeScript**, and modern best practices.
As the codebase is currently a skeleton, this design covers the essential "plumbing" : Navigation, Data Layer, and State Management.

## 2. Architecture Changes

### New Packages
We need to add the following critical dependencies:
- **Navigation**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- **State Management**: `zustand` (Lightweight, hook-based global state)
- **Persistence**: `expo-sqlite` (Structured local data for expenses/analytics) + `drizzle-orm` (Type-safe SQL queries)
- **Validation**: `zod` (runtime schema validation)
- **UI Utilities**: `clsx` or `react-native-cn` (optional, but sticking to stylesheet for now), `date-fns`

### New Components & Files

#### 1. Navigation Layer (`src/navigation/`)
- `RootNavigator.tsx`: Main stack (Auth -> App).
- `AppNavigator.tsx`: Bottom tab navigator (Dashboard, Add, History, Settings).
- `types.ts`: Type definitions for routes.

#### 2. Service Layer (`src/services/`)
- `database.ts`: SQLite connection and Drizzle setup.
- `expenseService.ts`: CRUD operations for expenses.
- `budgetService.ts`: CRUD for budgets.
- `schema.ts`: Drizzle schema definitions (Tables: `expenses`, `categories`, `budgets`).

#### 3. State Management (`src/store/`) *New Directory*
- `useExpenseStore.ts`: Global checkout of expense data (fetches from service).
- `useSettingsStore.ts`: App settings (Theme preference, currency).

#### 4. Screens (`src/screens/`)
- `DashboardScreen.tsx`: High-level summary (Total spent, recent list).
- `AddExpenseScreen.tsx`: Form to log a new transaction.
- `HistoryScreen.tsx`: List view with filters/search.
- `SettingsScreen.tsx`: User preferences.

### Data Flow
1.  **User Action**: User submits "Add Expense".
2.  **Component**: `AddExpenseScreen` calls `useExpenseStore.addExpense()`.
3.  **Store**: `useExpenseStore` calls `ExpenseService.create()`.
4.  **Service**: `ExpenseService` writes to **SQLite DB**.
5.  **State Update**: On success, Store updates local `expenses` array (Optimistic or Refetch).
6.  **UI Update**: `DashboardScreen` re-renders with new total.

## 3. Detailed Implementation Steps

- [ ] **Step 1: Dependencies & Setup**
    - Install Navigation, Zustand, SQLite, Drizzle.
    - Configure Babel plugins if needed (e.g. for Reanimated if used).

- [ ] **Step 2: Database Initialization**
    - Create `src/db/schema.ts` (Expenses, Categories).
    - Create `src/services/database.ts` to init DB.
    - Create `src/services/expenseService.ts` with methods: `getAll`, `create`, `delete`.

- [ ] **Step 3: State Management**
    - Create `src/store/useExpenseStore.ts` using Zustand.
    - Connect Store to Service.

- [ ] **Step 4: Navigation Structure**
    - Implement `src/navigation/RootNavigator.tsx`.
    - Create placeholders for all 4 main screens.
    - Wrap `App.tsx` with `NavigationContainer`.

- [ ] **Step 5: Screen Implementation**
    - Implement `DashboardScreen` (Read-only view).
    - Implement `AddExpenseScreen` (Write view).

## 4. Verification Plan

### Automated Tests
- **Unit Tests**:
    - Test `expenseService` methods with a mocked database adapter.
    - Test `useExpenseStore` logic.
- **Run Command**: `npm test` (Ensure Jest is configured for these new paths).

### Manual Verification
1.  **Launch App**: Verify app opens to Dashboard.
2.  **Navigation**: capable of switching tabs.
3.  **Persistence**:
    - Add an expense.
    - Kill the app.
    - Re-open app.
    - Verify expense is still displayed on Dashboard.
4.  **Theme**: Toggle dark mode, verify all new screens adapt.
