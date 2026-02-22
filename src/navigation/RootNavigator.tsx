import { useAppTheme } from '@/hooks';
import { AddExpenseScreen, NLAddScreen, ScanReceiptScreen } from '@/screens';
import type { RootStackParamList } from '@/types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isDark } = useAppTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="App" component={AppNavigator} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="ScanReceipt" component={ScanReceiptScreen} />
          <Stack.Screen name="NLAdd" component={NLAddScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
