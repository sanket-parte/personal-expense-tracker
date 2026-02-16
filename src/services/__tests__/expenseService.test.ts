import { db, expenses } from '../database';
import { expenseService } from '../expenseService';

// Mock the database service
jest.mock('../database', () => ({
  db: {
    query: {
      expenses: {
        findMany: jest.fn(),
      },
    },
    insert: jest.fn(() => ({
      values: jest.fn(),
    })),
  },
  expenses: { date: 'date' }, // Mock schema object
}));

describe('expenseService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch expenses ordered by date descending', async () => {
      const mockExpenses = [{ id: 1, title: 'Test', amount: 100 }];
      (db.query.expenses.findMany as jest.Mock).mockResolvedValue(mockExpenses);

      const result = await expenseService.getAll();

      expect(db.query.expenses.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockExpenses);
    });
  });

  describe('create', () => {
    it('should insert a new expense', async () => {
      const newExpense = {
        title: 'New Expense',
        amount: 50,
        date: new Date(),
        categoryId: 1,
      };

      const mockValues = jest.fn().mockResolvedValue({ lastInsertRowId: 1 });
      (db.insert as jest.Mock).mockReturnValue({ values: mockValues });

      await expenseService.create(newExpense);

      expect(db.insert).toHaveBeenCalledWith(expenses);
      expect(mockValues).toHaveBeenCalledWith(newExpense);
    });
  });
});
