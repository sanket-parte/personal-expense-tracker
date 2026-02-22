/**
 * NLAddScreen
 *
 * Screen that allows users to type natural language statements
 * like "Spent $15 on lunch", parses them via NLP service,
 * and forwards the data to AddExpenseScreen.
 */

import { Button, Input } from '@/components/ui';
import { Spacing, Typography } from '@/constants/theme';
import { useAppNavigation, useAppTheme } from '@/hooks';
import { parseNaturalLanguageExpense } from '@/services/nlpParser';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function NLAddScreen(): React.JSX.Element {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!text.trim()) {
      setError('Please type a valid statement.');
      return;
    }
    setError('');
    setIsProcessing(true);
    Keyboard.dismiss();

    try {
      const data = await parseNaturalLanguageExpense(text);
      navigation.replace('AddExpense', { prefillData: data });
    } catch {
      setError('Could not understand. Please try again or use Manual Entry.');
      setIsProcessing(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={28}
            color={colors.text}
            onPress={() => navigation.goBack()}
            style={styles.closeIcon}
          />
          <Text style={[styles.title, { color: colors.text }]}>Smart Entry</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.instruction, { color: colors.textSecondary }]}>
            Just type naturally. We'll figure out the amount, title, date, and category.
          </Text>

          <Input
            value={text}
            onChangeText={(t) => {
              setText(t);
              setError('');
            }}
            placeholder="e.g. Spent $15 on coffee this morning"
            multiline
            numberOfLines={4}
            error={error}
          />

          <View style={styles.footer}>
            <Button
              title={isProcessing ? 'Processing...' : 'Generate Expense'}
              onPress={handleParse}
              isLoading={isProcessing}
              disabled={isProcessing || !text.trim()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
  },
  closeIcon: {
    marginRight: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  instruction: {
    fontSize: Typography.fontSize.base,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  footer: {
    marginTop: Spacing.xl,
  },
});
