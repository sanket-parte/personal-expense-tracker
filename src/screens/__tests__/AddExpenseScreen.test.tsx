/**
 * AddExpenseScreen Tests
 *
 * Covers rendering, input handling, save flow, disabled states,
 * loading states, keyboard dismiss, and cancel navigation.
 */

import * as useAddExpenseHook from '@/hooks/useAddExpense';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Keyboard } from 'react-native';
import { AddExpenseScreen } from '../AddExpenseScreen';

// Mock the hook
jest.spyOn(Keyboard, 'dismiss');

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

const mockHandleSave = jest.fn();
const mockSetAmount = jest.fn();
const mockSetTitle = jest.fn();
const mockSetCategoryId = jest.fn();

jest.spyOn(useAddExpenseHook, 'useAddExpense').mockReturnValue({
  amount: '',
  setAmount: mockSetAmount,
  title: '',
  setTitle: mockSetTitle,
  categoryId: null,
  setCategoryId: mockSetCategoryId,
  date: new Date(),
  isLoading: false,
  isValid: false,
  handleSave: mockHandleSave,
});

describe('AddExpenseScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddExpenseScreen />);
    expect(getByText('New Expense')).toBeTruthy();
    expect(getByPlaceholderText('0.00')).toBeTruthy();
  });

  it('updates input fields', () => {
    const { getByPlaceholderText, getByText } = render(<AddExpenseScreen />);

    fireEvent.changeText(getByPlaceholderText('0.00'), '100');
    expect(mockSetAmount).toHaveBeenCalledWith('100');

    fireEvent.changeText(getByPlaceholderText('What is this for?'), 'Lunch');
    expect(mockSetTitle).toHaveBeenCalledWith('Lunch');

    fireEvent.press(getByText('Food'));
    expect(mockSetCategoryId).toHaveBeenCalledWith(1);
  });

  it('calls handleSave when save button is pressed', () => {
    (useAddExpenseHook.useAddExpense as jest.Mock).mockReturnValue({
      amount: '100',
      setAmount: mockSetAmount,
      title: 'Lunch',
      setTitle: mockSetTitle,
      categoryId: 1,
      setCategoryId: mockSetCategoryId,
      date: new Date(),
      isLoading: false,
      isValid: true,
      handleSave: mockHandleSave,
    });

    const { getByTestId } = render(<AddExpenseScreen />);
    fireEvent.press(getByTestId('save-button'));
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('disables save button when hook says invalid', () => {
    (useAddExpenseHook.useAddExpense as jest.Mock).mockReturnValue({
      amount: '',
      setAmount: mockSetAmount,
      title: '',
      setTitle: mockSetTitle,
      categoryId: null,
      setCategoryId: mockSetCategoryId,
      date: new Date(),
      isLoading: false,
      isValid: false,
      handleSave: mockHandleSave,
    });

    const { getByTestId } = render(<AddExpenseScreen />);
    expect(getByTestId('save-button').props.accessibilityState.disabled).toBe(true);
  });

  it('shows loading state when saving', () => {
    (useAddExpenseHook.useAddExpense as jest.Mock).mockReturnValue({
      amount: '100',
      setAmount: mockSetAmount,
      title: 'Lunch',
      setTitle: mockSetTitle,
      categoryId: 1,
      setCategoryId: mockSetCategoryId,
      date: new Date(),
      isLoading: true,
      isValid: true,
      handleSave: mockHandleSave,
    });

    const { getByText, getByTestId } = render(<AddExpenseScreen />);
    expect(getByText('Saving...')).toBeTruthy();
    // isDisabled = !isValid || isLoading, so disabled should be true
    expect(getByTestId('save-button').props.accessibilityState.disabled).toBe(true);
  });

  it('navigates back on cancel press', () => {
    const { getByText } = render(<AddExpenseScreen />);
    fireEvent.press(getByText('Cancel'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('dismisses keyboard on touch outside', () => {
    const { getByTestId } = render(<AddExpenseScreen />);
    fireEvent.press(getByTestId('keyboard-dismiss'));
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });

  it('renders with selected category highlighted', () => {
    (useAddExpenseHook.useAddExpense as jest.Mock).mockReturnValue({
      amount: '100',
      setAmount: mockSetAmount,
      title: 'Lunch',
      setTitle: mockSetTitle,
      categoryId: 1,
      setCategoryId: mockSetCategoryId,
      date: new Date(),
      isLoading: false,
      isValid: true,
      handleSave: mockHandleSave,
    });

    const { getByText } = render(<AddExpenseScreen />);
    // Just verify the component renders without crashing when a category is selected
    expect(getByText('Food')).toBeTruthy();
    expect(getByText('Save Expense')).toBeTruthy();
  });
});
