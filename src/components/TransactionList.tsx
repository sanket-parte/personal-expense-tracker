import { CATEGORIES, getCategoryById } from '@/constants/categories';
import { type Expense } from '@/db/schema';
import { useAppTheme } from '@/hooks';
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
      <Text style={[styles.amount, { color: colors.text }]}>-${item.amount.toFixed(2)}</Text>
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
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
  },
});
