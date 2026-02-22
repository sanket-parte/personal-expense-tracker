---
applyTo: '.tracking/changes/20260222-e2e-testing-setup-changes.md'
---

<!-- markdownlint-disable-file -->

# Task Checklist: React Native E2E Testing Setup (Maestro)

## Overview

Implement a robust, black-box End-to-End testing suite using Maestro to validate core personal expense tracker user journeys on iOS/Android simulators.

## Objectives

- Add Maestro YAML test suites for core user flows.
- Configure NPM scripts for running the test environment.
- Instrument existing React Native screens and UI components with explicit accessibility identifiers.

## Research Summary

### Project Files

- package.json - NPM script definitions for launching Expo and Maestro test commands.
- src/screens/AddExpenseScreen.tsx - Primary input screen requiring E2E verification.
- src/components/ui/ - Reusable elements requiring `testID` or `accessibilityLabel` instrumentation.

### Standards References

- .agent/antigravity/instructions.md - Agent Instructions (Strict typing, no any, functional components).
- .agent/antigravity/project_context.md - Project Context (Expo managed workflow).
- .tracking/designs/20260222-e2e-testing-setup-design.md - Architecture Approval for Maestro.

## Implementation Checklist

### [x] Phase 1: Environment & Script Configuration

- [x] Task 1.1: Configure Package Scripts
  - Details: .tracking/details/20260222-e2e-testing-setup-details.md (Lines 11-20)

### [x] Phase 2: UI Instrumentation

- [x] Task 2.1: Instrument Core Screens
  - Details: .tracking/details/20260222-e2e-testing-setup-details.md (Lines 24-34)

### [x] Phase 3: Maestro Flow Creation

- [x] Task 3.1: Create Launch Flow
  - Details: .tracking/details/20260222-e2e-testing-setup-details.md (Lines 38-48)
- [x] Task 3.2: Create Add Expense Flow
  - Details: .tracking/details/20260222-e2e-testing-setup-details.md (Lines 50-60)

## Dependencies

- Expo CLI
- Maestro CLI (`curl -Ls "https://get.maestro.mobile.dev" | bash`)
- iOS Simulator / Android Emulator

## Success Criteria

- `npm run test:e2e` successfully executes Maestro test scripts.
- No UI components rely on brittle XPaths; all targeted elements use semantic test IDs.
