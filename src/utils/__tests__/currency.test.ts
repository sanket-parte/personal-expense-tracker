/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_CONFIG } from '@/constants/config';
import { getCurrencySymbol } from '../currency';

describe('currency utils', () => {
  const originalCurrency = APP_CONFIG.defaultCurrency;

  afterEach(() => {
    (APP_CONFIG as any).defaultCurrency = originalCurrency;
  });

  it('returns correctly mapped INR symbol', () => {
    (APP_CONFIG as any).defaultCurrency = 'INR';
    expect(getCurrencySymbol()).toBe('₹');
  });

  it('returns correctly mapped USD symbol', () => {
    (APP_CONFIG as any).defaultCurrency = 'USD';
    expect(getCurrencySymbol()).toBe('$');
  });

  it('falls back to $ when unknown currency is set', () => {
    (APP_CONFIG as any).defaultCurrency = 'YEN';
    expect(getCurrencySymbol()).toBe('$');
  });
});
