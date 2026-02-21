/**
 * SettingsScreen
 *
 * Application settings interface providing appearance preferences
 * and data management actions using Card and Button primitives.
 */

import { Button, Card, CardBody, CardHeader } from '@/components/ui';
import { Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { useExpenseStore } from '@/store/useExpenseStore';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
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
        <Card>
          <CardHeader>
            <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>APPEARANCE</Text>
          </CardHeader>
          <CardBody>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { color: colors.text }]}>Dark Mode</Text>
              <Switch
                value={isDark}
                onValueChange={() => {
                  Alert.alert(
                    'Info',
                    'Theme mimics system settings. Change your device theme to switch.',
                  );
                }}
                accessibilityLabel="Dark mode toggle"
                accessibilityHint="Theme follows system settings"
              />
            </View>
          </CardBody>
        </Card>

        {/* Data Section */}
        <Card>
          <CardHeader>
            <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
              DATA MANAGEMENT
            </Text>
          </CardHeader>
          <CardBody>
            <Button
              variant="destructive"
              title={isLoading ? 'Clearing...' : 'Clear All Data'}
              onPress={handleClearData}
              disabled={isLoading}
              isLoading={isLoading}
              testID="clear-data-button"
              accessibilityLabel="Clear all expense data"
              accessibilityHint="Delete all saved expenses permanently"
            />
          </CardBody>
        </Card>

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
  sectionHeader: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
