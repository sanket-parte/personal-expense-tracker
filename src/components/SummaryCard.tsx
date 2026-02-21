/**
 * SummaryCard Component
 *
 * Displays the total expenses in a prominent card on the dashboard.
 * Adapts to the current theme and configured currency.
 */

import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { getCurrencySymbol } from '@/utils/currency';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SummaryCardProps {
  total: number;
}

export function SummaryCard({ total }: SummaryCardProps) {
  const { colors } = useAppTheme();
  const symbol = getCurrencySymbol();

  return (
    <View style={[styles.card, { backgroundColor: colors.primary }]}>
      <Text style={[styles.label, { color: colors.onPrimaryMuted }]}>Total Expenses</Text>
      <Text style={[styles.amount, { color: colors.onPrimary }]}>
        {symbol}
        {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <Text style={[styles.period, { color: colors.onPrimaryMuted }]}>This Month</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },
  amount: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  period: {
    fontSize: Typography.fontSize.xs,
  },
});
