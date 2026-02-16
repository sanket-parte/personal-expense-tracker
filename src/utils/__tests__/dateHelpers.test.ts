import { groupExpensesByDate } from '../dateHelpers';

describe('groupExpensesByDate', () => {
  it('returns empty array for no expenses', () => {
    expect(groupExpensesByDate([])).toEqual([]);
  });

  it('groups expenses by "Today", "Yesterday", and dates', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const pastDate = new Date('2023-01-01');

    const expenses = [
      { id: 1, amount: 10, title: 'A', date: today, categoryId: 1, createdAt: today },
      { id: 2, amount: 20, title: 'B', date: yesterday, categoryId: 1, createdAt: yesterday },
      { id: 3, amount: 30, title: 'C', date: pastDate, categoryId: 1, createdAt: pastDate },
    ];

    const result = groupExpensesByDate(expenses);

    expect(result.length).toBe(3);
    expect(result[0].title).toBe('Today');
    expect(result[1].title).toBe('Yesterday');
    expect(result[2].title).toBe('January 01, 2023');

    expect(result[0].data.length).toBe(1);
    expect(result[0].data[0].title).toBe('A');
  });

  it('handles existing group aggregation', () => {
    const today = new Date();
    const expenses = [
      { id: 1, amount: 10, title: 'A', date: today, categoryId: 1, createdAt: today },
      { id: 2, amount: 20, title: 'B', date: today, categoryId: 1, createdAt: today },
    ];

    const result = groupExpensesByDate(expenses);
    expect(result.length).toBe(1);
    expect(result[0].data.length).toBe(2);
  });
});
