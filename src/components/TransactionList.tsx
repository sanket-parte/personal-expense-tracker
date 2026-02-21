/**
 * TransactionList Component
 *
 * Provides a reusable FlatList-based transaction list and a
 * standalone TransactionItem component for rendering individual
 * expense entries with category icon, title, date, and amount.
 */

import { CATEGORIES, getCategoryById } from '@/constants/categories';
import { Spacing, Typography } from '@/constants/theme';
import { type Expense } from '@/db/schema';
import { useAppTheme } from '@/hooks';
import { getCurrencySymbol } from '@/utils/currency';
import { format } from 'date-fns';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

interface TransactionItemProps {
  item: Expense;
  onPress?: () => void;
}

export function TransactionItem({ item, onPress }: TransactionItemProps) {
  const { colors } = useAppTheme();
  const category = getCategoryById(item.categoryId || 8) || CATEGORIES[7]; // Default to Other
  const symbol = getCurrencySymbol();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.itemContainer,
        { backgroundColor: colors.surface, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      testID={`transaction-item-${item.id}`}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {format(item.date, 'MMM dd, HH:mm')}
        </Text>
      </View>
      <Text style={[styles.amount, { color: colors.text }]}>
        -{symbol}
        {item.amount.toFixed(2)}
      </Text>
    </Pressable>
  );
}

interface TransactionListProps {
  items: Expense[];
  onPressItem?: (item: Expense) => void;
  ListHeaderComponent?: React.ComponentType<unknown> | React.ReactElement | null;
  scrollEnabled?: boolean;
}

export function TransactionList({
  items,
  onPressItem,
  ListHeaderComponent,
  scrollEnabled = true,
}: TransactionListProps) {
  const { colors } = useAppTheme();

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TransactionItem item={item} onPress={() => onPressItem?.(item)} />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No transactions yet.
          </Text>
        </View>
      }
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Spacing.lg,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.base,
  },
  icon: {
    fontSize: Typography.fontSize.lg,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: Typography.fontSize.xs,
  },
  amount: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  emptyContainer: {
    padding: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
  },
});
