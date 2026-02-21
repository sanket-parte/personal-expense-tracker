/**
 * EmptyState Component
 *
 * Visual placeholder for empty lists with icon, title, and subtitle.
 * Provides a consistent empty state experience across all screens.
 */

import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps): React.JSX.Element {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: Typography.fontSize['3xl'],
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
});
