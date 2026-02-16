# Research: MVP Implementation

## 1. Overview
This document validates the technical approach for implementing the MVP of the Personal Expense Tracker.
It expands on the Architecture Design with concrete, verified implementation patterns for **Expo SDK 54**.

## 2. Technical Stack Verification
- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Database**: `expo-sqlite` (Next Gen) + `drizzle-orm`
- **State Management**: `zustand`
- **Navigation**: `react-navigation` (v7 recommended for latest React Native, but v6 is stable. We will use stable v6/latest compatible).

## 3. Implementation Patterns

### A. Database Layer (Drizzle + Expo SQLite)

**Dependencies**:
```bash
npm install drizzle-orm expo-sqlite
npm install -D drizzle-kit
```

**Configuration (`drizzle.config.ts`)**:
```typescript
import type { Config } from 'drizzle-kit';
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
```

**Schema (`src/db/schema.ts`)**:
```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amount: real('amount').notNull(),
  title: text('title').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(), // Stored as ms
  categoryId: integer('category_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});
```

**Connection (`src/services/database.ts`)**:
```typescript
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import * as schema from '@/db/schema';

const expoDb = openDatabaseSync('expenses.db');
export const db = drizzle(expoDb, { schema });
```

### B. State Management (Zustand)

**Dependencies**:
```bash
npm install zustand
```

**Store Pattern (`src/store/useExpenseStore.ts`)**:
```typescript
import { create } from 'zustand';
import { db } from '@/services/database';
import { expenses } from '@/db/schema';

interface ExpenseState {
  items: typeof expenses.$inferSelect[];
  refreshExpenses: () => Promise<void>;
  addExpense: (data: typeof expenses.$inferInsert) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  items: [],
  refreshExpenses: async () => {
    const result = await db.query.expenses.findMany({ orderBy: (expenses, { desc }) => [desc(expenses.date)] });
    set({ items: result });
  },
  addExpense: async (data) => {
    await db.insert(expenses).values(data);
    await useExpenseStore.getState().refreshExpenses();
  },
}));
```

### C. Navigation (React Navigation)

**Dependencies**:
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

**Root Navigator (`src/navigation/RootNavigator.tsx`)**:
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="App" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 4. Validation Strategy
- **Type Safety**: Ensure `drizzle-orm` schema types flow into Zustand store.
- **Persistence**: Verify data survives app reload using `expo-sqlite`.
- **UI Consistency**: Ensure all screens use `useAppTheme` for colors.
