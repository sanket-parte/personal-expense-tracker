import { render } from '@testing-library/react-native';
import React from 'react';
import { AddExpenseScreen } from '../AddExpenseScreen';
import { HistoryScreen } from '../HistoryScreen';
import { SettingsScreen } from '../SettingsScreen';

describe('Screen Shells', () => {
  it('AddExpenseScreen renders correctly', () => {
    const { getByText } = render(<AddExpenseScreen />);
    expect(getByText('Add Expense Screen')).toBeTruthy();
  });

  it('HistoryScreen renders correctly', () => {
    const { getByText } = render(<HistoryScreen />);
    expect(getByText('History Screen')).toBeTruthy();
  });

  it('SettingsScreen renders correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText('Settings Screen')).toBeTruthy();
  });
});
