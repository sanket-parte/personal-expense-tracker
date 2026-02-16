import { type Expense, type NewExpense } from '@/db/schema';
import { expenseService } from '@/services/expenseService';
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
      const result = await expenseService.getAll();
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
      await expenseService.create(data);
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
