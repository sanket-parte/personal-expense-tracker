<!-- markdownlint-disable-file -->

# Research: Transaction Enhancements

## Research Date: 2026-02-22

## 1. Project Structure Analysis

### Current Navigation Structure

- `src/navigation/RootNavigator.tsx`: Simple stack navigator containing `AppNavigator`.
- `src/navigation/AppNavigator.tsx`: Bottom tab navigator with `Dashboard`, `AddExpense`, `History`, `Settings`.
  - **Gap**: The `AddExpense` tab works as a standard screen. The new design requires replacing this tab with a custom button that opens a `QuickAddActionSheet` modal.

### Current Listing Implementation

- `src/screens/HistoryScreen.tsx`: Uses React Native's built-in `SectionList` to render transactions grouped by date.
  - **Gap**: Missing search and filtering capabilities. `SectionList` can have performance issues with very large datasets compared to `@shopify/flash-list`.

### Current State Management

- `src/store/useExpenseStore.ts`: Simple Zustand store maintaining an array of `items`.
  - **Note**: The store should remain lightweight. Search and filtering state should be managed locally within `HistoryScreen.tsx` to avoid unnecessary global re-renders.

## 2. Dependency Analysis

### Required New Dependencies

1.  **`@shopify/flash-list`**:
    - **Purpose**: Highly performant list rendering replacement for `SectionList`/`FlatList`.
    - **Usage Pattern**: Requires mapping `SectionList` data structures if maintaining headers, or flattening the data array. FlashList supports `stickyHeaderIndices` when rendering flattened lists.
    - **Installation**: `npx expo install @shopify/flash-list`

2.  **`expo-image-picker`**:
    - **Purpose**: Accessing the device camera and photo library for scanning receipts.
    - **Usage Pattern**: `ImagePicker.launchCameraAsync` and `ImagePicker.launchImageLibraryAsync`.
    - **Installation**: `npx expo install expo-image-picker`

### Existing Usable Primitives

- `src/components/ui/Button.tsx`: Can be reused for actions entirely within the new modals.
- `src/components/ui/Input.tsx`: Can be extended or wrapped for the `SearchBar` and natural language input.
- `src/components/ui/AnimatedPressable.tsx`: Excellent for building interactive `FilterChips` and the custom FAB tab button.
- `src/components/ui/EmptyState.tsx`: Will be reused when search or filter results yield zero transactions.

## 3. Implementation Patterns for New Features

### Custom Tab Bar Button Pattern

To intercept the tab press and open a modal instead of navigating:

```tsx
<Tab.Screen
  name="AddExpense"
  component={View} // Dummy component
  options={{
    tabBarButton: (props) => <CustomAddButton {...props} onPress={() => openActionSheet()} />,
  }}
/>
```

### Search & Filter Local State Pattern

In `HistoryScreen.tsx`:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [activeCategory, setActiveCategory] = useState<number | null>(null);

const filteredItems = useMemo(() => {
  return items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? item.categoryId === activeCategory : true;
    return matchesSearch && matchesCategory;
  });
}, [items, searchQuery, activeCategory]);
```

### FlashList Grouped Data Pattern

`@shopify/flash-list` doesn't have a direct `SectionList` equivalent. To render grouped data with sticky headers, the data array must be flattened to include headers as items, and `stickyHeaderIndices` must be computed.

Example flattened structure:

```json
[
  "2026-02-22",
  { "id": 1, "title": "Coffee", "amount": 5 },
  "2026-02-21",
  { "id": 2, "title": "Lunch", "amount": 15 }
]
```

This requires a utility function to flatten the `items` based on date boundaries.
