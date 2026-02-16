import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

// Open the database synchronously (Expo SQLite Next Gen)
const expoDb = openDatabaseSync('expenses.db');

// Initialize Drizzle ORM
export const db = drizzle(expoDb, { schema });

// Export schema for easy access
export * from '@/db/schema';
