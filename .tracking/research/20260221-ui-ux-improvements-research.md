<!-- markdownlint-disable-file -->

# Research: UI/UX Experience Improvements

## Research Date: 2026-02-21

## 1. Project Structure Analysis

### Current Files Analyzed

| File                                 | Lines | Purpose                                               |
| ------------------------------------ | ----- | ----------------------------------------------------- |
| `src/screens/DashboardScreen.tsx`    | 115   | Main landing screen — summary + recent transactions   |
| `src/screens/AddExpenseScreen.tsx`   | 274   | New expense entry form                                |
| `src/screens/HistoryScreen.tsx`      | 92    | Full transaction history (SectionList by date)        |
| `src/screens/SettingsScreen.tsx`     | 138   | Appearance + data management                          |
| `src/components/SummaryCard.tsx`     | 60    | Total expenses card                                   |
| `src/components/TransactionList.tsx` | 136   | FlatList + TransactionItem                            |
| `src/components/index.ts`            | 3     | Barrel export                                         |
| `src/components/ui/index.ts`         | 11    | **Empty** — placeholder only                          |
| `src/constants/theme.ts`             | 148   | Colors, Typography, Spacing, BorderRadius, Shadows    |
| `src/constants/config.ts`            | 41    | APP_CONFIG with animation/timing/pagination constants |
| `src/constants/categories.ts`        | 23    | 8 expense categories with emoji icons + colors        |
| `src/hooks/useAppTheme.ts`           | 30    | Theme hook (light/dark from system)                   |
| `src/hooks/useAddExpense.ts`         | 71    | Add expense form state + validation                   |
| `src/store/useExpenseStore.ts`       | 61    | Zustand store (items, isLoading, error, actions)      |
| `src/navigation/AppNavigator.tsx`    | 43    | Bottom tab navigator with emoji icons                 |
| `src/navigation/RootNavigator.tsx`   | 23    | Root stack with NavigationContainer                   |
| `src/App.tsx`                        | 19    | SafeAreaProvider + RootNavigator                      |
| `src/db/schema.ts`                   | 23    | Drizzle schema: expenses table                        |

### Dependencies (from package.json)

Runtime: `expo@54`, `react-native@0.81.5`, `react@19.1.0`, `@react-navigation/bottom-tabs@^7.14.0`, `@react-navigation/native@^7.1.28`, `zustand@^5.0.11`, `date-fns@^4.1.0`, `drizzle-orm@^0.45.1`, `expo-constants`, `expo-sqlite`, `react-native-safe-area-context@^5.6.2`, `react-native-screens@~4.16.0`

**Available but unused**: `expo-vector-icons` (bundled with Expo SDK 54 — no install needed), `Animated` API (built into RN)

## 2. Codebase Gap Analysis — Verified Findings

### Gap 1: No Reusable UI Primitives

`src/components/ui/index.ts` (Lines 1-11) is a placeholder with only comments. No `Button`, `Card`, `Input`, `LoadingSpinner` components exist. Each screen creates its own ad-hoc pressables and views.

**Evidence**:

- `AddExpenseScreen.tsx` (L150-165): Inline `Pressable` for save button with manual opacity/styling
- `SettingsScreen.tsx` (L74-86): Inline `Pressable` for destructive action
- `DashboardScreen.tsx` (L59-65): Inline `Pressable` for "See All"

### Gap 2: Emoji Tab Icons

`AppNavigator.tsx` (L11-16): Uses `TAB_ICONS` record mapping screen names to emoji strings (`🏠`, `➕`, `📋`, `⚙️`). Rendered via `<Text style={{ fontSize: 20, color }}>`.

**Problem**: Emoji rendering varies by OS version and device. Not tintable. Unprofessional for a production app.

**Solution**: `expo-vector-icons` comes bundled with Expo SDK 54. Import `Ionicons` and use proper vector icons.

### Gap 3: No Animations or Transitions

Zero usage of `Animated`, `LayoutAnimation`, or `react-native-reanimated` across the codebase. Verified via grep: no imports of animation-related modules.

**APP_CONFIG already defines animation durations** (`config.ts` L22-26):

```ts
animation: { fast: 150, normal: 300, slow: 500 }
```

These are defined but never consumed anywhere in the codebase.

### Gap 4: Hardcoded Styles in SummaryCard

`SummaryCard.tsx` (L34-58):

- `borderRadius: 20` — should be `BorderRadius.xl`
- `padding: 24` — should be `Spacing.xl`
- `marginBottom: 24` — should be `Spacing.xl`
- `fontSize: 14` — should be `Typography.fontSize.sm` (13) or `Typography.fontSize.base` (15)
- `fontSize: 36` — should be `Typography.fontSize['3xl']`
- `fontSize: 12` — should be `Typography.fontSize.xs` (11)
- `color: '#FFFFFF'` — hardcoded white
- `color: 'rgba(255,255,255,0.8)'` — hardcoded white with opacity

### Gap 5: Hardcoded Styles in AddExpenseScreen

`AddExpenseScreen.tsx`:

- L219: `borderRadius: 12` → `BorderRadius.md`
- L233: `gap: 10` → `Spacing.sm` (8) or `Spacing.md` (12)
- L239-240: `paddingVertical: 10, paddingHorizontal: 14` → `Spacing.md`, `Spacing.base`
- L214: `fontSize: 48` → Not in Typography scale; add `'4xl': 48`
- L243: `borderRadius: 20` → `BorderRadius.xl`
- L265: `borderRadius: 14` → `BorderRadius.md`
- L197: `paddingBottom: 100` → `Spacing['5xl']` + `Spacing['3xl']`
- L269: `color: '#FFFFFF'` → Use `onPrimary` token

### Gap 6: Hardcoded Styles in Other Files

`HistoryScreen.tsx` (L76): `paddingVertical: 10` → `Spacing.md`
`TransactionList.tsx` (L108): `marginRight: 14` → `Spacing.base` (16)
`AppNavigator.tsx` (L32): `fontSize: 20` → `Typography.fontSize.lg`

### Gap 7: No Loading or Empty States

- `DashboardScreen.tsx`: No loading indicator while `refreshExpenses()` runs. Empty state is handled by `TransactionList.ListEmptyComponent` but is plain text only.
- `HistoryScreen.tsx`: Has `ListEmptyComponent` but plain text with no illustration/icon.
- No skeleton loading patterns anywhere.
- Zustand store exposes `isLoading` (L7) but screens don't consume it for visual loading states.

### Gap 8: No Pull-to-Refresh

- `DashboardScreen.tsx`: Content is a plain `View`, not scrollable. `TransactionList` has `scrollEnabled={false}`.
- `HistoryScreen.tsx`: `SectionList` has no `refreshControl` prop.

### Gap 9: No Success Feedback After Adding Expense

`useAddExpense.ts` (L45-55): On success, calls `navigation.goBack()` silently. No toast, alert, or visual confirmation that the expense was saved.

### Gap 10: Missing Accessibility

- `SettingsScreen.tsx` L74-82: `Pressable` for "Clear All Data" has `testID` but no `accessibilityLabel` / `accessibilityHint`
- `HistoryScreen.tsx` L39: `TransactionItem` rendered without `accessibilityLabel`

## 3. Existing Patterns to Follow

### Theme System Pattern (Correct Usage)

```tsx
const { colors } = useAppTheme();
<View style={[styles.container, { backgroundColor: colors.background }]}>
```

### Component Conventions

- Functional components with named exports
- JSDoc header at top of every file
- `StyleSheet.create()` at bottom of file
- Dynamic (theme) styles via inline style arrays

### Testing Pattern (from DashboardScreen.test.tsx)

- Mock `@react-navigation/native` with `useNavigation` returning mock navigate
- Mock `@/store/useExpenseStore` with selector pattern
- Mock `@/hooks` with `useAppTheme` returning colors
- Test rendering, navigation, and theme variants

## 4. Available Tools (No New Dependencies)

| Tool                   | Source                        | Use For                       |
| ---------------------- | ----------------------------- | ----------------------------- |
| `Animated` API         | `react-native` (built-in)     | Fade, slide, scale animations |
| `Ionicons`             | `expo-vector-icons` (bundled) | Tab bar icons                 |
| `RefreshControl`       | `react-native` (built-in)     | Pull-to-refresh               |
| `ActivityIndicator`    | `react-native` (built-in)     | Loading spinners              |
| `APP_CONFIG.animation` | `src/constants/config.ts`     | Animation duration constants  |

## 5. Design Document Reference

Full design specification: `.tracking/designs/20260221-ui-ux-improvements-design.md`
