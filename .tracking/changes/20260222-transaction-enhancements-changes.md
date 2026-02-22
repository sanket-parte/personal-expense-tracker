# Changes Log: Transaction Enhancements

## Date: 2026-02-22

### Phase 1: Dependencies & Shared Services

- **Dependencies**: Added `@shopify/flash-list` and `expo-image-picker`.
- **Types**: Added `ParsedExpenseData` typing for prefill payloads.
- **Services**: Created `src/services/receiptScanner.ts` mock for OCR and gallery imports.
- **Services**: Created `src/services/nlpParser.ts` mock for parsing conversational text.

### Phase 2: Listing Enhancements (FlashList + Search)

- **UI Components**: Created `SearchBar.tsx` a cohesive search input with clear button.
- **UI Components**: Created `FilterChips.tsx` for scrolling category chips using `AnimatedPressable`.
- **Utils**: Extended `dateHelpers.ts` with `flattenExpensesForFlashList` for handling sticky headers.
- **Screens**: Complete refactor of `HistoryScreen.tsx`. Replaced `SectionList` with `@shopify/flash-list`.
- **Screens**: Integrated local search filtering and category chips into `HistoryScreen`.

### Phase 3: Smart Entry Options (UX)

- **UI Components**: Built `QuickAddActionSheet`, a modal overlay providing three unified entry choices.
- **Screens**: Built `ScanReceiptScreen` with native camera/gallery hooks and loading parsing states.
- **Screens**: Built `NLAddScreen` for typing conversational expense records.

### Phase 4: App Navigation Matrix

- **Navigation**: Overhauled `AppNavigator.tsx`. Transformed `AddExpense` tab into a non-navigating trigger for `QuickAddActionSheet`.
- **Navigation**: Inserted `AddExpense`, `ScanReceipt`, and `NLAdd` as global Modals on `RootNavigator.tsx`.
- **Hooks**: Modified `useAddExpense` to accept `preflightData` for pre-hydrating state.
- **Screens**: Altered `AddExpenseScreen` to consume and inject `route.params.preflightData`.

### Phase 5: Verification & Code Review

- **Code Quality**: Addressed and rectified all `tsc --noEmit` issues, specifically replacing dot-notation keys.
- **Code Quality**: Cleaned up `eslint` warnings, shifting `@ts-ignore` to `@ts-expect-error` where needed to suppress FlashList complex unions.
- **Testing**: Confirmed build readiness locally by verifying commands execute successfully cleanly.

### Phase 6: Code Review Feedback Implementation

- **Navigation Safety**: Engineered the `useAppNavigation.ts` hook exposing a strictly typed `AppNavigationProp` to safely route between Tab screens and Modals.
- **Strict Generic Constraints**: Migrated `useNavigation<any>()` inside `QuickAddActionSheet`, `NLAddScreen`, and `ScanReceiptScreen` to the strict `useAppNavigation` proxy.
- **Type Casting**: Stripped explicit `any` casting from the generic FlashList items in `HistoryScreen` using a newly exported union `HistoryListItem`.
- **ESLint Fixes**: Adjusted `import()` violations inside `QuickAddActionSheet` by lifting `RootStackParamList` out of the route parameter definitions to the head imports.
