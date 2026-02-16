/**
 * useAppTheme Hook
 *
 * Provides the current color scheme and resolved theme colors.
 * Automatically adapts to the device's light/dark mode setting.
 */

import { Colors, type ThemeColors, type ThemeColorScheme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

interface AppTheme {
  /** Current color scheme: 'light' or 'dark' */
  colorScheme: ThemeColorScheme;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Resolved theme colors for the current scheme */
  colors: ThemeColors;
}

export function useAppTheme(): AppTheme {
  const systemScheme = useColorScheme();
  const colorScheme: ThemeColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
    colors: Colors[colorScheme],
  };
}
