/**
 * Application Root
 *
 * Main App component that wraps the entire application with
 * necessary providers and top-level configuration.
 */

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { APP_CONFIG, BorderRadius, Shadows, Spacing, Typography } from '@/constants';
import { useAppTheme } from '@/hooks';

export default function App(): React.JSX.Element {
  const { colors, isDark } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.card, { backgroundColor: colors.surface }, Shadows.md]}>
          <Text style={[styles.title, { color: colors.primary }]}>{APP_CONFIG.name}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your app is running successfully! 🎉
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.successLight }]}>
            <Text style={[styles.badgeText, { color: colors.success }]}>
              v{APP_CONFIG.version} • {Platform.OS}
            </Text>
          </View>
        </View>
      </View>

      <ExpoStatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.regular,
    lineHeight: Typography.lineHeight.base,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});
