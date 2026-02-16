import { useAppTheme } from '@/hooks';
import { AddExpenseScreen, DashboardScreen, HistoryScreen, SettingsScreen } from '@/screens';
import type { AppTabParamList } from '@/types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator<AppTabParamList>();

/** Tab bar icon config: maps screen name to an emoji label */
const TAB_ICONS: Record<keyof AppTabParamList, string> = {
  Dashboard: '🏠',
  AddExpense: '➕',
  History: '📋',
  Settings: '⚙️',
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
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>{TAB_ICONS[route.name]}</Text>
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
