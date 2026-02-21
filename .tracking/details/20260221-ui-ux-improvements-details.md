<!-- markdownlint-disable-file -->

# Task Details: UI/UX Experience Improvements

## Research Reference

**Source Research**: .tracking/research/20260221-ui-ux-improvements-research.md
**Design Spec**: .tracking/designs/20260221-ui-ux-improvements-design.md

## Phase 1: Theme Token Additions

### Task 1.1: Add `onPrimary` and `onPrimaryMuted` color tokens

Add two new color tokens that represent text/icon color when rendered on a `primary`-colored background. These are needed by `SummaryCard` and `Button` to avoid hardcoded white.

- **Files**:
  - `src/constants/theme.ts` — Add `onPrimary: '#FFFFFF'` and `onPrimaryMuted: 'rgba(255,255,255,0.8)'` to both `Colors.light` and `Colors.dark`
- **Success**:
  - `onPrimary` and `onPrimaryMuted` exist in both light and dark color objects
  - `ThemeColors` type automatically includes the new keys (inferred from `Colors.light`)
  - `npm run typecheck` passes
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 56-65) — SummaryCard hardcoded colors
- **Dependencies**:
  - None (first task)

### Task 1.2: Add `fontSize['4xl']` to Typography scale

Add a `'4xl': 48` entry to `Typography.fontSize` for the large amount input on AddExpenseScreen.

- **Files**:
  - `src/constants/theme.ts` — Add `'4xl': 48` after `'3xl': 36` in `Typography.fontSize`
- **Success**:
  - `Typography.fontSize['4xl']` resolves to `48`
  - `npm run typecheck` passes
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 68-75) — AddExpenseScreen hardcoded fontSize

## Phase 2: UI Primitives

### Task 2.1: Create `Button.tsx`

Create a reusable button component with variant support and loading state.

- **Files**:
  - `src/components/ui/Button.tsx` — New file
- **Props Interface**:
  ```tsx
  interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
    isLoading?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    testID?: string;
  }
  ```
- **Implementation Notes**:
  - Use `Pressable` (not `TouchableOpacity`)
  - Map variant to background: `primary` → `colors.primary`, `secondary` → `colors.surface`, `destructive` → `colors.error`, `ghost` → `transparent`
  - Map variant to text color: `primary` → `colors.onPrimary`, `secondary` → `colors.text`, `destructive` → `colors.onPrimary`, `ghost` → `colors.primary`
  - When `isLoading=true`: Show `ActivityIndicator` instead of text, disable press
  - Use `StyleSheet.create`, theme tokens only
  - JSDoc header required
- **Success**:
  - Component renders all 4 variants correctly
  - Loading state shows spinner
  - Disabled state reduces opacity
  - Accessibility props forwarded
- **Dependencies**:
  - Phase 1 (for `onPrimary` token)

### Task 2.2: Create `Card.tsx`

Composable card primitive following the Compound Component pattern from `frontend-patterns` skill.

- **Files**:
  - `src/components/ui/Card.tsx` — New file
- **Components**:
  - `Card` — Outer container with `colors.surface` bg, `BorderRadius.lg`, `Shadows.md`
  - `CardHeader` — Padded header area
  - `CardBody` — Padded body area
- **Implementation Notes**:
  - Accept `variant?: 'default' | 'outlined'` on Card
  - Use composition pattern: `<Card><CardHeader/><CardBody/></Card>`
  - All three exported as named exports
- **Success**:
  - Card renders with theme-aware surface color
  - CardHeader and CardBody add proper spacing
- **Dependencies**:
  - Phase 1

### Task 2.3: Create `Input.tsx`

Themed TextInput wrapper with label, error, and helper text support.

- **Files**:
  - `src/components/ui/Input.tsx` — New file
- **Props Interface**:
  ```tsx
  interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    helperText?: string;
  }
  ```
- **Implementation Notes**:
  - Wrap React Native `TextInput`
  - Show label above input in `colors.textSecondary`
  - Error border: `colors.error`, error text below in `colors.error`
  - Normal border: `colors.border`
  - Background: `colors.surface`
  - Use `forwardRef` for ref forwarding
- **Success**:
  - Input renders with label, error state toggles border color
  - Accessibility label derived from `label` prop
- **Dependencies**:
  - Phase 1

### Task 2.4: Create `LoadingSpinner.tsx`

Centered full-area `ActivityIndicator` using theme primary color.

- **Files**:
  - `src/components/ui/LoadingSpinner.tsx` — New file
- **Props Interface**:
  ```tsx
  interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    color?: string; // Override theme color
  }
  ```
- **Implementation Notes**:
  - Default color: `colors.primary`
  - Centered in a flex container
  - JSDoc header
- **Success**:
  - Renders centered spinner with theme color
- **Dependencies**:
  - None

### Task 2.5: Create `EmptyState.tsx`

Visual placeholder for empty lists with icon, title, and subtitle.

- **Files**:
  - `src/components/ui/EmptyState.tsx` — New file
- **Props Interface**:
  ```tsx
  interface EmptyStateProps {
    icon?: string; // Emoji or text icon
    title: string;
    subtitle?: string;
  }
  ```
- **Implementation Notes**:
  - Centered layout with padding `Spacing['3xl']`
  - Icon rendered large (`Typography.fontSize['3xl']`)
  - Title in `colors.text`, subtitle in `colors.textSecondary`
  - No illustrations (keep it simple, emoji-based icon)
- **Success**:
  - Renders icon, title, and optional subtitle
  - Uses theme colors
- **Dependencies**:
  - None

### Task 2.6: Create `SkeletonPlaceholder.tsx`

Animated pulse placeholder for loading states.

- **Files**:
  - `src/components/ui/SkeletonPlaceholder.tsx` — New file
- **Props Interface**:
  ```tsx
  interface SkeletonPlaceholderProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
  }
  ```
- **Implementation Notes**:
  - Use React Native `Animated` API to create a looping opacity pulse (0.3 → 0.7 → 0.3)
  - Background: `colors.surfaceVariant`
  - Duration: `APP_CONFIG.animation.slow` (500ms) for each half-cycle
  - `useNativeDriver: true` for performance
  - Use `Animated.loop` with `Animated.sequence` of two `Animated.timing` calls
- **Success**:
  - Renders a pulsing rectangle
  - Animation is smooth (native driver)
  - Respects theme colors
- **Dependencies**:
  - None

### Task 2.7: Create `FadeInView.tsx`

Reusable wrapper that fades in + slides up its children on mount.

- **Files**:
  - `src/components/ui/FadeInView.tsx` — New file
- **Props Interface**:
  ```tsx
  interface FadeInViewProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    slideDistance?: number;
  }
  ```
- **Implementation Notes**:
  - Use `Animated.Value` for opacity (0→1) and translateY (slideDistance→0)
  - Default duration: `APP_CONFIG.animation.normal` (300ms)
  - Default slideDistance: `Spacing.lg` (20)
  - `useNativeDriver: true`
  - Animation starts on mount via `useEffect`
  - Support `delay` prop for staggered effects
- **Success**:
  - Children fade in and slide up on mount
  - Delay prop allows staggering
  - Native driver used
- **Dependencies**:
  - None

### Task 2.8: Create `AnimatedPressable.tsx`

Pressable with spring scale-down feedback on press.

- **Files**:
  - `src/components/ui/AnimatedPressable.tsx` — New file
- **Props Interface**:
  ```tsx
  interface AnimatedPressableProps extends PressableProps {
    children: React.ReactNode;
    scaleValue?: number; // Default 0.95
  }
  ```
- **Implementation Notes**:
  - Use `Animated.Value` (1.0) for scale
  - `onPressIn`: spring to `scaleValue` (default 0.95)
  - `onPressOut`: spring back to 1.0
  - Use `Animated.spring` with `useNativeDriver: true`
  - Forward all `PressableProps` (especially `accessibilityLabel`, `accessibilityHint`, `testID`)
- **Success**:
  - Visual scale-down on press
  - Spring-back animation
  - All Pressable props forwarded
- **Dependencies**:
  - None

### Task 2.9: Update `src/components/ui/index.ts` barrel

Update barrel file to export all 8 new UI primitives.

- **Files**:
  - `src/components/ui/index.ts` — Modify
- **Content**:
  ```ts
  export { AnimatedPressable } from './AnimatedPressable';
  export { Button } from './Button';
  export { Card, CardBody, CardHeader } from './Card';
  export { EmptyState } from './EmptyState';
  export { FadeInView } from './FadeInView';
  export { Input } from './Input';
  export { LoadingSpinner } from './LoadingSpinner';
  export { SkeletonPlaceholder } from './SkeletonPlaceholder';
  ```
- **Success**:
  - All primitives importable via `from '@/components/ui'`
- **Dependencies**:
  - Tasks 2.1–2.8

## Phase 3: Tab Icon Replacement

### Task 3.1: Replace emoji icons with Ionicons in `AppNavigator.tsx`

Replace the `TAB_ICONS` emoji record and `<Text>` rendering with proper `Ionicons`.

- **Files**:
  - `src/navigation/AppNavigator.tsx` — Modify
- **Changes**:
  1. Add import: `import { Ionicons } from '@expo/vector-icons';`
  2. Replace `TAB_ICONS` record with icon name mapping:
     ```ts
     const TAB_ICONS: Record<keyof AppTabParamList, { focused: string; unfocused: string }> = {
       Dashboard: { focused: 'home', unfocused: 'home-outline' },
       AddExpense: { focused: 'add-circle', unfocused: 'add-circle-outline' },
       History: { focused: 'time', unfocused: 'time-outline' },
       Settings: { focused: 'settings', unfocused: 'settings-outline' },
     };
     ```
  3. Replace `tabBarIcon` to render `<Ionicons>`:
     ```tsx
     tabBarIcon: ({ color, focused }) => (
       <Ionicons
         name={TAB_ICONS[route.name][focused ? 'focused' : 'unfocused']}
         size={Typography.fontSize.xl}
         color={color}
       />
     ),
     ```
  4. Remove `import { Text } from 'react-native';` if no longer needed
- **Success**:
  - Tab bar shows proper vector icons
  - Focused state shows filled icon, unfocused shows outline
  - `npm run typecheck` passes
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 40-47) — Emoji tab icons gap
- **Dependencies**:
  - None (can be done independently)

## Phase 4: Theme Fix & Style Consistency

### Task 4.1: Fix `SummaryCard.tsx`

Replace all hardcoded values with theme tokens.

- **Files**:
  - `src/components/SummaryCard.tsx` — Modify
- **Changes**:
  - `borderRadius: 20` → `BorderRadius.xl`
  - `padding: 24` → `Spacing.xl`
  - `marginBottom: 24` → `Spacing.xl`
  - `fontSize: 14` → `Typography.fontSize.sm`
  - `fontSize: 36` → `Typography.fontSize['3xl']`
  - `fontSize: 12` → `Typography.fontSize.xs`
  - `fontWeight: '500'` → `Typography.fontWeight.medium`
  - `fontWeight: '700'` → `Typography.fontWeight.bold`
  - `marginBottom: 8` → `Spacing.sm`
  - `marginBottom: 4` → `Spacing.xs`
  - `color: '#FFFFFF'` → Dynamic: `colors.onPrimary`
  - `color: 'rgba(255,255,255,0.8)'` → Dynamic: `colors.onPrimaryMuted`
  - Import `BorderRadius`, `Spacing`, `Typography` from `@/constants/theme`
- **Success**:
  - Zero hardcoded values in StyleSheet
  - Dynamic colors applied via `useAppTheme()`
  - Visual appearance unchanged
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 56-65)
- **Dependencies**:
  - Phase 1 (for `onPrimary` / `onPrimaryMuted` tokens)

### Task 4.2: Fix `AddExpenseScreen.tsx`

Replace hardcoded values with theme tokens and use `Button` primitive for save button.

- **Files**:
  - `src/screens/AddExpenseScreen.tsx` — Modify
- **Changes**:
  - `borderRadius: 12` → `BorderRadius.md`
  - `gap: 10` → `Spacing.md`
  - `paddingVertical: 10` → `Spacing.md`
  - `paddingHorizontal: 14` → `Spacing.base`
  - `fontSize: 48` → `Typography.fontSize['4xl']`
  - `borderRadius: 20` → `BorderRadius.xl`
  - `borderRadius: 14` → `BorderRadius.md`
  - `paddingBottom: 100` → Use calculated value: `Spacing['5xl'] + Spacing['3xl']` (64+40=104) or keep approximate
  - `color: '#FFFFFF'` in `saveButtonText` → `colors.onPrimary`
  - Replace footer save `Pressable` with `<Button>` from UI primitives:
    ```tsx
    <Button
      title={isLoading ? 'Saving...' : 'Save Expense'}
      onPress={handleSave}
      disabled={isDisabled}
      isLoading={isLoading}
      testID="save-button"
      accessibilityLabel="Save expense"
      accessibilityHint="Save the expense entry"
    />
    ```
  - Import `BorderRadius` from `@/constants/theme`
  - Import `Button` from `@/components/ui`
- **Success**:
  - Zero hardcoded numeric/color values
  - Save button uses `Button` primitive
  - Visual appearance unchanged
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 68-76)
- **Dependencies**:
  - Phase 1 (for `fontSize['4xl']`, `onPrimary`)
  - Phase 2 (for `Button` primitive)

### Task 4.3: Fix `TransactionList.tsx`

Replace hardcoded `marginRight: 14` with theme token.

- **Files**:
  - `src/components/TransactionList.tsx` — Modify
- **Changes**:
  - `marginRight: 14` → `Spacing.base` (16, close enough — acceptable deviation)
- **Success**:
  - No hardcoded dimension values
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 81-82)
- **Dependencies**:
  - None

### Task 4.4: Fix `HistoryScreen.tsx`

Replace hardcoded `paddingVertical: 10` with theme token.

- **Files**:
  - `src/screens/HistoryScreen.tsx` — Modify
- **Changes**:
  - `paddingVertical: 10` → `Spacing.md` (12)
- **Success**:
  - No hardcoded dimension values
- **Research References**:
  - .tracking/research/20260221-ui-ux-improvements-research.md (Lines 79-80)
- **Dependencies**:
  - None

## Phase 5: Screen Polish — Dashboard

### Task 5.1: Add `FadeInView` entrance animation

Wrap the `SummaryCard` and content section in `FadeInView` for a smooth entrance.

- **Files**:
  - `src/screens/DashboardScreen.tsx` — Modify
- **Changes**:
  - Import `FadeInView` from `@/components/ui`
  - Wrap `<SummaryCard>` in `<FadeInView>`
  - Wrap recent activity section in `<FadeInView delay={100}>`
- **Success**:
  - Dashboard content fades in and slides up on mount
  - Staggered effect between summary and transactions
- **Dependencies**:
  - Phase 2 (FadeInView)

### Task 5.2: Add pull-to-refresh on Dashboard

Wrap Dashboard content in a ScrollView with RefreshControl.

- **Files**:
  - `src/screens/DashboardScreen.tsx` — Modify
- **Changes**:
  - Import `RefreshControl, ScrollView` from `react-native`
  - Add `isRefreshing` state using `useState(false)`
  - Create `handleRefresh` callback that:
    1. Sets `isRefreshing(true)`
    2. Calls `await refreshExpenses()`
    3. Sets `isRefreshing(false)`
  - Replace the outer `<View style={styles.content}>` with `<ScrollView>` containing a `refreshControl` prop:
    ```tsx
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
      }
      showsVerticalScrollIndicator={false}
    >
    ```
  - Remove `flex: 1` from `content` style (not needed for ScrollView content container)
- **Success**:
  - Pull down on Dashboard triggers refresh
  - Spinner shows during refresh
  - Data reloads after release
- **Dependencies**:
  - None

### Task 5.3: Add loading skeleton and enhanced empty state

Show skeleton placeholders while data loads, and an illustrated empty state when no data.

- **Files**:
  - `src/screens/DashboardScreen.tsx` — Modify
- **Changes**:
  - Import `EmptyState`, `SkeletonPlaceholder` from `@/components/ui`
  - Access `isLoading` from `useExpenseStore`
  - Before rendering content, check:
    ```tsx
    if (isLoading && items.length === 0) {
      return (
        // Render 3-4 skeleton rows mimicking TransactionItem layout
        <SkeletonPlaceholder width="100%" height={72} borderRadius={BorderRadius.lg} />
      );
    }
    ```
  - Replace `TransactionList`'s inline empty component with:
    ```tsx
    <EmptyState icon="💰" title="No expenses yet" subtitle="Tap + to add your first expense" />
    ```
- **Success**:
  - Skeleton shows on initial load
  - EmptyState shows when no data
- **Dependencies**:
  - Phase 2 (EmptyState, SkeletonPlaceholder)

## Phase 6: Screen Polish — History

### Task 6.1: Add pull-to-refresh to HistoryScreen

Add `RefreshControl` to the existing `SectionList`.

- **Files**:
  - `src/screens/HistoryScreen.tsx` — Modify
- **Changes**:
  - Import `RefreshControl` from `react-native`
  - Add `isRefreshing` state
  - Create `handleRefresh` callback
  - Add `refreshControl` prop to `SectionList`:
    ```tsx
    refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
    }
    ```
- **Success**:
  - Pull-to-refresh works on History screen
- **Dependencies**:
  - None

### Task 6.2: Add enhanced empty state

Replace plain-text empty component with `EmptyState`.

- **Files**:
  - `src/screens/HistoryScreen.tsx` — Modify
- **Changes**:
  - Import `EmptyState` from `@/components/ui`
  - Replace `ListEmptyComponent`:
    ```tsx
    ListEmptyComponent={
      <EmptyState
        icon="📋"
        title="No transactions found"
        subtitle="Your expense history will appear here"
      />
    }
    ```
- **Success**:
  - Richer empty state with icon
- **Dependencies**:
  - Phase 2 (EmptyState)

## Phase 7: Screen Polish — AddExpense & Settings

### Task 7.1: Add success feedback in `useAddExpense.ts`

Show a brief success alert after saving before navigating back.

- **Files**:
  - `src/hooks/useAddExpense.ts` — Modify
- **Changes**:
  - After `await addExpense(...)`, before `navigation.goBack()`:
    ```tsx
    Alert.alert('Saved!', 'Your expense has been recorded.', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
    ```
  - Remove the direct `navigation.goBack()` call (now done in Alert callback)
- **Success**:
  - User sees "Saved!" confirmation before screen dismisses
- **Dependencies**:
  - None

### Task 7.2: Use AnimatedPressable for category chips in AddExpenseScreen

Replace `Pressable` category chips with `AnimatedPressable` for tactile feedback.

- **Files**:
  - `src/screens/AddExpenseScreen.tsx` — Modify
- **Changes**:
  - Import `AnimatedPressable` from `@/components/ui`
  - Replace category `<Pressable>` with `<AnimatedPressable scaleValue={0.92}>`:
    ```tsx
    <AnimatedPressable
      key={cat.id}
      scaleValue={0.92}
      style={[styles.categoryChip, { ... }]}
      onPress={() => setCategoryId(cat.id)}
      accessibilityLabel={`Category ${cat.name}`}
      accessibilityHint={`Select ${cat.name} as the expense category`}
    >
    ```
- **Success**:
  - Category chips have spring scale-down animation on press
- **Dependencies**:
  - Phase 2 (AnimatedPressable)

### Task 7.3: Polish SettingsScreen with Card and Button primitives

Refactor Settings sections to use `Card` and the destructive button to use `Button`.

- **Files**:
  - `src/screens/SettingsScreen.tsx` — Modify
- **Changes**:
  - Import `Button`, `Card`, `CardBody` from `@/components/ui`
  - Replace appearance section `<View style={[styles.section...]}>` with `<Card>`
  - Replace data management section with `<Card>` + `<Button variant="destructive">`
  - Replace the inline "Clear All Data" `Pressable` with:
    ```tsx
    <Button
      variant="destructive"
      title={isLoading ? 'Clearing...' : 'Clear All Data'}
      onPress={handleClearData}
      disabled={isLoading}
      isLoading={isLoading}
      testID="clear-data-button"
    />
    ```
- **Success**:
  - Settings uses Card and Button primitives
  - Visual polish improved
  - Consistent with design system
- **Dependencies**:
  - Phase 2 (Card, Button)

## Phase 8: Barrel Exports & Accessibility

### Task 8.1: Update `src/components/index.ts`

Add re-export of UI primitives barrel for convenient access.

- **Files**:
  - `src/components/index.ts` — Modify
- **Changes**:
  - Add: `export * from './ui';`
- **Success**:
  - UI primitives accessible via `@/components`
- **Dependencies**:
  - Phase 2

### Task 8.2: Add missing accessibility attributes

Add `accessibilityLabel` and `accessibilityHint` to interactive elements that are missing them.

- **Files**:
  - `src/screens/SettingsScreen.tsx` — Add to "Clear All Data" button (if not using Button primitive which handles it)
  - `src/screens/HistoryScreen.tsx` — Add to `TransactionItem` rendered in `renderItem`
- **Changes**:
  - SettingsScreen: The `Button` primitive (Task 7.3) should receive `accessibilityLabel="Clear all expense data"` and `accessibilityHint="Delete all saved expenses permanently"`
  - HistoryScreen: Pass `accessibilityLabel` to `TransactionItem` — this is already handled via `testID` but add `accessibilityLabel={item.title}` and `accessibilityHint="View expense details"`
- **Success**:
  - No interactive element missing accessibility props
- **Dependencies**:
  - Phase 7

## Phase 9: Verification

### Automated Quality Gates

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
```

### Manual Visual Verification

1. Run `npx expo start --ios` (or `--android`)
2. Verify tab bar shows Ionicons (not emojis)
3. Verify Dashboard entrance animation
4. Pull down on Dashboard — refresh indicator appears
5. Navigate to AddExpense — category chips have press animation
6. Save an expense — success alert appears before navigating back
7. Navigate to History — pull-to-refresh works
8. Toggle dark mode — all screens render correctly (no white text on white bg)
9. Clear all data in Settings — uses Button component with loading state

## Dependencies

- Expo SDK 54 (installed)
- `expo-vector-icons` (bundled with Expo)
- React Native `Animated` API (built-in)
- React Native `RefreshControl` (built-in)

## Success Criteria

- All 8 UI primitives created, typed, and exported
- Zero hardcoded color/spacing/font-size values in any component
- Tab bar uses Ionicons
- Dashboard and History have pull-to-refresh
- Entrance animations visible on Dashboard
- Success feedback shown after saving expense
- All quality gates pass
- Existing test suite passes without regression
