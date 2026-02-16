/**
 * useAddExpense Hook
 *
 * Encapsulates all form state and validation logic for creating
 * a new expense entry. Used by AddExpenseScreen.
 */

import { useExpenseStore } from '@/store/useExpenseStore';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useAddExpense() {
  const navigation = useNavigation();
  const addExpense = useExpenseStore((state) => state.addExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [date] = useState(new Date());

  const isValid = !!amount && !!title.trim() && !!categoryId;

  const handleSave = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a description for the expense.');
      return;
    }
    if (!categoryId) {
      Alert.alert('Missing Category', 'Please select a category.');
      return;
    }

    try {
      await addExpense({
        amount: Number(amount),
        title: title.trim(),
        date: date,
        categoryId: categoryId,
      });
      navigation.goBack();
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
