# Changes Log: Code Review Fixes
**Date**: 2026-02-17

## Files Created
| File | Description |
|------|-------------|
| `src/utils/currency.ts` | Shared currency symbol map + `getCurrencySymbol()` helper |

## Files Modified
| File | Changes |
|------|---------|
| `src/constants/categories.ts` | Fixed Transport icon `'wow'` → `'🚗'`, added `as const`, exported `Category` type, JSDoc |
| `src/components/SummaryCard.tsx` | JSDoc, `Shadows.lg`, shared `getCurrencySymbol()`, white colors to StyleSheet |
| `src/components/TransactionList.tsx` | JSDoc, shared `getCurrencySymbol()`, Typography/Spacing tokens |
| `src/screens/AddExpenseScreen.tsx` | Inline styles → StyleSheet, shared currency, Typography/Spacing tokens |
| `src/screens/DashboardScreen.tsx` | `Text.onPress` → `Pressable` + a11y, removed redundant `.sort()`, `useCallback`, tokens |
| `src/screens/HistoryScreen.tsx` | Removed empty `() => {}` callback, Typography/Spacing tokens |
| `src/screens/SettingsScreen.tsx` | Uses store `clearExpenses` instead of direct service, `useCallback`, tokens |
| `src/hooks/useAddExpense.ts` | Consolidated double validation into shared field validators |
| `src/store/useExpenseStore.ts` | Added `clearExpenses` action |
| `src/navigation/AppNavigator.tsx` | Added emoji tab bar icons via `tabBarIcon` |
| `src/utils/dateHelpers.ts` | JSDoc on function + interface |
| `src/db/schema.ts` | Clarifying comment on `createdAt` default |

## Tests Updated
| File | Changes |
|------|---------|
| `src/screens/__tests__/SettingsScreen.test.tsx` | Updated mock for store `clearExpenses` action |
| `src/store/__tests__/useExpenseStore.test.ts` | Added `clearExpenses` success/error tests |
| `src/components/__tests__/TransactionList.test.tsx` | Updated expected currency `$` → `₹` |
