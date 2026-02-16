import { expenseService } from '../../services/database';
import { useExpenseStore } from '../useExpenseStore';

// Mock the expenseService
jest.mock('../../services/database', () => ({
  expenseService: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
}));

describe('useExpenseStore', () => {
  beforeEach(() => {
    useExpenseStore.setState({ items: [], isLoading: false, error: null });
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should have initial state', () => {
    const state = useExpenseStore.getState();
    expect(state.items).toEqual([]);
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeNull();
  });

  describe('refreshExpenses', () => {
    it('should fetch expenses successfully', async () => {
      const mockExpenses = [{ id: 1, title: 'Test', amount: 100 }];
      (expenseService.getAll as jest.Mock).mockResolvedValue(mockExpenses);

      await useExpenseStore.getState().refreshExpenses();

      const state = useExpenseStore.getState();
      expect(state.items).toEqual(mockExpenses);
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
    });

    it('should handle errors during fetch', async () => {
      (expenseService.getAll as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await useExpenseStore.getState().refreshExpenses();

      const state = useExpenseStore.getState();
      expect(state.items).toEqual([]);
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe('Failed to fetch expenses');
    });
  });

  describe('addExpense', () => {
    it('should add expense and refresh list', async () => {
      const newExpense = { title: 'New', amount: 50, date: new Date(), categoryId: 1 };

      // Mock refresh to just verify it was called
      const refreshSpy = jest.spyOn(useExpenseStore.getState(), 'refreshExpenses');

      await useExpenseStore.getState().addExpense(newExpense);

      expect(expenseService.create).toHaveBeenCalledWith(newExpense);
      // Wait for async state updates if needed, but here we just check mocks
      expect(refreshSpy).toHaveBeenCalled();
    });

    it('should handle errors during add', async () => {
      const newExpense = { title: 'New', amount: 50, date: new Date(), categoryId: 1 };
      (expenseService.create as jest.Mock).mockRejectedValue(new Error('Insert Error'));

      await useExpenseStore.getState().addExpense(newExpense);

      const state = useExpenseStore.getState();
      expect(state.error).toBe('Failed to add expense');
      expect(state.isLoading).toBeFalsy();
    });
  });
});
