/**
 * Application Configuration
 *
 * App-level constants and configuration values.
 * Environment-specific values should be loaded from env.ts.
 */

export const APP_CONFIG = {
  /** Application display name */
  name: 'Personal Expense Tracker',

  /** Application version — should mirror app.json */
  version: '1.0.0',

  /** Default locale */
  defaultLocale: 'en',

  /** Default currency */
  defaultCurrency: 'INR',

  /** Animation durations in milliseconds */
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  /** Debounce/throttle durations in milliseconds */
  timing: {
    debounce: 300,
    throttle: 500,
    toastDuration: 3000,
  },

  /** Pagination defaults */
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;
