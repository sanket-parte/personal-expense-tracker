# Design: Transaction Entry & Listing Enhancements

## 1. Overview

This document outlines the architectural and UX improvements for two key areas of the Personal Expense Tracker:

1. **Quick Add Enhancements**: Moving the "Add Expense" feature out of the bottom tab routing and into a globally accessible modal/bottom-sheet. This menu will offer three ways to add an expense: Manual Entry, Receipt Scan (Camera/Gallery), and Natural Language Parsing.
2. **Transaction Listing Enhancements**: Upgrading the `HistoryScreen` to support real-time search, category/date filtering, and replacing the underlying list implementation with `@shopify/flash-list` for maximum efficiency.

---

## 2. Architecture Changes

### A. Transaction Entry (Quick Add)

- **UX Paradigm Shift**: Remove `AddExpenseScreen` from the `AppNavigator` bottom tabs. Replace the center tab button with a custom Floating Action Button (FAB) or a custom Tab Bar Button that triggers a standalone `QuickAddActionSheet`.
- **New Dependencies**:
  - `expo-image-picker` for receipt scanning.
  - Optional: an AI/NLP provider (e.g., OpenAI API) or local heuristic parser for the Natural Language feature.
- **New Components**:
  - `src/components/QuickAddActionSheet.tsx`: Bottom sheet presenting the 3 entry methods.
  - `src/screens/ScanReceiptScreen.tsx`: UI for uploading/taking a photo, showing a loading state during OCR processing, and confirming parsed data.
  - `src/screens/NLAddScreen.tsx`: A chat-like or simple text input interface ("Spent $15 on coffee") that parses text into the `Expense` schema.
- **Data Flow**: The OCR or NLP service will parse inputs and pre-fill the `useAddExpense` hook state, routing the user to a modified `AddExpenseScreen` purely for _confirmation_ before saving to `useExpenseStore`.

### B. Transaction Listing (Search & Filter)

- **UX Paradigm Shift**: Add a sticky header to the `HistoryScreen` containing a `SearchBar` and `FilterChips`.
- **New Dependencies**:
  - `@shopify/flash-list` for highly performant list rendering, replacing the standard `SectionList`.
- **New Components**:
  - `src/components/ui/SearchBar.tsx`: A themed text input with a magnifying glass icon and clear button.
  - `src/components/FilterChips.tsx`: A horizontally scrollable list of category filters.
- **State Changes (`useExpenseStore.ts`)**:
  - We will keep the global store lightweight. Search and filter state (`searchQuery: string`, `selectedCategoryIds: number[]`) will live locally in `HistoryScreen.tsx`.
  - The `items` array from the store will be filtered locally in a `useMemo` block before being passed to `FlashList`.

---

## 3. Detailed Implementation Steps

- [ ] **Step 1: Dependencies & Primitives**
  - Install `@shopify/flash-list` and `expo-image-picker` via `npx expo install`.
  - Create `SearchBar` and `FilterChips` components in `src/components/ui/`.

- [ ] **Step 2: Listing Enhancements (HistoryScreen)**
  - Integrate `SearchBar` and `FilterChips` at the top of `HistoryScreen`.
  - Add local component state for `searchQuery` and `selectedFilters`.
  - Replace `SectionList` with `FlashList`. Use data transformation to flatten sections for `FlashList` or implement sticky headers if sections are strictly required.

- [ ] **Step 3: App Navigation & Quick Add UX**
  - Modify `AppNavigator.tsx`: Change the `AddExpense` tab to be a custom button that opens `QuickAddActionSheet` (Modal) instead of navigating.
  - Build `QuickAddActionSheet.tsx` with 3 options: Manual, Receipt, Natural Language.

- [ ] **Step 4: Smart Entry Services**
  - Create `src/services/receiptScanner.ts`: Wrapper for `expo-image-picker` and mock OCR endpoint.
  - Create `src/services/nlpParser.ts`: Wrapper for text-to-expense parsing logic.
  - Build `ScanReceiptScreen` and `NLAddScreen` to interface with these services and pre-fill the `AddExpenseScreen`.

---

## 4. Verification Plan

### Automated Tests

- **Unit Tests**:
  - `nlpParser.ts`: Test variations of natural language ("$15 on food", "spent 20 at Starbucks yesterday") to ensure correct amount, category, and date extraction.
  - `HistoryScreen`: Test that filtering by category and searching by text correctly reduces the rendered list items.

### Manual Verification

1. **Quick Add UX**: Tap the center "+" tab. Verify it opens the action sheet instead of cutting to a new screen.
2. **Search & Filter**: On the History screen, type "coffee" into the SearchBar and ensure only coffee transactions appear. Switch to the "Food" filter chip and verify the list updates instantly.
3. **Performance**: Scroll through a populated History list rapidly to ensure `FlashList` maintains 60fps without blank cells.
4. **Smart Entry**: Upload a dummy receipt image and verify it routes to the confirmation screen with parsed data.
