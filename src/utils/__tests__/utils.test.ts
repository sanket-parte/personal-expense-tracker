import { clamp, formatCurrency, generateId } from '@/utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('formats INR by default', () => {
      expect(formatCurrency(1000)).toMatch(/₹\s?1,000\.00/);
    });

    it('formats USD correctly', () => {
      expect(formatCurrency(1000, 'USD', 'en-US')).toBe('$1,000.00');
    });
  });

  describe('clamp', () => {
    it('clamps values within range', () => {
      expect(clamp(10, 0, 5)).toBe(5);
      expect(clamp(-5, 0, 5)).toBe(0);
      expect(clamp(3, 0, 5)).toBe(3);
    });
  });

  describe('generateId', () => {
    it('generates unique non-empty strings', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(0);
    });
  });
});
