import { APP_CONFIG } from '@/constants/config';
import { getCurrencySymbol } from '../currency';

describe('currency utils', () => {
  const originalCurrency = APP_CONFIG.defaultCurrency;

  afterEach(() => {
    APP_CONFIG.defaultCurrency = originalCurrency;
  });

  it('returns correctly mapped INR symbol', () => {
    APP_CONFIG.defaultCurrency = 'INR';
    expect(getCurrencySymbol()).toBe('₹');
  });

  it('returns correctly mapped USD symbol', () => {
    APP_CONFIG.defaultCurrency = 'USD';
    expect(getCurrencySymbol()).toBe('$');
  });

  it('falls back to $ when unknown currency is set', () => {
    APP_CONFIG.defaultCurrency = 'YEN' as any;
    expect(getCurrencySymbol()).toBe('$');
  });
});
