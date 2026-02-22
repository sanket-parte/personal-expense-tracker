<!-- markdownlint-disable-file -->

# Task Details: React Native E2E Testing Setup (Maestro)

## Research Reference

**Source Research**: .tracking/designs/20260222-e2e-testing-setup-design.md

## Phase 1: Environment & Script Configuration

### Task 1.1: Configure Package Scripts

Add explicit npm scripts to launch Expo and run the Maestro test suite.

- **Files**:
  - `package.json` - Add `"test:e2e": "maestro test .maestro/"`
- **Success**:
  - `package.json` correctly formats the new commands.
- **Dependencies**:
  - None

## Phase 2: UI Instrumentation

### Task 2.1: Instrument Core Screens

Audit primary screens (Dashboard, AddExpense) making sure interactive fields have reliable `testID` properties where accessibility labels fall short.

- **Files**:
  - `src/screens/DashboardScreen.tsx` - Verify Quick Add triggers.
  - `src/screens/AddExpenseScreen.tsx` - Verify form input `testID`s ("amount-input", "category-picker", "save-button").
- **Success**:
  - Components pass standard `npm run typecheck`.
  - Props implement interface extensions if custom `testID` is drilled.
- **Dependencies**:
  - Phase 1 completion

## Phase 3: Maestro Flow Creation

### Task 3.1: Create Launch Flow

Write a basic YAML flow ensuring the app launches and the dashboard loads.

- **Files**:
  - `.maestro/app-launch.yaml` - Maestro YAML definition.
- **Success**:
  - YAML validates correctly.
  - Test asserts the presence of the dashboard title or primary chart block.
- **Dependencies**:
  - Phase 2 completion

### Task 3.2: Create Add Expense Flow

Write a comprehensive business logic flow simulating a user adding an expense to the database.

- **Files**:
  - `.maestro/add-expense.yaml` - Maestro flow definition.
- **Success**:
  - Navigates from Dashboard -> Add Expense.
  - Enters Amount, Name, Category.
  - Submits and verifies return to History or Dashboard.
- **Dependencies**:
  - Task 3.1 completion

## Dependencies

- Maestro CLI
- Expo Dev Client

## Success Criteria

- All YAML tests execute against the compiled JS bundle locally.
