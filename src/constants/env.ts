/**
 * Environment Configuration
 *
 * Centralizes access to environment variables.
 * Uses Expo Constants for build-time configuration.
 *
 * To add environment variables:
 * 1. Define them in app.json under "extra" or use .env files with expo-env
 * 2. Access them through this module
 */

import Constants from 'expo-constants';

interface EnvironmentConfig {
  /** API base URL for backend services */
  apiBaseUrl: string;

  /** Whether the app is running in development mode */
  isDevelopment: boolean;

  /** Whether the app is running in production mode */
  isProduction: boolean;

  /** Current app environment name */
  environment: 'development' | 'staging' | 'production';
}

const expoExtra = Constants.expirationDate
  ? {}
  : ((Constants.expoConfig?.extra as Record<string, string> | undefined) ?? {});

export const ENV: EnvironmentConfig = {
  apiBaseUrl: expoExtra?.apiBaseUrl ?? 'http://localhost:3000',
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
  environment: __DEV__ ? 'development' : 'production',
};
