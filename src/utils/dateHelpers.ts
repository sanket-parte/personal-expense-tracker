/**
 * Date Helper Utilities
 *
 * Functions for grouping and formatting expense dates
 * for display in section lists and summaries.
 */

import { type Expense } from '@/db/schema';
import { format, isToday, isYesterday } from 'date-fns';

/** A section of expenses grouped by a human-readable date title. */
export interface GroupedExpenses {
  title: string;
  data: Expense[];
}

/**
 * Groups expenses by date into sections suitable for `SectionList`.
 *
 * Sorts expenses by date descending, then groups into sections with
 * human-readable titles ("Today", "Yesterday", or "MMMM dd, yyyy").
 *
 * @param expenses - The list of expenses to group.
 * @returns An array of `GroupedExpenses` sections ordered by date descending.
 */
export function groupExpensesByDate(expenses: Expense[]): GroupedExpenses[] {
  if (!expenses.length) return [];

  const groups: Record<string, Expense[]> = {};

  // Sort by date desc first
  const sorted = [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());

  sorted.forEach((expense) => {
    let title = format(expense.date, 'MMMM dd, yyyy');

    if (isToday(expense.date)) {
      title = 'Today';
    } else if (isYesterday(expense.date)) {
      title = 'Yesterday';
    }

    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(expense);
  });

  return Object.keys(groups).map((title) => ({
    title,
    data: groups[title],
  }));
}

/**
 * Flattens expenses into a single array for `@shopify/flash-list` while preserving section headers.
 * The resulting array mixes `string` (headers) and `Expense` objects.
 * Returns the flattened data and an array of indices where headers are located for stickiness.
 */
export function flattenExpensesForFlashList(expenses: Expense[]): {
  data: (string | Expense)[];
  stickyHeaderIndices: number[];
} {
  const grouped = groupExpensesByDate(expenses);
  const data: (string | Expense)[] = [];
  const stickyHeaderIndices: number[] = [];

  grouped.forEach((section) => {
    stickyHeaderIndices.push(data.length);
    data.push(section.title); // Push the header string
    data.push(...section.data); // Push the items
  });

  return { data, stickyHeaderIndices };
}
