/**
 * AppNavigator
 *
 * Bottom tab navigator for the main application screens.
 * Uses Ionicons from expo-vector-icons for tab bar icons.
 */

import { useAppTheme } from '@/hooks';
import { AddExpenseScreen, DashboardScreen, HistoryScreen, SettingsScreen } from '@/screens';
import type { AppTabParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Typography } from '@/constants/theme';

const Tab = createBottomTabNavigator<AppTabParamList>();

/** Tab bar icon config: maps screen name to focused/unfocused icon names */
const TAB_ICONS: Record<
  keyof AppTabParamList,
  { focused: keyof typeof Ionicons.glyphMap; unfocused: keyof typeof Ionicons.glyphMap }
> = {
  Dashboard: { focused: 'home', unfocused: 'home-outline' },
  AddExpense: { focused: 'add-circle', unfocused: 'add-circle-outline' },
  History: { focused: 'time', unfocused: 'time-outline' },
  Settings: { focused: 'settings', unfocused: 'settings-outline' },
};

export function AppNavigator() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={TAB_ICONS[route.name][focused ? 'focused' : 'unfocused']}
            size={Typography.fontSize.xl}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add' }} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
