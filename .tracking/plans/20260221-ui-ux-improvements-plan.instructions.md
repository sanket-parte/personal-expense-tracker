---
applyTo: '.tracking/changes/20260221-ui-ux-improvements-changes.md'
---

<!-- markdownlint-disable-file -->

# Task Checklist: UI/UX Experience Improvements

## Overview

Overhaul the Personal Expense Tracker's UI/UX across 6 improvement areas: reusable UI primitives, tab icons, animations, loading/empty states, pull-to-refresh, and theme consistency — using zero new npm dependencies.

## Objectives

- Create 8 reusable UI primitive components in `src/components/ui/`
- Replace emoji tab icons with `Ionicons` from `expo-vector-icons`
- Add entrance animations and micro-interactions using built-in `Animated` API
- Implement loading skeletons, empty states, and success feedback
- Add pull-to-refresh on Dashboard and History screens
- Fix all hardcoded styles to use theme tokens

## Research Summary

### Project Files

- `.tracking/designs/20260221-ui-ux-improvements-design.md` — Approved design spec
- `.agent/antigravity/instructions.md` — Agent Instructions
- `.agent/antigravity/project_context.md` — Project Context
- `.agent/skills/mobile-dev/SKILL.md` — React Native patterns
- `.agent/skills/frontend-patterns/SKILL.md` — Component patterns

### External References

- .tracking/research/20260221-ui-ux-improvements-research.md — Comprehensive codebase analysis with verified gap findings

## Implementation Checklist

### [ ] Phase 1: Theme Token Additions

- [ ] Task 1.1: Add `onPrimary` and `onPrimaryMuted` color tokens to `Colors.light` and `Colors.dark` in `theme.ts`
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 9-29)

- [ ] Task 1.2: Add `fontSize['4xl']` (48) to Typography scale
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 31-45)

### [ ] Phase 2: UI Primitives

- [ ] Task 2.1: Create `Button.tsx` with Primary, Secondary, Destructive, Ghost variants and `isLoading` prop
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 49-86)

- [ ] Task 2.2: Create `Card.tsx` with `Card`, `CardHeader`, `CardBody` composition
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 88-112)

- [ ] Task 2.3: Create `Input.tsx` themed TextInput with error state, label, helper text
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 114-142)

- [ ] Task 2.4: Create `LoadingSpinner.tsx` centered ActivityIndicator
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 144-162)

- [ ] Task 2.5: Create `EmptyState.tsx` with icon, title, subtitle
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 164-189)

- [ ] Task 2.6: Create `SkeletonPlaceholder.tsx` with pulse animation
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 191-222)

- [ ] Task 2.7: Create `FadeInView.tsx` fade + slide-up wrapper
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 224-253)

- [ ] Task 2.8: Create `AnimatedPressable.tsx` with spring scale feedback
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 255-286)

- [ ] Task 2.9: Update `src/components/ui/index.ts` barrel to export all new primitives
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 288-302)

### [ ] Phase 3: Tab Icon Replacement

- [ ] Task 3.1: Replace emoji `Text` icons with `Ionicons` in `AppNavigator.tsx`
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 306-334)

### [ ] Phase 4: Theme Fix & Style Consistency

- [ ] Task 4.1: Fix `SummaryCard.tsx` — replace all hardcoded values with theme tokens
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 338-366)

- [ ] Task 4.2: Fix `AddExpenseScreen.tsx` — replace hardcoded values with theme tokens, use `Button` primitive
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 368-399)

- [ ] Task 4.3: Fix `TransactionList.tsx` — replace hardcoded `marginRight` with theme token
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 401-416)

- [ ] Task 4.4: Fix `HistoryScreen.tsx` — replace hardcoded `paddingVertical` with theme token
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 418-431)

### [ ] Phase 5: Screen Polish — Dashboard

- [ ] Task 5.1: Add `FadeInView` entrance animation on Dashboard
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 435-453)

- [ ] Task 5.2: Add pull-to-refresh using `RefreshControl` on Dashboard
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 455-479)

- [ ] Task 5.3: Add loading skeleton and enhanced empty state on Dashboard
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 481-505)

### [ ] Phase 6: Screen Polish — History

- [ ] Task 6.1: Add pull-to-refresh to `SectionList` in HistoryScreen
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 509-525)

- [ ] Task 6.2: Add enhanced empty state with `EmptyState` component
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 527-543)

### [ ] Phase 7: Screen Polish — AddExpense & Settings

- [ ] Task 7.1: Add success feedback in `useAddExpense.ts` after saving
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 547-564)

- [ ] Task 7.2: Polish `AddExpenseScreen.tsx` — use `AnimatedPressable` for category chips
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 566-585)

- [ ] Task 7.3: Polish `SettingsScreen.tsx` — use `Card` and `Button` primitives
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 587-608)

### [ ] Phase 8: Barrel Exports & Accessibility

- [ ] Task 8.1: Update `src/components/index.ts` to re-export UI primitives
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 612-622)

- [ ] Task 8.2: Add missing `accessibilityLabel` / `accessibilityHint` across all screens
  - Details: .tracking/details/20260221-ui-ux-improvements-details.md (Lines 624-640)

### [ ] Phase 9: Verification

- [ ] Task 9.1: Run automated quality gates (`typecheck`, `lint`, `format:check`)
- [ ] Task 9.2: Run existing test suite (`npm run test`)
- [ ] Task 9.3: Manual visual verification on simulator

## Dependencies

- Expo SDK 54 (already installed)
- `expo-vector-icons` (bundled with Expo — no install needed)
- React Native `Animated` API (built-in)
- React Native `RefreshControl` (built-in)

## Success Criteria

- All 8 UI primitives created and exported via barrel
- Tab bar uses vector `Ionicons` on all 4 tabs
- Entrance animations visible on Dashboard mount
- Pull-to-refresh functional on Dashboard and History
- Zero hardcoded color/spacing values in any component
- `npm run typecheck && npm run lint && npm run format:check` passes
- Existing test suite passes without regression
