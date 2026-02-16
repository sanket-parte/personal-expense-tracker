/**
 * TransactionList Tests
 *
 * Covers rendering, empty states, item press handling,
 * category fallback, and Pressable style branch coverage.
 */

import { type Expense } from '@/db/schema';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { TransactionItem, TransactionList } from '../TransactionList';

const mockExpense: Expense = {
  id: 1,
  title: 'Test Expense',
  amount: 50,
  date: new Date('2024-01-01T12:00:00'),
  categoryId: 1,
  createdAt: new Date('2024-01-01T12:00:00'),
};

describe('TransactionList', () => {
  it('renders list of transactions', () => {
    const { getByText } = render(<TransactionList items={[mockExpense]} />);

    expect(getByText('Test Expense')).toBeTruthy();
    expect(getByText('-$50.00')).toBeTruthy();
  });

  it('renders empty state when no items', () => {
    const { getByText } = render(<TransactionList items={[]} />);
    expect(getByText('No transactions yet.')).toBeTruthy();
  });

  it('renders list header', () => {
    const Header = () => <Text>My Header</Text>;
    const { getByText } = render(<TransactionList items={[]} ListHeaderComponent={<Header />} />);
    expect(getByText('My Header')).toBeTruthy();
  });

  it('handles item press', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TransactionList items={[mockExpense]} onPressItem={onPressMock} />,
    );

    fireEvent.press(getByText('Test Expense'));
    expect(onPressMock).toHaveBeenCalledWith(mockExpense);
  });

  it('handles item press without callback', () => {
    const { getByText } = render(<TransactionList items={[mockExpense]} />);

    fireEvent.press(getByText('Test Expense'));
    // Should not crash
  });

  it('renders default category if ID not found', () => {
    const expenseWithBadCat: Expense = { ...mockExpense, categoryId: 999 };
    const { getByText } = render(<TransactionList items={[expenseWithBadCat]} />);
    expect(getByText('Test Expense')).toBeTruthy();
  });

  it('handles null categoryId', () => {
    const expenseNoCat: Expense = { ...mockExpense, categoryId: null };
    const { getByText } = render(<TransactionList items={[expenseNoCat]} />);
    expect(getByText('Test Expense')).toBeTruthy();
  });

  it('handles invalid categoryId', () => {
    const expenseInvalidCat: Expense = { ...mockExpense, categoryId: 9999 };
    const { getByText } = render(<TransactionList items={[expenseInvalidCat]} />);
    expect(getByText('Test Expense')).toBeTruthy();
  });
});

describe('TransactionItem', () => {
  it('covers Pressable style function for both pressed states', () => {
    const { getByTestId } = render(<TransactionItem item={mockExpense} />);
    const pressable = getByTestId('transaction-item-1');

    const styleProp = pressable.props.style;
    if (typeof styleProp === 'function') {
      const pressedStyle = styleProp({ pressed: true });
      const unpressedStyle = styleProp({ pressed: false });
      expect(pressedStyle).toBeDefined();
      expect(unpressedStyle).toBeDefined();
    }
  });
});
