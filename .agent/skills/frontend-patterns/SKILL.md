---
name: frontend-patterns
description: React patterns for component composition, state management, hooks, performance, and forms — adapted for React Native.
---

# Frontend Development Patterns (React Native)

Reusable React patterns adapted for React Native mobile development. These patterns complement the `mobile-dev` skill with deeper pattern guidance.

## When to Activate

- Building reusable component hierarchies (composition, compound components)
- Managing complex state (useState, useReducer, Zustand, Context)
- Writing custom hooks for shared logic
- Optimizing performance (memoization, list virtualization)
- Handling forms (validation, controlled inputs)
- Implementing error boundaries

---

## Component Patterns

### Composition Over Inheritance

```tsx
// ✅ GOOD: Component composition with React Native
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
}

export function Card({ children, variant = 'default' }: CardProps) {
  const { colors } = useAppTheme();
  return (
    <View style={[
      styles.card,
      { backgroundColor: variant === 'outlined' ? 'transparent' : colors.surface },
      variant === 'outlined' && { borderWidth: 1, borderColor: colors.border },
    ]}>
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.cardHeader}>{children}</View>;
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <View style={styles.cardBody}>{children}</View>;
}

// Usage
<Card>
  <CardHeader><Text>Title</Text></CardHeader>
  <CardBody><Text>Content</Text></CardBody>
</Card>
```

### Compound Components

```tsx
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export function Tabs({ children, defaultTab }: {
  children: React.ReactNode;
  defaultTab: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={() => context.setActiveTab(id)}
      style={[
        styles.tab,
        context.activeTab === id && { borderBottomColor: colors.primary },
      ]}
      accessibilityRole="tab"
      accessibilityState={{ selected: context.activeTab === id }}
    >
      <Text style={{ color: context.activeTab === id ? colors.primary : colors.textSecondary }}>
        {children}
      </Text>
    </Pressable>
  );
}
```

### Render Props Pattern

```tsx
interface DataLoaderProps<T> {
  fetchFn: () => Promise<T>;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

export function DataLoader<T>({ fetchFn, children }: DataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataLoader<Expense[]> fetchFn={fetchExpenses}>
  {(expenses, loading, error) => {
    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    return <ExpenseList expenses={expenses!} />;
  }}
</DataLoader>
```

---

## Custom Hooks Patterns

### State Toggle Hook

```tsx
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

// Usage
const [isVisible, toggleVisible] = useToggle();
```

### Async Data Fetching Hook

```tsx
interface UseQueryOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T>,
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const fetchError = err as Error;
      setError(fetchError);
      options?.onError?.(fetchError);
    } finally {
      setLoading(false);
    }
  }, [fetcher, options]);

  useEffect(() => {
    if (options?.enabled !== false) {
      refetch();
    }
  }, [key, refetch, options?.enabled]);

  return { data, error, loading, refetch };
}
```

### Debounce Hook

```tsx
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage — search input
const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebounce(searchQuery, 500);
```

---

## State Management Patterns

### Context + Reducer

```tsx
interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  filter: string | null;
}

type ExpenseAction =
  | { type: 'SET_EXPENSES'; payload: Expense[] }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILTER'; payload: string | null };

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: Dispatch<ExpenseAction>;
} | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: [],
    loading: false,
    filter: null,
  });

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within ExpenseProvider');
  return context;
}
```

---

## Performance Optimization

### Memoization

```tsx
// ✅ useMemo for expensive computations
const totalByCategory = useMemo(() => {
  return expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] ?? 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
}, [expenses]);

// ✅ useCallback for callbacks passed to children
const handleExpensePress = useCallback((id: string) => {
  navigation.navigate('ExpenseDetail', { id });
}, [navigation]);

// ✅ React.memo for pure list items
export const ExpenseRow = React.memo<ExpenseRowProps>(({ expense, onPress }) => {
  const { colors } = useAppTheme();
  return (
    <Pressable onPress={() => onPress(expense.id)}>
      <Text style={{ color: colors.text }}>{expense.description}</Text>
    </Pressable>
  );
});
```

### List Optimization

```tsx
// ✅ Use FlashList for long lists with stable callbacks
import { FlashList } from '@shopify/flash-list';

export function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const renderItem = useCallback(({ item }: { item: Expense }) => (
    <ExpenseRow expense={item} onPress={handlePress} />
  ), [handlePress]);

  const keyExtractor = useCallback((item: Expense) => item.id, []);

  return (
    <FlashList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={72}
    />
  );
}
```

---

## Form Handling

### Controlled Form with Validation

```tsx
interface ExpenseFormData {
  amount: string;
  category: string;
  description: string;
}

interface FormErrors {
  amount?: string;
  category?: string;
  description?: string;
}

export function AddExpenseForm({ onSubmit }: { onSubmit: (data: ExpenseFormData) => void }) {
  const { colors } = useAppTheme();
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.amount.trim() || isNaN(Number(formData.amount))) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <View>
      <TextInput
        value={formData.amount}
        onChangeText={(text) => setFormData((prev) => ({ ...prev, amount: text }))}
        placeholder="Amount"
        keyboardType="decimal-pad"
        accessibilityLabel="Expense amount"
        style={[styles.input, { borderColor: errors.amount ? colors.error : colors.border }]}
      />
      {errors.amount && <Text style={{ color: colors.error }}>{errors.amount}</Text>}

      {/* Other fields */}

      <Pressable onPress={handleSubmit} accessibilityRole="button" accessibilityLabel="Save expense">
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
```

---

## Error Boundary

```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong</Text>
          <Pressable onPress={() => this.setState({ hasError: false })}>
            <Text>Try again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Animation Patterns (React Native)

Use `Animated` API or `react-native-reanimated` for animations:

```tsx
import { Animated } from 'react-native';

export function FadeInView({ children }: { children: React.ReactNode }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}
```

For complex gesture-driven or layout animations, prefer `react-native-reanimated` v3.

---

**Remember**: Choose patterns that fit your complexity. Start simple, refactor to patterns when the codebase demands it.
