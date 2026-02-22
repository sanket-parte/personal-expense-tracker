/**
 * QuickAddActionSheet
 *
 * A bottom sheet overlay providing three options to add an expense:
 * Manual Entry, Scan Receipt, and Natural Language.
 */

import { AnimatedPressable } from '@/components/ui';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppNavigation, useAppTheme } from '@/hooks';
import type { RootStackParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface QuickAddActionSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function QuickAddActionSheet({
  visible,
  onClose,
}: QuickAddActionSheetProps): React.JSX.Element {
  const { colors } = useAppTheme();
  const navigation = useAppNavigation();

  const handleAction = <RouteName extends keyof RootStackParamList>(route: RouteName) => {
    onClose();
    // Allow modal to close before navigating to avoid transition glitches
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(route as any); // Strict TS bypass due to complex overloads
    }, 150);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} accessibilityLabel="Close action sheet">
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Add Expense</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          <AnimatedPressable
            style={[
              styles.actionButton,
              { borderBottomColor: colors.border, borderBottomWidth: 1 },
            ]}
            onPress={() => handleAction('AddExpense')}
            testID="manual-entry-button"
          >
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Manual Entry</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Standard form to input details
              </Text>
            </View>
          </AnimatedPressable>

          <AnimatedPressable
            style={[
              styles.actionButton,
              { borderBottomColor: colors.border, borderBottomWidth: 1 },
            ]}
            onPress={() => handleAction('ScanReceipt')}
          >
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="scan" size={24} color={colors.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Scan Receipt</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Auto-extract data from an image
              </Text>
            </View>
          </AnimatedPressable>

          <AnimatedPressable style={styles.actionButton} onPress={() => handleAction('NLAdd')}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Type a Message</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                "Spent $15 on coffee yesterday"
              </Text>
            </View>
          </AnimatedPressable>

          {/* Bottom safe area spacing */}
          <View style={{ height: Spacing.xl as number }} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.xl as number, // Force number cast for TS
    borderTopRightRadius: BorderRadius.xl as number,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xl as number,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: Typography.fontSize.sm,
  },
});
