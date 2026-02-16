/**
 * Shared Type Definitions
 *
 * Central barrel file for all shared TypeScript types and interfaces.
 * Feature-specific types can be co-located with their modules
 * and re-exported here for cross-feature usage.
 */

// ─── Navigation Types ────────────────────────────────────────────────────────

/**
 * Root stack parameter list.
 * Add screen params as the app grows.
 */
export type RootStackParamList = {
  Home: undefined;
};

// ─── Common Utility Types ────────────────────────────────────────────────────

/** Makes all properties of T optional and nullable */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** Extract the resolved value type from a Promise */
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/** Callback function type with optional error */
export type AsyncCallback<T = void> = () => Promise<T>;
