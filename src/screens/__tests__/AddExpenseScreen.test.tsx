import { useAddExpense } from '@/hooks/useAddExpense';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AddExpenseScreen } from '../AddExpenseScreen';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: jest.fn(),
  };
});

jest.mock('@/hooks/useAddExpense', () => ({
  useAddExpense: jest.fn(),
}));

describe('AddExpenseScreen', () => {
  const mockNavigate = { goBack: jest.fn() };

  const mockUseAddExpenseData = {
    amount: '',
    setAmount: jest.fn(),
    title: '',
    setTitle: jest.fn(),
    categoryId: null,
    setCategoryId: jest.fn(),
    date: new Date('2023-01-01T12:00:00.000Z'),
    isLoading: false,
    isValid: false,
    handleSave: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigate);
    (useAddExpense as jest.Mock).mockReturnValue(mockUseAddExpenseData);
  });

  it('renders correctly with default state', () => {
    const { getByText, getByPlaceholderText } = render(<AddExpenseScreen route={{ params: {} }} />);

    expect(getByText('New Expense')).toBeTruthy();
    expect(getByPlaceholderText('0.00')).toBeTruthy();
    expect(getByPlaceholderText('What is this for?')).toBeTruthy();
    expect(getByText('Save Expense')).toBeTruthy();
  });

  it('navigates back on Cancel press', () => {
    const { getByText } = render(<AddExpenseScreen route={{ params: {} }} />);
    fireEvent.press(getByText('Cancel'));
    expect(mockNavigate.goBack).toHaveBeenCalledTimes(1);
  });

  it('calls setAmount and setTitle on input', () => {
    const { getByPlaceholderText } = render(<AddExpenseScreen route={{ params: {} }} />);

    fireEvent.changeText(getByPlaceholderText('0.00'), '15.50');
    expect(mockUseAddExpenseData.setAmount).toHaveBeenCalledWith('15.50');

    fireEvent.changeText(getByPlaceholderText('What is this for?'), 'Lunch');
    expect(mockUseAddExpenseData.setTitle).toHaveBeenCalledWith('Lunch');
  });

  it('calls setCategoryId when a category chip is pressed', () => {
    const { getByLabelText } = render(<AddExpenseScreen route={{ params: {} }} />);

    // Select "Food" category, assuming Categories[1] is Food.
    // Ensure the accessibility label logic defined in the component maps correctly.
    const foodChip = getByLabelText('Category Food');
    fireEvent.press(foodChip);

    expect(mockUseAddExpenseData.setCategoryId).toHaveBeenCalledWith(1); // 1 = Food ID
  });

  it('allows save when valid', () => {
    (useAddExpense as jest.Mock).mockReturnValue({
      ...mockUseAddExpenseData,
      isValid: true,
      amount: '15.50',
      title: 'Lunch',
      categoryId: 1,
    });

    const { getByText } = render(<AddExpenseScreen route={{ params: {} }} />);
    const saveButton = getByText('Save Expense');

    fireEvent.press(saveButton);
    expect(mockUseAddExpenseData.handleSave).toHaveBeenCalledTimes(1);
  });

  it('disables save button when saving', () => {
    (useAddExpense as jest.Mock).mockReturnValue({
      ...mockUseAddExpenseData,
      isValid: true,
      isLoading: true,
    });

    const { getByTestId } = render(<AddExpenseScreen route={{ params: {} }} />);
    const saveButton = getByTestId('save-button');

    // In React Native Testing Library, accessibilityState disabled is a common way to assert 'disabled' props have propagated down
    expect(saveButton.props.accessibilityState.disabled).toBe(true);
  });
});
