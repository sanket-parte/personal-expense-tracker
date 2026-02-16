/**
 * DashboardScreen Tests
 *
 * Covers rendering, navigation, and dark/light mode status bar.
 */

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { DashboardScreen } from '../DashboardScreen';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock store state
interface MockStoreState {
  items: Array<{
    id: number;
    amount: number;
    title: string;
    date: Date;
    categoryId: number;
    createdAt: Date;
  }>;
  refreshExpenses: jest.Mock;
  isLoading: boolean;
  addExpense: jest.Mock;
  clearExpenses: jest.Mock;
}

const mockStoreState: MockStoreState = {
  items: [
    { id: 1, amount: 50, title: 'Test', date: new Date(), categoryId: 1, createdAt: new Date() },
  ],
  refreshExpenses: jest.fn(),
  isLoading: false,
  addExpense: jest.fn(),
  clearExpenses: jest.fn(),
};

jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn((selector?: (state: MockStoreState) => unknown) => {
    if (typeof selector === 'function') {
      return selector(mockStoreState);
    }
    return mockStoreState;
  }),
}));

// Mock useAppTheme
const mockUseAppTheme = jest.fn(() => ({
  colors: {
    text: 'black',
    textSecondary: '#666',
    textTertiary: '#999',
    background: 'white',
    card: 'white',
    primary: 'blue',
    border: '#ccc',
    borderLight: '#eee',
    surface: '#fff',
    surfaceVariant: '#f5f5f5',
    error: 'red',
  },
  isDark: false,
}));

jest.mock('@/hooks', () => ({
  useAppTheme: () => mockUseAppTheme(),
}));

describe('DashboardScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppTheme.mockReturnValue({
      colors: {
        text: 'black',
        textSecondary: '#666',
        textTertiary: '#999',
        background: 'white',
        card: 'white',
        primary: 'blue',
        border: '#ccc',
        borderLight: '#eee',
        surface: '#fff',
        surfaceVariant: '#f5f5f5',
        error: 'red',
      },
      isDark: false,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText('Total Expenses')).toBeTruthy();
    expect(getByText('Recent Activity')).toBeTruthy();
  });

  it('navigates to History on See All press', () => {
    const { getByText } = render(<DashboardScreen />);
    fireEvent.press(getByText('See All'));
    expect(mockNavigate).toHaveBeenCalledWith('History');
  });

  it('renders with dark mode status bar', () => {
    mockUseAppTheme.mockReturnValue({
      colors: {
        text: 'white',
        textSecondary: '#aaa',
        textTertiary: '#888',
        background: 'black',
        card: '#1c1c1e',
        primary: 'blue',
        border: '#333',
        borderLight: '#444',
        surface: '#1c1c1e',
        surfaceVariant: '#2c2c2e',
        error: 'red',
      },
      isDark: true,
    });
    render(<DashboardScreen />);
  });

  it('renders with light mode status bar', () => {
    render(<DashboardScreen />);
  });
});
