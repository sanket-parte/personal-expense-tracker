/**
 * Database Initialization
 *
 * Opens the SQLite database and initializes Drizzle ORM.
 * Ensures the required tables exist at startup.
 */

import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

// Open the database synchronously (Expo SQLite Next Gen)
const expoDb = openDatabaseSync('expenses.db');

/**
 * IMPORTANT — Schema Drift Warning
 *
 * The SQL below is manually written and MUST be kept in sync
 * with the Drizzle schema defined in `src/db/schema.ts`.
 * Any column additions/removals in the schema must be reflected here.
 *
 * TODO: Replace with Drizzle migrations (`drizzle-kit generate` + `useMigrations`)
 * once the schema stabilises beyond MVP.
 */
expoDb.execSync(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    title TEXT NOT NULL,
    date INTEGER NOT NULL,
    category_id INTEGER,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
  );
`);

// Initialize Drizzle ORM
export const db = drizzle(expoDb, { schema });
