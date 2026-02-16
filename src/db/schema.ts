import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Expenses Table
 * Stores individual transaction records.
 */
export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amount: real('amount').notNull(),
  title: text('title').notNull(),
  // Stored as timestamp (ms) for easy sorting/filtering
  date: integer('date', { mode: 'timestamp' }).notNull(),
  categoryId: integer('category_id'),
  // Auto-set creation time
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
