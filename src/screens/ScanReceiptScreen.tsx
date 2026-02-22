/**
 * ScanReceiptScreen
 *
 * Screen that triggers the image picker / camera, shows a loading state
 * during "OCR processing", and then forwards the parsed data to the
 * standard AddExpenseScreen.
 */

import { Button, EmptyState } from '@/components/ui';
import { Spacing, Typography } from '@/constants/theme';
import { useAppNavigation, useAppTheme } from '@/hooks';
import { scanReceiptFromCamera, scanReceiptFromGallery } from '@/services/receiptScanner';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ScanReceiptScreen(): React.JSX.Element {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (type: 'camera' | 'gallery') => {
    setIsProcessing(true);
    const data = type === 'camera' ? await scanReceiptFromCamera() : await scanReceiptFromGallery();

    if (data) {
      // Immediately transition to the AddExpenseScreen with extracted param data
      navigation.replace('AddExpense', { prefillData: data });
    } else {
      setIsProcessing(false);
    }
  };

  return (
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
        <Text style={[styles.title, { color: colors.text }]}>Scan Receipt</Text>
      </View>

      <View style={styles.content}>
        {isProcessing ? (
          <EmptyState
            icon="⚙️"
            title="Analyzing Receipt..."
            subtitle="Extracting amount, date, and category."
          />
        ) : (
          <View style={styles.buttonContainer}>
            <Text style={[styles.instruction, { color: colors.textSecondary }]}>
              Take a photo of your receipt or upload one from your gallery to automatically fill in
              the expense details.
            </Text>

            <Button title="Take Photo" onPress={() => handleScan('camera')} variant="primary" />
            <View style={{ height: Spacing.md }} />
            <Button
              title="Upload from Gallery"
              onPress={() => handleScan('gallery')}
              variant="secondary"
            />
          </View>
        )}
      </View>
    </View>
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
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  buttonContainer: {
    width: '100%',
  },
  instruction: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    lineHeight: 24,
  },
});
