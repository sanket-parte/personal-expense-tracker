---
name: mobile-dev
description: Comprehensive guide for React Native mobile application development using Expo.
---

# React Native Mobile Development Skill

## Overview

Best practices, tools, and patterns for building the Personal Finance App using React Native with Expo managed workflow.

## Tech Stack

| Category | Choice | Notes |
|---|---|---|
| **Framework** | React Native via Expo SDK 54 | New Architecture enabled |
| **Navigation** | Expo Router (file-based) or React Navigation (Native Stack) | Decide before first screen |
| **State Management** | Zustand (recommended) or React Context | Context for simple; Zustand for multi-screen shared state |
| **Styling** | `StyleSheet.create()` + centralized theme tokens | See Theme System below |
| **Storage** | `AsyncStorage` (default) or `MMKV` (performance) | Local-first MVP |
| **Icons** | `expo-vector-icons` (Ionicons, MaterialIcons) | Bundled with Expo |
| **Lists** | `FlashList` (Shopify) or optimized `FlatList` | Always prefer `FlashList` for long lists |

## Project Structure

```
/src
  App.tsx                 # Root component (providers, global wrappers)
  /components
    /ui                   # Primitive components (Button, Card, Input)
    /forms                # Form-specific components
  /screens                # Screen components
  /hooks                  # Custom React hooks (useAppTheme, etc.)
  /services               # API services, storage, data access logic
  /utils                  # Pure helper/utility functions
  /constants              # Theme, config, env — barrel-exported via index.ts
    config.ts             # APP_CONFIG (app name, version, animation, pagination)
    env.ts                # Environment variables via Expo Constants
    theme.ts              # Colors, Typography, Spacing, BorderRadius, Shadows
  /types                  # Shared TypeScript interfaces and type definitions
  /assets                 # Images, fonts (if co-located with source)
```

> Every directory under `/src` MUST have a barrel `index.ts` that re-exports its public API.

### Path Aliases

Use `@/` instead of relative `../../` paths for cross-module imports:

```tsx
// ✅ GOOD
import { APP_CONFIG, Spacing } from '@/constants';
import { useAppTheme } from '@/hooks';

// ❌ BAD
import { Spacing } from '../../constants/theme';
```

Alias is configured in both `tsconfig.json` (`paths`) and `babel.config.js` (`module-resolver`).

## Theme System

All visual tokens are centralized in `src/constants/theme.ts`. **Never hardcode** values.

### Available Token Objects

| Object | Examples | Usage |
|---|---|---|
| `Colors.light.*` / `Colors.dark.*` | `primary`, `background`, `surface`, `text`, `error` | Always access via `useAppTheme().colors` |
| `Typography` | `fontSize.base`, `fontWeight.bold`, `lineHeight.md` | Font sizing and weight |
| `Spacing` | `xs` (4), `sm` (8), `md` (12), `base` (16), `xl` (24) | Margins, padding |
| `BorderRadius` | `sm` (8), `md` (12), `lg` (16), `full` (9999) | Corner rounding |
| `Shadows` | `sm`, `md`, `lg` | Elevation / shadow presets |

### Dark Mode

The app uses system-automatic dark mode via the `useAppTheme()` hook:

```tsx
const { colors, isDark } = useAppTheme();

<View style={[styles.container, { backgroundColor: colors.background }]}>
  <Text style={[styles.title, { color: colors.text }]}>Hello</Text>
</View>
```

- Static styles → `StyleSheet.create()` at the bottom of the file
- Dynamic (theme) styles → inline style arrays `[styles.x, { color: colors.y }]`

## Component Development

- **Functional components only** — no class components.
- **TypeScript** — strict mode, interfaces for props, `as const` for config objects.
- **Destructure props** in the function signature.
- **Named exports** from barrel files; `default export` only for `App.tsx`.
- **JSDoc header** at the top of every file explaining its purpose.
- **Extract sub-components** when a file exceeds ~150 lines.

```tsx
/**
 * ExpenseCard
 *
 * Displays a single expense item with amount, category, and date.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BorderRadius, Shadows, Spacing, Typography } from '@/constants';
import { useAppTheme } from '@/hooks';
import type { Expense } from '@/types';

interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
}

export function ExpenseCard({ expense, onPress }: ExpenseCardProps): React.JSX.Element {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: colors.surface }, Shadows.md]}
      accessibilityLabel={`Expense: ${expense.description}`}
      accessibilityHint="Tap to view details"
    >
      <Text style={[styles.amount, { color: colors.primary }]}>
        ₹{expense.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  amount: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
});
```

## SOLID Architecture

Apply SOLID principles as a design mindset for maintainable, extensible code:

### Single Responsibility (S)
- **Components** render UI — nothing else. No data fetching, no business logic, no formatting.
- **Hooks** encapsulate one concern (e.g., `useExpenses` manages expense state, `useAppTheme` provides colors).
- **Services** (`src/services/`) handle data access (storage, API calls).
- **Utils** (`src/utils/`) are pure functions (formatting, calculations).

```
Screen  →  calls hooks  →  hooks call services  →  services access storage/API
  ↓
  renders components (receive data via props)
```

### Open/Closed (O)
- Extend components via **props and children composition**, not by adding conditionals inside them.
- Use the **slot pattern**: `<Card header={<Icon />}>content</Card>` instead of `<Card showIcon iconName="star">`.

### Liskov Substitution (L)
- If two components implement the same `Props` interface, they must be interchangeable.
- Example: `PrimaryButton` and `OutlineButton` both satisfy `ButtonProps` → any parent using `ButtonProps` works with either.

### Interface Segregation (I)
- Keep props interfaces **small and focused**. Split large interfaces into composable ones.
- ❌ `TransactionItemProps` with 12 optional props.
- ✅ `BaseTransactionProps` + `SwipeableProps` + `SelectableProps` combined only where needed.

### Dependency Inversion (D)
- Screens and components **never** call `AsyncStorage`, `fetch`, or any concrete implementation directly.
- Always go through the service layer or hooks:

```tsx
// ❌ BAD — screen depends on concrete storage
const data = await AsyncStorage.getItem('expenses');

// ✅ GOOD — screen depends on abstraction
const { expenses } = useExpenses(); // hook calls expenseService internally
```

## Performance

- Use `FlashList` (Shopify) or optimized `FlatList` for long lists.
- Memoize expensive computations with `useMemo`.
- Stabilize callbacks with `useCallback` — especially those passed to child components.
- **Never** use anonymous functions in `renderItem` or `keyExtractor`.
- Optimize images (appropriate formats, sizes, caching).
- Use `React.memo` for pure components that re-render unnecessarily.

## Accessibility

- Every `TouchableOpacity` / `Pressable` must have `accessibilityLabel` and `accessibilityHint`.
- Use semantic `accessibilityRole` values (`button`, `header`, `link`, etc.).
- Test with VoiceOver (iOS) and TalkBack (Android).
- Ensure minimum touch target of 44×44 points.

## Testing

- Unit testing with **Jest** + **React Native Testing Library**.
- Snapshot testing for critical UI components.
- Run `npm run typecheck` and `npm run lint` before considering any work complete.

## Quality Gates

Before any task is considered complete:

```bash
npm run typecheck     # TypeScript strict checking
npm run lint          # ESLint v9 flat config
npm run format:check  # Prettier formatting
```

Install new dependencies via `npx expo install <package>` (for Expo-compatible version resolution).
