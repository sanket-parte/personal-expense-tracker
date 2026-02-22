/**
 * HistoryScreen
 *
 * Displays all past expense transactions using FlashList.
 * Includes SearchBar and FilterChips for local filtering.
 */

import { EmptyState, TransactionItem } from '@/components';
import { FilterChips, SearchBar } from '@/components/ui';
import { Spacing, Typography } from '@/constants/theme';
import type { Expense } from '@/db/schema';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import { flattenExpensesForFlashList } from '@/utils/dateHelpers';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Type alias for our flattened section structure
export type HistoryListItem = string | Expense;

export function HistoryScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { items, refreshExpenses } = useExpenseStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Local filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshExpenses();
    setIsRefreshing(false);
  }, [refreshExpenses]);

  // Apply local filters before grouping
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategoryId ? item.categoryId === activeCategoryId : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, activeCategoryId]);

  // Flatten for FlashList
  const { data: flattenedData, stickyHeaderIndices } = useMemo(
    () => flattenExpensesForFlashList(filteredItems),
    [filteredItems],
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>History</Text>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
        <FilterChips activeCategoryId={activeCategoryId} onSelectCategory={setActiveCategoryId} />
      </View>

      <FlashList<HistoryListItem>
        data={flattenedData}
        keyExtractor={(item) => {
          if (typeof item === 'string') return `header-${item}`;
          return item.id.toString();
        }}
        // @ts-expect-error - FlashList union generic constraints issues mapped in review log
        estimatedItemSize={75}
        stickyHeaderIndices={stickyHeaderIndices}
        getItemType={(item) => (typeof item === 'string' ? 'sectionHeader' : 'row')}
        renderItem={({ item }) => {
          if (typeof item === 'string') {
            return (
              <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{item}</Text>
              </View>
            );
          }
          return <TransactionItem item={item} />;
        }}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyState
              icon={searchQuery || activeCategoryId ? '🔍' : '📋'}
              title={
                searchQuery || activeCategoryId ? 'No matching results' : 'No transactions found'
              }
              subtitle={
                searchQuery || activeCategoryId
                  ? 'Try adjusting your filters'
                  : 'Your expense history will appear here'
              }
            />
          </View>
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
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  filtersContainer: {
    paddingBottom: Spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
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
  emptyContainer: {
    marginTop: Spacing['2xl'],
  },
});
