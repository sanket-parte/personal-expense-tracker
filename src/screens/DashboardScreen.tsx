/**
 * DashboardScreen
 *
 * Main landing screen displaying a financial summary card and
 * a list of recent expense transactions.
 */

import { SummaryCard, TransactionList } from '@/components';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import type { AppTabParamList } from '@/types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function DashboardScreen() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();
  const { items, refreshExpenses } = useExpenseStore();

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  // Derived state
  const totalExpenses = useMemo(() => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }, [items]);

  const recentTransactions = useMemo(() => {
    return [...items].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [items]);

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
          <Text
            style={[styles.seeAll, { color: colors.primary }]}
            onPress={() => navigation.navigate('History')}
          >
            See All
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
});
