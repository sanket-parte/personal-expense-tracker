<!-- markdownlint-disable-file -->

# Task Details: MVP Implementation

## Research Reference

**Source Research**: .tracking/research/20260217-mvp-implementation-research.md

## Phase 1: Database & Services

### Task 1.1: Install Dependencies & Config

Install required packages for SQLite, Drizzle, and Utils.

- **Files**:
  - `package.json` - Add dependencies
  - `drizzle.config.ts` - Create configuration
- **Success**:
  - `npm install` completes successfully
  - `drizzle.config.ts` exists and is valid
- **Research References**:
  - .tracking/research/20260217-mvp-implementation-research.md (Lines 19-32) - Database Dependnecies & Config
- **Dependencies**:
  - None

### Task 1.2: Database Schema & Connection

Set up the Drizzle schema and SQLite connection provider.

- **Files**:
  - `src/db/schema.ts` - Define Expenses table
  - `src/services/database.ts` - Export db instance
- **Success**:
  - Schema exports `expenses` table
  - Database service exports `db` object
- **Research References**:
  - .tracking/research/20260217-mvp-implementation-research.md (Lines 34-55) - Schema & Connection Pattern
- **Dependencies**:
  - Task 1.1 completion

## Phase 2: State Management

### Task 2.1: Zustand Store Setup

Create the global expense store to bridge UI and Database.

- **Files**:
  - `src/store/useExpenseStore.ts` - Create store
- **Success**:
  - Store exports `useExpenseStore` hook
  - `addExpense` and `refreshExpenses` actions defined
- **Research References**:
  - .tracking/research/20260217-mvp-implementation-research.md (Lines 57-78) - Zustand Store Pattern
- **Dependencies**:
  - Phase 1 completion

## Phase 3: Navigation

### Task 3.1: Navigation Structure (Root & Tab)

Implement the navigation container, root stack, and main tab navigator.

- **Files**:
  - `src/navigation/types.ts` - Define route param lists
  - `src/navigation/AppNavigator.tsx` - Tab Navigator
  - `src/navigation/RootNavigator.tsx` - Stack Navigator
- **Success**:
  - Navigators act as shells (placeholder components fine)
- **Research References**:
  - .tracking/research/20260217-mvp-implementation-research.md (Lines 80-99) - Navigation Pattern
- **Dependencies**:
  - None (can be parallel with DB)

## Phase 4: Screens & Integration

### Task 4.1: Screen Shells & App Integration

Create basic screen components and wire everything into App.tsx.

- **Files**:
  - `src/screens/DashboardScreen.tsx`
  - `src/screens/AddExpenseScreen.tsx`
  - `src/screens/HistoryScreen.tsx`
  - `src/screens/SettingsScreen.tsx`
  - `src/App.tsx` - Wrap with Providers
- **Success**:
  - App displays Dashboard on launch
  - Tabs switch between screens
- **Research References**:
  - .tracking/designs/20260217-mvp-architecture-design.md (Lines 35-40) - Screen List
- **Dependencies**:
  - Phase 2 & 3 completion

## Dependencies

- Node.js / NPM
- Expo Go (for testing)

## Success Criteria

- All files created in correct `src/` directories
- No TypeScript errors (`npm run typecheck` passes)
