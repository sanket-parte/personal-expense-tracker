/**
 * Expense Categories
 *
 * Defines the available expense categories with icons and colors.
 */

export const CATEGORIES = [
  { id: 1, name: 'Food', icon: '🍔', color: '#FF6B6B' },
  { id: 2, name: 'Transport', icon: '🚗', color: '#4ECDC4' },
  { id: 3, name: 'Utilities', icon: '💡', color: '#FFE66D' },
  { id: 4, name: 'Entertainment', icon: '🎬', color: '#1A535C' },
  { id: 5, name: 'Health', icon: '🏥', color: '#FF9F1C' },
  { id: 6, name: 'Shopping', icon: '🛍️', color: '#2EC4B6' },
  { id: 7, name: 'Housing', icon: '🏠', color: '#CBF3F0' },
  { id: 8, name: 'Other', icon: '📦', color: '#A9DEF9' },
] as const;

/** A single expense category. */
export type Category = (typeof CATEGORIES)[number];

export const getCategoryById = (id: number): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);
