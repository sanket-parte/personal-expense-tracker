/**
 * AddExpenseScreen
 *
 * Screen for creating new expense entries. Provides inputs for
 * amount, title, category, and date with keyboard-aware layout.
 */

import { AnimatedPressable, Button } from '@/components/ui';
import { CATEGORIES } from '@/constants/categories';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useAddExpense } from '@/hooks/useAddExpense';
import { getCurrencySymbol } from '@/utils/currency';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddExpenseScreen({ route }: any) {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const symbol = getCurrencySymbol();

  const prefillData = route?.params?.prefillData;

  const {
    amount,
    setAmount,
    title,
    setTitle,
    categoryId,
    setCategoryId,
    date,
    isLoading,
    isValid,
    handleSave,
  } = useAddExpense(prefillData);

  const isDisabled = !isValid || isLoading;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} testID="keyboard-dismiss">
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={[styles.header, { paddingTop: insets.top + 10, paddingHorizontal: Spacing.lg }]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Cancel"
            accessibilityHint="Go back without saving"
          >
            <Text style={[styles.cancelText, { color: colors.primary }]}>Cancel</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>New Expense</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={[styles.currencySymbol, { color: colors.text }]}>{symbol}</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              placeholder="0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              accessibilityLabel="Expense amount"
              accessibilityHint="Enter the expense amount"
              testID="amount-input"
              autoFocus
            />
          </View>

          {/* Title Input */}
          <View style={[styles.inputGroup, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="What is this for?"
              placeholderTextColor={colors.textTertiary}
              value={title}
              onChangeText={setTitle}
              accessibilityLabel="Expense description"
              accessibilityHint="Enter a description for this expense"
              testID="title-input"
            />
          </View>

          {/* Category Selector */}
          <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>Category</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <AnimatedPressable
                key={cat.id}
                scaleValue={0.92}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: categoryId === cat.id ? cat.color : colors.surfaceVariant,
                  },
                ]}
                onPress={() => setCategoryId(cat.id)}
                accessibilityLabel={`Category ${cat.name}`}
                accessibilityHint={`Select ${cat.name} as the expense category`}
                testID={`category-${cat.id}`}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: categoryId === cat.id ? colors.background : colors.text,
                      fontWeight: categoryId === cat.id ? '600' : '400',
                    },
                  ]}
                >
                  {cat.name}
                </Text>
              </AnimatedPressable>
            ))}
          </View>

          {/* Date Information */}
          <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>Date</Text>
          <View style={[styles.inputGroup, { backgroundColor: colors.surface }]}>
            <Text style={[styles.dateText, { color: colors.text }]}>
              {format(date, 'MMM dd, yyyy')} • Today
            </Text>
          </View>
        </ScrollView>

        {/* Footer / Save Button */}
        <View
          style={[
            styles.footer,
            { paddingBottom: insets.bottom + 10, borderTopColor: colors.border },
          ]}
        >
          <Button
            title={isLoading ? 'Saving...' : 'Save Expense'}
            onPress={handleSave}
            disabled={isDisabled}
            isLoading={isLoading}
            testID="save-button"
            accessibilityLabel="Save expense"
            accessibilityHint="Save the expense entry"
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.base,
  },
  headerTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
  },
  cancelText: {
    fontSize: Typography.fontSize.base,
  },
  headerSpacer: {
    width: 50,
  },
  backButton: {
    padding: Spacing.sm,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['5xl'] + Spacing['3xl'],
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing['3xl'],
  },
  currencySymbol: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semiBold,
    marginRight: Spacing.xs,
  },
  amountInput: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    minWidth: 100,
    textAlign: 'center',
  },
  inputGroup: {
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
  },
  textInput: {
    fontSize: Typography.fontSize.md,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xl,
    minWidth: '30%',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: Typography.fontSize.base,
    marginRight: Spacing.sm,
  },
  categoryName: {
    fontSize: Typography.fontSize.sm,
  },
  dateText: {
    fontSize: Typography.fontSize.base,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
