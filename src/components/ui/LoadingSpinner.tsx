/**
 * LoadingSpinner Component
 *
 * Centered ActivityIndicator using the theme primary color.
 * Provides a consistent loading state across all screens.
 */

import { useAppTheme } from '@/hooks';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingSpinner({ size = 'large', color }: LoadingSpinnerProps): React.JSX.Element {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color ?? colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
