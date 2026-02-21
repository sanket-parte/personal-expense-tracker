/**
 * DashboardScreen
 *
 * Main landing screen displaying a financial summary card and
 * a list of recent expense transactions with entrance animations
 * and pull-to-refresh support.
 */

import { EmptyState, SummaryCard, TransactionList } from '@/components';
import { FadeInView, SkeletonPlaceholder } from '@/components/ui';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import type { AppTabParamList } from '@/types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function DashboardScreen() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<AppTabParamList>>();
  const { items, refreshExpenses, isLoading } = useExpenseStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const totalExpenses = useMemo(() => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }, [items]);

  const recentTransactions = useMemo(() => {
    return items.slice(0, 5);
  }, [items]);

  const handleSeeAll = useCallback(() => {
    navigation.navigate('History');
  }, [navigation]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshExpenses();
    setIsRefreshing(false);
  }, [refreshExpenses]);

  /** Render skeleton placeholders while loading initial data */
  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <SkeletonPlaceholder width="100%" height={140} borderRadius={BorderRadius.xl} />
      <SkeletonPlaceholder width="50%" height={20} borderRadius={BorderRadius.sm} />
      {[1, 2, 3].map((i) => (
        <SkeletonPlaceholder key={i} width="100%" height={72} borderRadius={BorderRadius.lg} />
      ))}
    </View>
  );

  const isInitialLoading = isLoading && items.length === 0;

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

      {isInitialLoading ? (
        renderSkeleton()
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <FadeInView>
            <SummaryCard total={totalExpenses} />
          </FadeInView>

          <FadeInView delay={100}>
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

            {recentTransactions.length === 0 ? (
              <EmptyState
                icon="💰"
                title="No expenses yet"
                subtitle="Tap + to add your first expense"
              />
            ) : (
              <TransactionList items={recentTransactions} scrollEnabled={false} />
            )}
          </FadeInView>
        </ScrollView>
      )}
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
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
  skeletonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.base,
  },
});
