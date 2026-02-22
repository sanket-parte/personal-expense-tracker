import { expenseService } from '@/services/expenseService';
import { act, renderHook } from '@testing-library/react-native';
import { useExpenseStore } from '../useExpenseStore';

jest.mock('@/services/expenseService', () => ({
  expenseService: {
    getAll: jest.fn(),
    create: jest.fn(),
    deleteAll: jest.fn(),
  },
}));

describe('useExpenseStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default initial state for zustand
    useExpenseStore.setState({ items: [], isLoading: false, error: null });
    // Suppress console.error in tests to cleanly assert negative flows
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useExpenseStore());

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  describe('refreshExpenses', () => {
    it('fetches expenses successfully', async () => {
      const mockExpenses = [
        { id: 1, amount: 10, title: 'Coffee', date: new Date().toISOString() },
        { id: 2, amount: 20, title: 'Lunch', date: new Date().toISOString() },
      ];

      (expenseService.getAll as jest.Mock).mockResolvedValueOnce(mockExpenses);

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.refreshExpenses();
      });

      expect(expenseService.getAll).toHaveBeenCalledTimes(1);
      expect(result.current.items).toEqual(mockExpenses);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('handles fetch failure', async () => {
      (expenseService.getAll as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.refreshExpenses();
      });

      expect(expenseService.getAll).toHaveBeenCalledTimes(1);
      expect(result.current.items).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch expenses');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('addExpense', () => {
    it('adds expense and refreshes list', async () => {
      const newExpense = { amount: 15, title: 'Snack', date: new Date() };
      const mockExpenses = [{ id: 1, ...newExpense }];

      (expenseService.create as jest.Mock).mockResolvedValueOnce(undefined);
      (expenseService.getAll as jest.Mock).mockResolvedValueOnce(mockExpenses);

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.addExpense(newExpense as any);
      });

      expect(expenseService.create).toHaveBeenCalledWith(newExpense);
      expect(expenseService.getAll).toHaveBeenCalledTimes(1); // from refreshExpenses
      expect(result.current.items).toEqual(mockExpenses);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('handles add failure', async () => {
      const newExpense = { amount: 15, title: 'Snack', date: new Date() };

      (expenseService.create as jest.Mock).mockRejectedValueOnce(new Error('DB Insert Error'));

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.addExpense(newExpense as any);
      });

      expect(expenseService.create).toHaveBeenCalledWith(newExpense);
      expect(expenseService.getAll).not.toHaveBeenCalled(); // should bypass refresh on fail
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Failed to add expense');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('clearExpenses', () => {
    it('clears all expenses', async () => {
      useExpenseStore.setState({ items: [{ id: 1 } as any] });

      (expenseService.deleteAll as jest.Mock).mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.clearExpenses();
      });

      expect(expenseService.deleteAll).toHaveBeenCalledTimes(1);
      expect(result.current.items).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('handles clear failure', async () => {
      useExpenseStore.setState({ items: [{ id: 1 } as any] });

      (expenseService.deleteAll as jest.Mock).mockRejectedValueOnce(new Error('DB Delete Error'));

      const { result } = renderHook(() => useExpenseStore());

      await act(async () => {
        await result.current.clearExpenses();
      });

      expect(expenseService.deleteAll).toHaveBeenCalledTimes(1);
      expect(result.current.items).toHaveLength(1); // shouldn't wipe optimistic memory arrays
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Failed to clear expenses');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
