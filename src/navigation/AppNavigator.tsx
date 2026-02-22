/**
 * AppNavigator
 *
 * Bottom tab navigator for the main application screens.
 * Uses Ionicons from expo-vector-icons for tab bar icons.
 * Includes intercept logic for the global Quick Add button.
 */

import { QuickAddActionSheet } from '@/components/QuickAddActionSheet';
import { Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { DashboardScreen, HistoryScreen, SettingsScreen } from '@/screens';
import type { AppTabParamList } from '@/types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

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
  const [isQuickAddVisible, setQuickAddVisible] = useState(false);

  return (
    <>
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

        <Tab.Screen
          name="AddExpense"
          component={View}
          options={{
            title: 'Add',
            tabBarButton: () => (
              <Pressable
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setQuickAddVisible(true)}
                testID="tab-bar-add"
              >
                <Ionicons name="add-circle" size={28} color={colors.textSecondary} />
                <Text style={{ fontSize: 10, color: colors.textSecondary, marginTop: 2 }}>Add</Text>
              </Pressable>
            ),
          }}
        />

        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

      <QuickAddActionSheet visible={isQuickAddVisible} onClose={() => setQuickAddVisible(false)} />
    </>
  );
}
