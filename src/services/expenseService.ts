import { expenses, type Expense, type NewExpense } from '@/db/schema';
import { db } from '@/services/database';
import { desc } from 'drizzle-orm';

/**
 * Expense Service
 *
 * Handles all database operations related to expenses.
 * Decouples the store from the direct Drizzle implementation.
 */
export const expenseService = {
  /**
   * Fetch all expenses ordered by date descending.
   */
  getAll: async (): Promise<Expense[]> => {
    return await db.query.expenses.findMany({
      orderBy: [desc(expenses.date)],
    });
  },

  /**
   * Add a new expense.
   */
  create: async (expense: NewExpense): Promise<void> => {
    await db.insert(expenses).values(expense);
  },

  /**
   * Delete all expenses.
   */
  deleteAll: async (): Promise<void> => {
    await db.delete(expenses);
  },
};
