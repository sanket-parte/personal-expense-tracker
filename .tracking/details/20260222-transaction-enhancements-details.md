<!-- markdownlint-disable-file -->

# Task Details: Transaction Enhancements

## Research Reference

**Source Research**: .tracking/research/20260222-transaction-enhancements-research.md

## Phase 1: Dependencies & Shared Services

### Task 1.1: Install Dependencies

Install the heavily optimized list package and native module integrations.

- **Files**:
  - `package.json` - Automatically updated by npm
- **Success**:
  - Both `@shopify/flash-list` and `expo-image-picker` are installed.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 22-31) - Required New Dependencies
- **Dependencies**:
  - Node environment

### Task 1.2: Create Global Types & Smart Entry Services

Create the foundational structures for parsing. Mock the AI/OCR parts initially but define the TypeScript interfaces heavily.

- **Files**:
  - `src/types/index.ts` - Add `ParsedExpenseData` containing partial `Expense` fields.
  - `src/services/receiptScanner.ts` - Wrapper around `ImagePicker.launchCameraAsync`/`launchImageLibraryAsync`.
  - `src/services/nlpParser.ts` - Local heuristic parsing of text into `ParsedExpenseData`.
- **Success**:
  - Services export mockable asynchronous functions returning parsed data.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 34-39) - Extensible parsing services outline
- **Dependencies**:
  - Task 1.1

## Phase 2: Transaction Listing Enhancements

### Task 2.1: Create SearchBar & FilterChips Shared Components

Build the visual components for local filtering.

- **Files**:
  - `src/components/ui/SearchBar.tsx` - Text input with magnifying glass and clear actions, bound to a value/onChangeText.
  - `src/components/ui/FilterChips.tsx` - Reusable horizontal `ScrollView` of `AnimatedPressable` category chips.
- **Success**:
  - Components render smoothly in dark and light modes.
  - Filtering events successfully bubble up.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 52-61) - Search & Filter Local State Pattern
- **Dependencies**:
  - Existing `src/constants/theme.ts`

### Task 2.2: Refactor HistoryScreen with FlashList, Search, and Filters

Replace the React Native `SectionList` with `@shopify/flash-list`. Apply the new filters locally.

- **Files**:
  - `src/screens/HistoryScreen.tsx` - Modify List architecture.
  - `src/utils/dateHelpers.ts` - Add `flattenExpensesForFlashList` that transforms data array by interpolating date string headers.
- **Success**:
  - `HistoryScreen` uses FlashList with `stickyHeaderIndices`.
  - Typing in the `SearchBar` filters global results instantly.
  - Tapping a `FilterChip` recalculates the visible list instantly.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 63-75) - FlashList Grouped Data Pattern
- **Dependencies**:
  - Tasks 1.1, 2.1

## Phase 3: Transaction Entry (Quick Add UI)

### Task 3.1: Create QuickAddActionSheet Modal Component

Build the visual menu containing the three Smart Entry methods.

- **Files**:
  - `src/components/QuickAddActionSheet.tsx` - Bottom sheet modal.
- **Success**:
  - Modal gracefully slides up.
  - Tapping Manual routes to standard `AddExpenseScreen`.
  - Tapping Receipt/NLP routes to their respective screens.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 11-13) - AppNavigator Analysis
- **Dependencies**:
  - Existing UI Primitives

### Task 3.2: Create ScanReceiptScreen & NLAddScreen

Create the dedicated UI flows for image capture/upload and text entry. They should act on the services from Task 1.2 and navigate to the `AddExpenseScreen` with parameters upon resolution.

- **Files**:
  - `src/screens/ScanReceiptScreen.tsx` - UI for image capture -> Loading -> Routing.
  - `src/screens/NLAddScreen.tsx` - UI for text-entry -> Extracting -> Routing.
  - `src/types/navigation.ts` - Update `AddExpense` route parameters to optionally accept pre-filled data.
  - `src/screens/AddExpenseScreen.tsx` - Read route params to hydrate initial state (`useAddExpense` hook initial values).
- **Success**:
  - Data correctly flows from Smart screens into the AddExpense form.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 34-39)
- **Dependencies**:
  - Task 1.2

## Phase 4: App Navigation Matrix

### Task 4.1: Integrate QuickAddActionSheet into AppNavigator

Break the standard behavior of the centered AddExpense tab. Make it a transparent button that triggers the action sheet.

- **Files**:
  - `src/navigation/AppNavigator.tsx` - Utilize `tabBarButton` override for the AddExpense tab route. Include state to drive the visibility of `QuickAddActionSheet`.
- **Success**:
  - Tab clicking does not perform a route transition, but purely opens the modal overlay.
- **Research References**:
  - .tracking/research/20260222-transaction-enhancements-research.md (Lines 41-50) - Custom Tab Bar Button Pattern
- **Dependencies**:
  - Task 3.1

### Task 4.2: Update RootNavigator with New Modals

Register the new standalone screens (ScanReceipt, NLAdd) at the root level, likely configured as modals.

- **Files**:
  - `src/navigation/RootNavigator.tsx` - Add `ScanReceipt` and `NLAdd` screens.
  - `src/types/navigation.ts` - Add `RootStackParamList` definitions for these screens.
- **Success**:
  - Navigation functions correctly resolve these routes.
- **Dependencies**:
  - Task 3.2

## Phase 5: Verification & Quality Gates

### Task 5.1: Run Code Quality Checks

Execute standard React Native testing procedures.

- **Files**:
  - System terminal operations.
- **Success**:
  - All tests (`npm run test`), lints (`npm run lint`), typescript (`npm run typecheck`) pass cleanly.
- **Dependencies**:
  - All previous tasks.
