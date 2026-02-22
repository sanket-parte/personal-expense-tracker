---
applyTo: '.tracking/changes/20260222-transaction-enhancements-changes.md'
---

<!-- markdownlint-disable-file -->

# Task Checklist: Test Coverage for Transaction Enhancements

## Overview

Increase test coverage across the newly added transaction enhancements to exceed the 90% threshold for statements, branches, functions, and lines.

## Objectives

- Add unit tests for new UI components (`QuickAddActionSheet`, `FilterChips`, `SearchBar`).
- Add unit tests for new smart entry screens (`ScanReceiptScreen`, `NLAddScreen`).
- Expand test coverage for refactored screens (`HistoryScreen`, `AddExpenseScreen`).
- Add tests for new services and hooks (`receiptScanner.ts`, `nlpParser.ts`, `useAppNavigation.ts`).
- Expand tests for `dateHelpers.ts` to cover `flattenExpensesForFlashList`.

## Implementation Checklist

### [ ] Phase 1: Test Environment Stabilization

- [x] Task 1.1: Fix existing Jest configuration and add missing structural mocks (e.g. `@expo/vector-icons`, `@shopify/flash-list`, `expo-image-picker`, `createNativeStackNavigator.Group`).
  - _Completed._

### [ ] Phase 2: Unit Tests for Shared Components and Hooks

- [ ] Task 2.1: Write tests for `FilterChips.tsx` and `SearchBar.tsx`.
- [ ] Task 2.2: Write tests for `QuickAddActionSheet.tsx`.
- [ ] Task 2.3: Write tests for `useAppNavigation.ts` and ensure `AppNavigator` tests remain robust.

### [ ] Phase 3: Unit Tests for Screens

- [ ] Task 3.1: Write tests for `ScanReceiptScreen.tsx`.
- [ ] Task 3.2: Write tests for `NLAddScreen.tsx`.
- [ ] Task 3.3: Enhance tests for `HistoryScreen.tsx` (covering the new FlashList, Search, and Filter integration).
- [ ] Task 3.4: Enhance tests for `AddExpenseScreen.tsx` (covering the new `prefillData` injection).

### [ ] Phase 4: Unit Tests for Services and Utils

- [ ] Task 4.1: Write tests for `receiptScanner.ts`.
- [ ] Task 4.2: Write tests for `nlpParser.ts`.
- [ ] Task 4.3: Enhance tests for `dateHelpers.ts` (`flattenExpensesForFlashList`).

### [ ] Phase 5: Verification

- [ ] Task 5.1: Run `npm run test -- --coverage` and ensure all suites pass with > 90% coverage globally.

## Success Criteria

- Jest coverage summary displays > 90% across `Stmts`, `Branch`, `Funcs`, and `Lines`.
- All tests pass (0 `FAIL` statuses).
