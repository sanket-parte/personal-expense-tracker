/**
 * AddExpenseScreen
 *
 * Screen for creating new expense entries. Provides inputs for
 * amount, title, category, and date with keyboard-aware layout.
 */

import { CATEGORIES } from '@/constants/categories';
import { APP_CONFIG } from '@/constants/config';
import { useAppTheme } from '@/hooks';
import { useAddExpense } from '@/hooks/useAddExpense';
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

/** Currency symbol mapping for display */
const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const currencySymbol = CURRENCY_SYMBOLS[APP_CONFIG.defaultCurrency] ?? '$';

export function AddExpenseScreen() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
  } = useAddExpense();

  const isDisabled = !isValid || isLoading;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} testID="keyboard-dismiss">
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10, paddingHorizontal: 20 }]}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Cancel"
            accessibilityHint="Go back without saving"
          >
            <Text style={{ color: colors.primary, fontSize: 16 }}>Cancel</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>New Expense</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={[styles.currencySymbol, { color: colors.text }]}>{currencySymbol}</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              placeholder="0.00"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              accessibilityLabel="Expense amount"
              accessibilityHint="Enter the expense amount"
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
            />
          </View>

          {/* Category Selector */}
          <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>Category</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: categoryId === cat.id ? cat.color : colors.surfaceVariant,
                  },
                ]}
                onPress={() => setCategoryId(cat.id)}
                accessibilityLabel={`Category ${cat.name}`}
                accessibilityHint={`Select ${cat.name} as the expense category`}
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
              </Pressable>
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
          <Pressable
            style={[
              styles.saveButton,
              {
                backgroundColor: colors.primary,
                opacity: isDisabled ? 0.6 : 1,
              },
            ]}
            onPress={handleSave}
            disabled={isDisabled}
            testID="save-button"
            accessibilityLabel="Save expense"
            accessibilityHint="Save the expense entry"
          >
            <Text style={styles.saveButtonText}>{isLoading ? 'Saving...' : 'Save Expense'}</Text>
          </Pressable>
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    marginRight: 4,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '700',
    minWidth: 100,
    textAlign: 'center',
  },
  inputGroup: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  textInput: {
    fontSize: 17,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    minWidth: '30%',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
