/**
 * useAddExpense Hook
 *
 * Encapsulates all form state and validation logic for creating
 * a new expense entry. Used by AddExpenseScreen.
 */

import { useExpenseStore } from '@/store/useExpenseStore';
import type { ParsedExpenseData } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useAddExpense(initialData?: ParsedExpenseData) {
  const navigation = useNavigation();
  const addExpense = useExpenseStore((state) => state.addExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);

  const [amount, setAmount] = useState(initialData?.amount ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [categoryId, setCategoryId] = useState<number | null>(initialData?.categoryId ?? null);

  // Re-hydrate the ISO string back into a Date object so non-serializable errors don't occur
  const [date] = useState(initialData?.date ? new Date(initialData.date) : new Date());

  const parsedAmount = Number(amount);
  const isAmountValid = !!amount && !isNaN(parsedAmount) && parsedAmount > 0;
  const isTitleValid = !!title.trim();
  const isCategoryValid = !!categoryId;

  const isValid = isAmountValid && isTitleValid && isCategoryValid;

  const handleSave = async () => {
    // Guard: button should be disabled, but provide field-specific feedback
    if (!isAmountValid) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }
    if (!isTitleValid) {
      Alert.alert('Missing Title', 'Please enter a description for the expense.');
      return;
    }
    if (!isCategoryValid) {
      Alert.alert('Missing Category', 'Please select a category.');
      return;
    }

    try {
      await addExpense({
        amount: parsedAmount,
        title: title.trim(),
        date: date,
        categoryId: categoryId,
      });
      Alert.alert('Saved!', 'Your expense has been recorded.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to save expense. Please try again.');
    }
  };

  return {
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
  };
}
