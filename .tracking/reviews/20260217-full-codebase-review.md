# Code Review: Full Codebase Audit
**Date**: 2026-02-17
**Status**: REQUEST CHANGES

## Summary
Full codebase audit of the Personal Expense Tracker MVP covering all 31 source files across screens, components, hooks, services, store, navigation, constants, and utilities. All four automated quality gates pass. The architecture is clean and well-layered, but several issues remain across DRY compliance, React Native best practices, and project standards.

## ✅ Automated Quality Gates

| Gate | Result |
|------|--------|
| `npm run typecheck` | **PASS** — 0 errors |
| `npm run lint` | **PASS** — 0 warnings |
| `npm run format:check` | **PASS** — all files clean |
| `npm test --coverage` | **PASS** — 90.56% branches, 55/55 tests |

---

## 🚨 Critical Issues (Must Fix)

- [ ] File: `src/constants/categories.ts` L3 — **Transport icon is `'wow'` instead of an emoji** (e.g. `'🚗'`). This renders the literal text "wow" in the UI alongside emoji icons for other categories. Likely a debug leftover.

- [ ] File: `src/components/SummaryCard.tsx` L14-18 — **Hardcoded color strings** (`'rgba(255,255,255,0.8)'`, `'#FFFFFF'`). These bypass the theme system entirely. Should use a theme token or `colors.background` / a derived alpha value. The `$` currency symbol on L16 also ignores `APP_CONFIG.defaultCurrency` (set to `INR`).

- [ ] File: `src/screens/AddExpenseScreen.tsx` L72 — **Inline style object** `{ color: colors.primary, fontSize: 16 }` on the Cancel `<Text>`. This creates a new object on every render; move to `StyleSheet.create`. Same issue with `{ width: 50 }` on L75 (spacer view).

- [ ] File: `src/screens/DashboardScreen.tsx` L56 — **`Text.onPress` antipattern**. Using `onPress` on a `<Text>` element instead of wrapping in `<Pressable>`. This has no press feedback, no accessibility affordance, and inconsistent hit target across platforms. Replace with `<Pressable>`.

---

## ⚠️ Improvements (Should Fix)

- [ ] File: `src/screens/HistoryScreen.tsx` L38 — **Empty callback `() => {}`** passed to `TransactionItem.onPress`. This creates a new function on every render and provides no user value. Either omit the prop or implement a detail-view navigation.

- [ ] File: `src/components/SummaryCard.tsx` — **Missing JSDoc file header**. All other source files have JSDoc; this file doesn't.

- [ ] File: `src/components/TransactionList.tsx` — **Missing JSDoc file header**. Same as above.

- [ ] File: `src/components/TransactionList.tsx` L37 — **Hardcoded `$` currency symbol** in `-$${item.amount.toFixed(2)}`. Should use `APP_CONFIG.defaultCurrency` and the `CURRENCY_SYMBOLS` map (already defined in `AddExpenseScreen.tsx` — extract to shared constant).

- [ ] File: `src/constants/theme.ts` — **`Typography`, `Spacing`, `BorderRadius`, `Shadows` constants are defined but unused** across any component. Screens use magic numbers for padding, fontSize, borderRadius, etc. instead of these tokens. Either adopt them consistently or remove to avoid dead code.

- [ ] File: `src/hooks/useAddExpense.ts` L23 vs L26-37 — **Double validation**: `isValid` checks `!!amount && !!title.trim() && !!categoryId`, then `handleSave` re-validates the same fields with individual `Alert.alert` calls. These should share logic or `handleSave` should rely on `isValid` + field-specific messages only when `isValid` is false.

- [ ] File: `src/screens/AddExpenseScreen.tsx` L30-35 — **`CURRENCY_SYMBOLS` map defined locally**. This should be extracted to `src/constants/config.ts` or a new `src/utils/currency.ts` so `SummaryCard.tsx` and `TransactionList.tsx` can also use it (DRY principle).

- [ ] File: `src/screens/DashboardScreen.tsx` L34 — **`.sort()` inside `useMemo` duplicates arrays** on every `items` change. Since `expenseService.getAll()` already returns items ordered by date desc, the sort is redundant. If kept, consider whether the store should guarantee order.

- [ ] File: `src/store/useExpenseStore.ts` — **Missing `clearExpenses` action**. `SettingsScreen` directly calls `expenseService.deleteAll()` + `refreshExpenses()` instead of going through the store, breaking the unidirectional data flow pattern.

---

## 💡 Nitpicks (Optional)

- [ ] File: `src/components/SummaryCard.tsx` L29 — **Inline shadow** instead of using `Shadows.lg` from `theme.ts`. The values are identical but duplicated.

- [ ] File: `src/navigation/AppNavigator.tsx` — **Missing tab bar icons**. The bottom tabs have no icons, only text labels. Consider adding `tabBarIcon` for each screen.

- [ ] File: `src/constants/categories.ts` — **No `as const` assertion** and no exported type. Adding `as const` enables narrower types, and exporting `Category` type improves consumer type safety.

- [ ] File: `src/utils/dateHelpers.ts` — **Missing JSDoc on `groupExpensesByDate`** function and `GroupedExpenses` interface.

- [ ] File: `src/db/schema.ts` L15 — **`createdAt` default `new Date()`** is evaluated once at module load, not per-row. The SQL `DEFAULT` in `database.ts` handles the actual default correctly, but the Drizzle-level default could confuse future readers. Consider using `sql` tagged template for clarity.

---

## Manual Review Checklist

### A. React Native Best Practices
- [x] **StyleSheet.create**: Used consistently (minor inline exceptions noted above)
- [ ] **Performance**: `useMemo` used for derived state, but `useCallback` missing for stable callbacks in `DashboardScreen` and `HistoryScreen` (e.g., `() => navigation.navigate('History')`)
- [x] **Platform specifics**: `KeyboardAvoidingView` with `Platform.OS` check, `SafeAreaProvider`, `useSafeAreaInsets` all present
- [x] **Navigation**: Screens registered correctly with typed `ParamList`, logic decoupled via hooks

### B. JS/TS Best Practices
- [x] **Type Safety**: No `any` types in source, interfaces defined for all props/state
- [x] **Modern Syntax**: ES6+ throughout (destructuring, async/await, arrow functions)
- [x] **Error Handling**: try/catch in all async flows with user-facing Alert messages

### C. SOLID & DRY Principles
- [x] **Single Responsibility**: View vs logic separation via hooks (`useAddExpense`, `useAppTheme`)
- [ ] **DRY**: Currency symbol duplicated (AddExpenseScreen vs SummaryCard vs TransactionList), theme design tokens defined but unused
- [x] **Dependency Inversion**: Components depend on hooks/services, not direct DB calls

### D. Project Standards Alignment
- [x] **Theming**: `useAppTheme` used consistently (except SummaryCard text colors)
- [x] **File Structure**: Correct folder structure (`screens/`, `components/`, `hooks/`, `services/`, etc.)
- [ ] **Documentation**: 2 components missing JSDoc file headers

### E. Maintainability
- [x] **Readability**: Descriptive naming throughout (`handleClearData`, `refreshExpenses`, `isDisabled`)
- [x] **Complexity**: Functions are short and testable

---

## Verification
- [x] Automated checks passed
- [x] Manual walkthrough completed
