/**
 * SettingsScreen
 *
 * Application settings interface providing appearance preferences
 * and data management actions (e.g., clear all expenses).
 */

import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SettingsScreen() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const clearExpenses = useExpenseStore((state) => state.clearExpenses);
  const isLoading = useExpenseStore((state) => state.isLoading);

  const handleClearData = useCallback(() => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all expenses? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearExpenses();
              Alert.alert('Success', 'All data has been cleared.');
            } catch {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ],
    );
  }, [clearExpenses]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Appearance Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>APPEARANCE</Text>
          <View style={[styles.row, { borderBottomColor: colors.borderLight }]}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={() => {
                Alert.alert(
                  'Info',
                  'Theme mimics system settings. Change your device theme to switch.',
                );
              }}
            />
          </View>
        </View>

        {/* Data Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
            DATA MANAGEMENT
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.row,
              { opacity: pressed ? 0.7 : 1, borderBottomWidth: 0 },
            ]}
            onPress={handleClearData}
            disabled={isLoading}
            testID="clear-data-button"
          >
            <Text style={[styles.rowLabel, { color: colors.error }]}>
              {isLoading ? 'Clearing...' : 'Clear All Data'}
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.version, { color: colors.textTertiary }]}>Version 1.0.0 (MVP)</Text>
      </View>
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
  content: {
    padding: Spacing.lg,
  },
  section: {
    borderRadius: 12,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: {
    fontSize: Typography.fontSize.base,
  },
  version: {
    textAlign: 'center',
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.lg,
  },
});
