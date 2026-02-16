/**
 * DashboardScreen
 *
 * Main landing screen displaying a financial summary card and
 * a list of recent expense transactions.
 */

import { SummaryCard, TransactionList } from '@/components';
import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import type { AppTabParamList } from '@/types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function DashboardScreen() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();
  const { items, refreshExpenses } = useExpenseStore();

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  // Derived state — items already ordered by date desc from expenseService
  const totalExpenses = useMemo(() => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }, [items]);

  const recentTransactions = useMemo(() => {
    return items.slice(0, 5);
  }, [items]);

  const handleSeeAll = useCallback(() => {
    navigation.navigate('History');
  }, [navigation]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.title, { color: colors.text }]}>My Wallet</Text>
        </View>
      </View>

      <View style={styles.content}>
        <SummaryCard total={totalExpenses} />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <Pressable
            onPress={handleSeeAll}
            accessibilityLabel="See all transactions"
            accessibilityHint="Navigate to the full transaction history"
          >
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </Pressable>
        </View>

        <TransactionList
          items={recentTransactions}
          scrollEnabled={false} // Dashboard scrolls if needed, or list is short enough
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
  },
  seeAll: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});
