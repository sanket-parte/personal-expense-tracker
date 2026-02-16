/**
 * SummaryCard Component
 *
 * Displays the total expenses in a prominent card on the dashboard.
 * Adapts to the current theme and configured currency.
 */

import { Shadows } from '@/constants/theme';
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
      <Text style={styles.label}>Total Expenses</Text>
      <Text style={styles.amount}>
        {symbol}
        {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <Text style={styles.period}>This Month</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: 'rgba(255,255,255,0.8)',
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  period: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
});
