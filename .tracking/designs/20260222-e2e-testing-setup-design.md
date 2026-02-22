# Design: E2E Testing Setup (Maestro vs Appium)

## 1. Overview

The objective is to implement End-to-End (E2E) testing for the React Native (Expo) Personal Expense Tracker to ensure the application functions correctly on real mobile devices and simulators.

While the user requested a "Selenium-based" setup (for which **Appium** is the direct mobile equivalent using the WebDriver protocol), the modern industry standard and highly recommended approach for React Native/Expo apps is **Maestro**. Maestro provides a vastly superior developer experience, extreme flake resistance, and requires almost zero boilerplate compared to Appium or Detox.

This design recommends **Maestro** as the primary E2E framework while acknowledging Appium as the alternative.

## 2. Architecture Changes

- **New Components**:
  - A new `.maestro/` directory at the project root to house YAML-based test flows.
  - Setup flows for core user journeys: `.maestro/app-launch.yaml`, `.maestro/add-expense.yaml`.
- **Modified Files**:
  - `package.json`: Addition of package scripts (`test:e2e`) to easily trigger tests.
  - Existing UI components (`src/components/ui/*`): Ensure `testID` props are properly exposed for reliable element selection.
- **Data Flow**: Tests will be strictly black-box. Maestro will launch the compiled Expo app (or communicate via Expo Go) and interact with the UI layer exactly as a user would, verifying visual state and accessibility labels.

## 3. Detailed Implementation Steps

- [ ] **Step 1: Environment Setup**: Install Maestro CLI locally on the development machine.
- [ ] **Step 2: Package Scripts**: Add explicit NPM scripts to `package.json` to streamline launching the simulator and triggering `maestro test`.
- [ ] **Step 3: Core Test Flows**: Implement initial YAML test definitions for the primary business value (launching the app, navigating to the add expense screen, filling the form, and verifying it appears in the history list).
- [ ] **Step 4: UI Instrumentation**: Audit screens like `DashboardScreen` and `AddExpenseScreen` to ensure critical interactive elements have unique `testID` or `accessibilityLabel` bindings.
- [ ] **Step 5: Documentation**: Update project documentation detailing how to run the E2E suite locally.

## 4. Verification Plan

- **Local Execution Verification**: Run `maestro test .maestro/` against an active iOS Simulator or Android Emulator. The test suite must complete without timeouts or missing element errors.
- **CI Readiness**: Ensure the YAML scripts are structured cleanly so they can be easily plugged into a GitHub Actions pipeline using Maestro Cloud or a bare-metal macOS runner in the future.
