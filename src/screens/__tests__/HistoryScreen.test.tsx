import { render } from '@testing-library/react-native';
import React from 'react';
import { HistoryScreen } from '../HistoryScreen';

// Mock useExpenseStore
jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn(() => ({
    items: [
      { id: 1, amount: 50, title: 'Gym', date: new Date(), categoryId: 5 }, // Today
    ],
    refreshExpenses: jest.fn(),
  })),
}));

describe('HistoryScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HistoryScreen />);

    expect(getByText('History')).toBeTruthy();
    // 'Today' section header might be rendered
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Gym')).toBeTruthy();
  });
});
