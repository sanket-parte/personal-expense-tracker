/**
 * Currency Utilities
 *
 * Shared currency symbol mapping and helpers.
 * Used across SummaryCard, TransactionList, and AddExpenseScreen.
 */

import { APP_CONFIG } from '@/constants/config';

/** Currency symbol mapping for display */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

/**
 * Returns the currency symbol for the app's configured default currency.
 * Falls back to '$' if the currency code is not mapped.
 */
export function getCurrencySymbol(): string {
  return CURRENCY_SYMBOLS[APP_CONFIG.defaultCurrency] ?? '$';
}
