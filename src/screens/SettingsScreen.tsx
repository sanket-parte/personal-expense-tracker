/**
 * SettingsScreen
 *
 * Application settings interface providing appearance preferences
 * and data management actions (e.g., clear all expenses).
 */

import { useAppTheme } from '@/hooks';
import { expenseService } from '@/services/expenseService';
import { useExpenseStore } from '@/store/useExpenseStore';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SettingsScreen() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const refreshExpenses = useExpenseStore((state) => state.refreshExpenses);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all expenses? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              await expenseService.deleteAll();
              await refreshExpenses();
              Alert.alert('Success', 'All data has been cleared.');
            } catch {
              Alert.alert('Error', 'Failed to clear data.');
            } finally {
              setIsClearing(false);
            }
          },
        },
      ],
    );
  };

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
            disabled={isClearing}
            testID="clear-data-button"
          >
            <Text style={[styles.rowLabel, { color: colors.error }]}>
              {isClearing ? 'Clearing...' : 'Clear All Data'}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  section: {
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: {
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});
