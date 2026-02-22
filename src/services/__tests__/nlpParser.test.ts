import { parseNaturalLanguageExpense } from '../nlpParser';

describe('nlpParser', () => {
  it('parses dollars accurately', async () => {
    const result = await parseNaturalLanguageExpense('Spent $15.50 on coffee');
    expect(result.amount).toBe('15.50');
    expect(result.categoryId).toBe(1); // Food derived from "coffee"
    expect(result.title).toBe('Coffee');
  });

  it('parses "yesterday" tag backwards', async () => {
    const result = await parseNaturalLanguageExpense('Paid 20 dollars for gas yesterday');
    expect(result.amount).toBe('20');
    expect(result.categoryId).toBe(2); // Transport derived from "gas"
    expect(result.title).toBe('Paid gas');

    // Validate it's loosely behind today
    const parsedDate = new Date(result.date as string);
    const today = new Date();
    expect(parsedDate.getDate()).not.toBe(today.getDate());
  });

  it('parses "days ago" relative offsets', async () => {
    const result = await parseNaturalLanguageExpense('Uber 14.25 3 days ago');
    expect(result.amount).toBe('14.25');
    expect(result.categoryId).toBe(2); // Transport
    expect(result.title).toBe('Uber');
  });

  it('handles unknown categories safely', async () => {
    const result = await parseNaturalLanguageExpense('Bought a new monitor for $400');
    expect(result.amount).toBe('400');
    expect(result.categoryId).toBe(null);
    expect(result.title).toBe('A new monitor');
  });

  it('throws an error if an exception occurs mid-parse', async () => {
    // Force a reject by passing null simulating a completely broken cast
    await expect(parseNaturalLanguageExpense(null as unknown as string)).rejects.toThrow(
      'Failed to parse text.',
    );
  });
});
