/**
 * HistoryScreen
 *
 * Displays all past expense transactions grouped by date
 * in a scrollable section list.
 */

import { TransactionItem } from '@/components';
import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import { groupExpensesByDate } from '@/utils/dateHelpers';
import React, { useEffect, useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HistoryScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { items, refreshExpenses } = useExpenseStore();

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const sections = useMemo(() => groupExpensesByDate(items), [items]);

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No transactions found.
            </Text>
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
    paddingVertical: 10,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    textTransform: 'uppercase',
  },
  emptyContainer: {
    padding: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
  },
});
