/**
 * Card Component
 *
 * Composable card primitive with CardHeader and CardBody sub-components.
 * Follows the compound component pattern for flexible layouts.
 */

import { BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = 'default', style }: CardProps): React.JSX.Element {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: variant === 'outlined' ? 'transparent' : colors.surface },
        variant === 'outlined' && { borderWidth: 1, borderColor: colors.border },
        Shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <View style={styles.cardHeader}>{children}</View>;
}

export function CardBody({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <View style={styles.cardBody}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  cardHeader: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  cardBody: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
  },
});
