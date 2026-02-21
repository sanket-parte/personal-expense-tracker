/**
 * HistoryScreen
 *
 * Displays all past expense transactions grouped by date
 * in a scrollable section list with pull-to-refresh support.
 */

import { EmptyState, TransactionItem } from '@/components';
import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import { groupExpensesByDate } from '@/utils/dateHelpers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HistoryScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { items, refreshExpenses } = useExpenseStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const sections = useMemo(() => groupExpensesByDate(items), [items]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshExpenses();
    setIsRefreshing(false);
  }, [refreshExpenses]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>History</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="📋"
            title="No transactions found"
            subtitle="Your expense history will appear here"
          />
        }
      />
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
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  sectionHeader: {
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    textTransform: 'uppercase',
  },
});
