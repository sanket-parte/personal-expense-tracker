import { type Expense } from '@/db/schema';
import { format, isToday, isYesterday } from 'date-fns';

export interface GroupedExpenses {
  title: string;
  data: Expense[];
}

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
