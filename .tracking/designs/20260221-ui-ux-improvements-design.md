# Design: UI/UX Experience Improvements

## 1. Overview

A comprehensive UI/UX overhaul to make the Personal Expense Tracker feel smooth, fast, and premium. This design addresses gaps identified across the 4 existing screens and 2 shared components, grouped into **6 improvement areas**.

> [!NOTE]
> This design follows the Architect workflow: **no code is written here** — only specifications. After approval, use `/task-planner` to generate the implementation plan.

---

## 2. Current State Analysis

### What Exists

| Area              | Current State                                                                 |
| ----------------- | ----------------------------------------------------------------------------- |
| **Screens**       | `DashboardScreen`, `AddExpenseScreen`, `HistoryScreen`, `SettingsScreen`      |
| **Components**    | `SummaryCard`, `TransactionList` / `TransactionItem`                          |
| **UI Primitives** | `src/components/ui/index.ts` exists but is **empty** — no reusable primitives |
| **Theme**         | Solid light/dark token system in `theme.ts` ✅                                |
| **Navigation**    | Bottom tabs with `@react-navigation/bottom-tabs`                              |
| **State**         | Zustand store + service layer ✅                                              |

### Identified UI/UX Gaps

| #   | Gap                                                                                                            | Impact                                             |
| --- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | **No animations or transitions** — screens mount instantly with no visual feedback                             | App feels static, lifeless                         |
| 2   | **Emoji tab icons** — `🏠 ➕ 📋 ⚙️` render inconsistently across devices                                       | Unprofessional look                                |
| 3   | **No reusable UI primitives** — no `Button`, `Card`, `Input`, `LoadingSpinner`                                 | Code duplication, inconsistent styling             |
| 4   | **Hardcoded styles in components** — `SummaryCard` uses raw hex (`#FFFFFF`, `rgba(…)`) instead of theme tokens | Dark mode breakage risk                            |
| 5   | **No loading / empty states** — no skeleton loaders, no illustrated empty states                               | Dead-feeling UI when loading or no data            |
| 6   | **No pull-to-refresh** on Dashboard or History                                                                 | Missing expected mobile pattern                    |
| 7   | **`FlatList` instead of `FlashList`** in `TransactionList`                                                     | Slower for long lists (skill mandates `FlashList`) |
| 8   | **No haptic/tactile feedback** on key actions (save, delete, tab switch)                                       | Reduced perceived responsiveness                   |
| 9   | **No success feedback** after adding expense — silently navigates back                                         | User unclear if action succeeded                   |
| 10  | **No accessibility hints** on several interactive elements                                                     | Accessibility gaps                                 |

---

## 3. Architecture Changes

### Improvement Area 1: Reusable UI Primitives

Create foundational components in `src/components/ui/` that every screen will consume.

- **New Components**:
  - `src/components/ui/Button.tsx` — Primary, Secondary, Destructive, Ghost variants; supports `isLoading` prop
  - `src/components/ui/Card.tsx` — Composable card with `Card`, `CardHeader`, `CardBody` sub-components
  - `src/components/ui/Input.tsx` — Themed `TextInput` wrapper with error state, label, and helper text
  - `src/components/ui/LoadingSpinner.tsx` — Centered `ActivityIndicator` using `colors.primary`
  - `src/components/ui/EmptyState.tsx` — Icon + title + subtitle for empty lists
  - `src/components/ui/SkeletonPlaceholder.tsx` — Shimmer/pulse animation for loading states
- **Modified Files**: `src/components/ui/index.ts` — barrel re-export all new primitives

> Reuse `useAppTheme()`, `Spacing`, `Typography`, `BorderRadius`, `Shadows` from theme. No hardcoded values.

---

### Improvement Area 2: Tab Icons with `expo-vector-icons`

Replace emoji tab icons with proper `Ionicons` from `expo-vector-icons` (bundled with Expo, **no new dependency**).

- **Modified Files**:
  - `src/navigation/AppNavigator.tsx` — Replace emoji `Text` component with `<Ionicons>` for each tab

| Tab       | Current | Proposed Icon                       |
| --------- | ------- | ----------------------------------- |
| Dashboard | 🏠      | `home-outline` / `home`             |
| Add       | ➕      | `add-circle-outline` / `add-circle` |
| History   | 📋      | `time-outline` / `time`             |
| Settings  | ⚙️      | `settings-outline` / `settings`     |

---

### Improvement Area 3: Animations & Micro-interactions

Add smooth entrance animations and tactile feedback using **React Native's built-in `Animated` API** (no new dependency required).

- **New Components**:
  - `src/components/ui/FadeInView.tsx` — Reusable fade+slide-up wrapper for screen entrances
  - `src/components/ui/AnimatedPressable.tsx` — `Pressable` with scale-down on press (spring animation)
- **Modified Files**:
  - `src/screens/DashboardScreen.tsx` — Wrap `SummaryCard` and section in `FadeInView`
  - `src/screens/AddExpenseScreen.tsx` — Animate category chip selection
  - `src/components/TransactionList.tsx` — Staggered fade-in for list items
  - `src/components/SummaryCard.tsx` — Subtle scale animation on mount

> **Performance**: All animations use `useNativeDriver: true` for 60fps. Use `APP_CONFIG.animation.normal` (300ms) from `config.ts` for duration consistency.

---

### Improvement Area 4: Loading States & Feedback

Transform dead-silence loading into visual skeleton states and provide clear success/error feedback.

- **Modified Files**:
  - `src/screens/DashboardScreen.tsx` — Show `SkeletonPlaceholder` while `isLoading`, show `EmptyState` when `items.length === 0`
  - `src/screens/HistoryScreen.tsx` — Same skeleton + empty state treatment
  - `src/screens/AddExpenseScreen.tsx` — Disable button with spinner via `Button` `isLoading` prop; show success toast/alert after save
  - `src/hooks/useAddExpense.ts` — Add success alert: `"Expense saved!"` before `navigation.goBack()`
  - `src/store/useExpenseStore.ts` — No changes needed (already exposes `isLoading`)

---

### Improvement Area 5: Pull-to-Refresh

Add native pull-to-refresh on scrollable list screens.

- **Modified Files**:
  - `src/screens/DashboardScreen.tsx` — Wrap content in `ScrollView` with `refreshControl`; use `RefreshControl` connected to `refreshExpenses()`
  - `src/screens/HistoryScreen.tsx` — Add `refreshControl` prop to `SectionList`

---

### Improvement Area 6: Theme Fix & Style Consistency

Fix hardcoded colors and ensure all components use theme tokens exclusively.

- **Modified Files**:
  - `src/components/SummaryCard.tsx`:
    - Replace `color: '#FFFFFF'` → use a `colors.onPrimary` token (or inline white, since card bg is `colors.primary`)
    - Replace `color: 'rgba(255,255,255,0.8)'` → define `onPrimaryMuted` or use opacity pattern
    - Replace hardcoded `padding: 24` → `Spacing.xl`
    - Replace hardcoded `marginBottom: 24` → `Spacing.xl`
    - Replace hardcoded `fontSize: 14/36/12` → `Typography.fontSize.*`
    - Replace hardcoded `borderRadius: 20` → `BorderRadius.xl`
  - `src/constants/theme.ts` — Add `onPrimary` color token (white/#FFFFFF for both light/dark since it sits on `primary` background)
  - `src/screens/AddExpenseScreen.tsx`:
    - Replace `borderRadius: 12` → `BorderRadius.md`
    - Replace `gap: 10` → `Spacing.md` (12) or `Spacing.sm` (8)
    - Replace hardcoded `minWidth: '30%'` → keep (layout constraint)
    - Replace `paddingVertical: 10, paddingHorizontal: 14` → `Spacing.md` / `Spacing.base`
    - Replace `fontSize: 48` → `Typography.fontSize['3xl']` (36) or add `'4xl': 48` to typography scale
    - Replace `borderRadius: 20` → `BorderRadius.xl`
    - Replace `borderRadius: 14` → `BorderRadius.md`
    - Replace `paddingBottom: 100` → `Spacing['5xl']` + `Spacing['3xl']` or use a named constant
  - `src/screens/HistoryScreen.tsx` — Replace `paddingVertical: 10` → `Spacing.md`
  - `src/navigation/AppNavigator.tsx` — Replace `fontSize: 20` → `Typography.fontSize.lg`
  - `src/components/TransactionList.tsx` — Replace `marginRight: 14` → `Spacing.base` (16) or add intermediate token

---

## 4. Data Flow (No Changes)

The existing data flow remains untouched:

```
Screen → calls hooks → hooks call store/services → services access SQLite via Drizzle
  ↓
  renders components (receive data via props)
```

All UI/UX changes are **presentational only** — no schema, service, or store modifications (except minor `isLoading` consumption).

---

## 5. Detailed Implementation Steps

- [ ] **Step 1**: Theme Token Additions — Add `onPrimary`, `onPrimaryMuted` to `Colors.light` and `Colors.dark` in `theme.ts`. Optionally add `fontSize['4xl']` for 48px amount input.
- [ ] **Step 2**: UI Primitives — Create `Button`, `Card`, `Input`, `LoadingSpinner`, `EmptyState`, `SkeletonPlaceholder`, `FadeInView`, `AnimatedPressable` in `src/components/ui/`
- [ ] **Step 3**: Tab Icons — Replace emoji icons with Ionicons in `AppNavigator.tsx`
- [ ] **Step 4**: SummaryCard Fix — Remove all hardcoded values, use theme tokens
- [ ] **Step 5**: Dashboard Polish — Add FadeInView, skeleton, empty state, pull-to-refresh
- [ ] **Step 6**: History Polish — Add skeleton, empty state, pull-to-refresh
- [ ] **Step 7**: AddExpense Polish — Use `Button`, `Input` primitives; animate category selection; add success feedback
- [ ] **Step 8**: Settings Polish — Use `Card` primitive for sections, use `Button` for destructive action
- [ ] **Step 9**: TransactionList — Replace hardcoded values with theme tokens

---

## 6. New Dependencies

> [!IMPORTANT]
> **No new npm dependencies are required.** All improvements use:
>
> - `react-native` built-in `Animated` API
> - `expo-vector-icons` (already bundled with Expo SDK 54)
> - Existing theme system and patterns

---

## 7. Verification Plan

### Automated Tests

- Run existing test suite to ensure no regressions:
  ```bash
  npm run test
  ```
- Run quality gates:
  ```bash
  npm run typecheck
  npm run lint
  npm run format:check
  ```

### Manual Verification

- **Visual inspection**: Launch the app with `npx expo start --ios` (or `--android`), visually verify:
  1. Tab bar shows proper icons (not emojis)
  2. Dashboard animations play on mount
  3. Pull-to-refresh works on Dashboard and History
  4. Empty state renders when no expenses exist
  5. Loading skeleton appears while data loads
  6. Add Expense shows success feedback after saving
  7. Dark mode renders correctly with no hardcoded white text on light backgrounds
  8. All `SummaryCard` styles use theme tokens

> [!TIP]
> Since this is a presentational/UI change, the most effective verification is visual + manual testing on a device or simulator. The user should confirm the look-and-feel meets their standards.

---

## 8. Files Summary

### New Files (8)

| File                                        | Purpose                                         |
| ------------------------------------------- | ----------------------------------------------- |
| `src/components/ui/Button.tsx`              | Reusable button with variants and loading state |
| `src/components/ui/Card.tsx`                | Composable card primitive                       |
| `src/components/ui/Input.tsx`               | Themed text input with error/label              |
| `src/components/ui/LoadingSpinner.tsx`      | Centered activity indicator                     |
| `src/components/ui/EmptyState.tsx`          | Icon + text for empty lists                     |
| `src/components/ui/SkeletonPlaceholder.tsx` | Shimmer animation placeholder                   |
| `src/components/ui/FadeInView.tsx`          | Reusable fade + slide entrance wrapper          |
| `src/components/ui/AnimatedPressable.tsx`   | Pressable with spring scale feedback            |

### Modified Files (11)

| File                                 | Changes                                              |
| ------------------------------------ | ---------------------------------------------------- |
| `src/constants/theme.ts`             | Add `onPrimary`, `onPrimaryMuted` tokens             |
| `src/components/ui/index.ts`         | Barrel-export all new primitives                     |
| `src/components/SummaryCard.tsx`     | Replace hardcoded styles with theme tokens           |
| `src/components/TransactionList.tsx` | Replace hardcoded values, optional stagger animation |
| `src/navigation/AppNavigator.tsx`    | Ionicons instead of emojis                           |
| `src/screens/DashboardScreen.tsx`    | FadeInView, skeleton, empty state, pull-to-refresh   |
| `src/screens/HistoryScreen.tsx`      | Skeleton, empty state, pull-to-refresh               |
| `src/screens/AddExpenseScreen.tsx`   | Use primitives, animate categories, success feedback |
| `src/screens/SettingsScreen.tsx`     | Use Card/Button primitives                           |
| `src/hooks/useAddExpense.ts`         | Add success alert before goBack                      |
| `src/components/index.ts`            | Re-export new UI primitives                          |

---

**Design complete. Usage of `/task-planner` is recommended next to generate the implementation plan.**
