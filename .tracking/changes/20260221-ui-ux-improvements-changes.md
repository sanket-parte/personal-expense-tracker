# Changes Log: UI/UX Experience Improvements

## Date: 2026-02-21

### Phase 1: Theme Token Additions

- `src/constants/theme.ts` — Added `onPrimary`, `onPrimaryMuted` to Colors.light/dark. Added `fontSize['4xl']: 48` and `lineHeight['4xl']: 56` to Typography.

### Phase 2: UI Primitives

- `src/components/ui/Button.tsx` — [NEW] 4-variant button with loading state
- `src/components/ui/Card.tsx` — [NEW] Composable Card/CardHeader/CardBody
- `src/components/ui/Input.tsx` — [NEW] Themed TextInput with label/error/helper
- `src/components/ui/LoadingSpinner.tsx` — [NEW] Centered ActivityIndicator
- `src/components/ui/EmptyState.tsx` — [NEW] Icon + title + subtitle placeholder
- `src/components/ui/SkeletonPlaceholder.tsx` — [NEW] Animated pulse placeholder
- `src/components/ui/FadeInView.tsx` — [NEW] Fade + slide-up entrance wrapper
- `src/components/ui/AnimatedPressable.tsx` — [NEW] Spring scale-down feedback
- `src/components/ui/index.ts` — Updated barrel export (8 primitives)
- `src/components/index.ts` — Added `export * from './ui'`

### Phase 3: Tab Icon Replacement

- `src/navigation/AppNavigator.tsx` — Replaced emoji Text icons with `Ionicons` from `@expo/vector-icons`. Added `@expo/vector-icons` dependency.

### Phase 4: Theme Fix & Style Consistency

- `src/components/SummaryCard.tsx` — Replaced all hardcoded colors/sizes with theme tokens
- `src/screens/AddExpenseScreen.tsx` — Replaced hardcoded values, integrated `Button` + `AnimatedPressable` primitives
- `src/components/TransactionList.tsx` — Replaced `marginRight: 14` → `Spacing.base`
- `src/screens/HistoryScreen.tsx` — Replaced `paddingVertical: 10` → `Spacing.md`

### Phase 5: Dashboard Polish

- `src/screens/DashboardScreen.tsx` — Added `FadeInView` entrance animation (staggered), `ScrollView` with `RefreshControl` for pull-to-refresh, `SkeletonPlaceholder` loading state, `EmptyState` for empty data

### Phase 6: History Polish

- `src/screens/HistoryScreen.tsx` — Added `RefreshControl` for pull-to-refresh, `EmptyState` component for empty list

### Phase 7: AddExpense & Settings Polish

- `src/hooks/useAddExpense.ts` — Added success `Alert.alert('Saved!')` before `navigation.goBack()`
- `src/screens/AddExpenseScreen.tsx` — Integrated `AnimatedPressable` for category chips
- `src/screens/SettingsScreen.tsx` — Refactored to use `Card`/`CardHeader`/`CardBody`/`Button` primitives

### Phase 8: Barrel Exports & Accessibility

- `src/components/index.ts` — Added UI primitives re-export
- `src/screens/SettingsScreen.tsx` — Added accessibility props to Switch and Button

### Phase 9: Verification & Test Fixes

- `src/hooks/__tests__/useAddExpense.test.ts` — Updated for Alert-based goBack flow
- `src/screens/__tests__/AddExpenseScreen.test.tsx` — Updated for Button spinner behavior
- `src/navigation/__tests__/AppNavigator.test.tsx` — Added `@expo/vector-icons` mock

## Quality Gates

- ✅ `npm run typecheck` — 0 errors
- ✅ `npm run lint` — 0 errors
- ✅ `npm run format:check` — All files formatted
- ✅ `npm run test` — 14/14 suites, 57/57 tests pass
