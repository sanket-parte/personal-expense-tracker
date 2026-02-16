import { expenses } from '@/db/schema';
import { db } from '@/services/database';
import { expenseService } from '../expenseService';

// Mock DB is already set up in jest.setup.js
// We need to typecase db to mock implementation
// But wait, jest.setup.js mocks the module 'drizzle-orm/expo-sqlite'
// We might need to spy on the methods exposed by db.
// Or just check that it calls the mocked functions.

describe('expenseService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll calls findMany', async () => {
    await expenseService.getAll();
    expect(db.query.expenses.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: expect.any(Array) }),
    );
  });

  it('create calls insert', async () => {
    const newExpense = { amount: 10, title: 'Test', date: new Date(), categoryId: 1 };
    await expenseService.create(newExpense);
    expect(db.insert).toHaveBeenCalledWith(expenses);
  });

  it('deleteAll calls delete', async () => {
    await expenseService.deleteAll();
    expect(db.delete).toHaveBeenCalledWith(expenses);
  });
});
