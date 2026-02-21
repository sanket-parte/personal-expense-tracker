import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { AppNavigator } from '../AppNavigator';

// Mock @expo/vector-icons to avoid native font loading in tests
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock the screens to avoid testing them again
jest.mock('@/screens', () => ({
  DashboardScreen: () => null,
  AddExpenseScreen: () => null,
  HistoryScreen: () => null,
  SettingsScreen: () => null,
}));

describe('AppNavigator', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>,
    );
  });
});
