/**
 * Utility Functions
 *
 * General-purpose helper functions and formatters.
 * Keep utilities pure (no side effects) and well-tested.
 */

/**
 * Format a number as currency.
 *
 * @param amount - The numeric amount to format
 * @param currency - ISO 4217 currency code (default: 'INR')
 * @param locale - BCP 47 locale string (default: 'en-IN')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'INR', locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Clamp a number between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a short unique ID (for local/temporary use, not for DB keys).
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Delay execution for a given number of milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
