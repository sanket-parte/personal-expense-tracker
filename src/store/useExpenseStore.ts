import { db, expenses, type Expense, type NewExpense } from '@/services/database';
import { desc } from 'drizzle-orm';
import { create } from 'zustand';

interface ExpenseState {
  items: Expense[];
  isLoading: boolean;
  error: string | null;

  // Actions
  refreshExpenses: () => Promise<void>;
  addExpense: (data: NewExpense) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  refreshExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch expenses ordered by date descending
      const result = await db.query.expenses.findMany({
        orderBy: [desc(expenses.date)],
      });
      set({ items: result });
    } catch (e) {
      set({ error: 'Failed to fetch expenses' });
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },

  addExpense: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await db.insert(expenses).values(data);
      // Refresh to get the new item with ID
      await get().refreshExpenses();
    } catch (e) {
      set({ error: 'Failed to add expense' });
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
