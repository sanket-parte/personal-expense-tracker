/**
 * Shared Type Definitions
 *
 * Central barrel file for all shared TypeScript types and interfaces.
 * Feature-specific types can be co-located with their modules
 * and re-exported here for cross-feature usage.
 */

// ─── Navigation Types ────────────────────────────────────────────────────────
export * from './navigation';

// ─── Common Utility Types ────────────────────────────────────────────────────

/** Makes all properties of T optional and nullable */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** Extract the resolved value type from a Promise */
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Used for pre-filling the AddExpense form linearly from Quick Add tools.
 */
export interface ParsedExpenseData {
  amount?: string;
  title?: string;
  date?: string;
  categoryId?: number | null;
}

/** Callback function type with optional error */
export type AsyncCallback<T = void> = () => Promise<T>;
