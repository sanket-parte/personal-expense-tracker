import { useAppTheme } from '@/hooks';
import { render } from '@testing-library/react-native';
import React from 'react';
import { RootNavigator } from '../RootNavigator';

// Mock the AppNavigator to isolate RootNavigator testing
jest.mock('../AppNavigator', () => ({
  AppNavigator: () => null,
}));

// Mock useAppTheme
jest.mock('@/hooks', () => ({
  useAppTheme: jest.fn(),
}));

describe('RootNavigator', () => {
  it('renders without crashing', () => {
    (useAppTheme as jest.Mock).mockReturnValue({ isDark: false });
    render(<RootNavigator />);
  });

  it('renders in dark mode', () => {
    (useAppTheme as jest.Mock).mockReturnValue({ isDark: true });
    render(<RootNavigator />);
  });
});
