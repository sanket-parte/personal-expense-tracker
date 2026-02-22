import { useAppNavigation } from '@/hooks';
import { parseNaturalLanguageExpense } from '@/services/nlpParser';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { NLAddScreen } from '../NLAddScreen';

jest.mock('@/hooks', () => {
  const actual = jest.requireActual('@/hooks');
  return {
    ...actual,
    useAppNavigation: jest.fn(),
  };
});

jest.mock('@/services/nlpParser', () => ({
  parseNaturalLanguageExpense: jest.fn(),
}));

describe('NLAddScreen', () => {
  const mockNavigate = { replace: jest.fn(), goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppNavigation as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<NLAddScreen />);
    expect(getByText('Smart Entry')).toBeTruthy();
    expect(getByPlaceholderText('e.g. Spent $15 on coffee this morning')).toBeTruthy();
  });

  it('validates empty input', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<NLAddScreen />);
    const input = getByPlaceholderText('e.g. Spent $15 on coffee this morning');

    // Attempt save with empty text
    fireEvent.changeText(input, '   ');

    await act(async () => {
      fireEvent.press(getByText('Generate Expense'));
    });

    // Let the event loop flush
    await new Promise(process.nextTick);

    expect(parseNaturalLanguageExpense).not.toHaveBeenCalled();
    expect(mockNavigate.replace).not.toHaveBeenCalled();
  });

  it('handles successful parsing and navigation', async () => {
    const mockExpense = {
      amount: '15',
      title: 'Lunch',
      categoryId: 1,
      date: '2023-01-01T00:00:00.000Z',
    };
    (parseNaturalLanguageExpense as jest.Mock).mockResolvedValueOnce(mockExpense);

    const { getByText, getByPlaceholderText } = render(<NLAddScreen />);
    const input = getByPlaceholderText('e.g. Spent $15 on coffee this morning');

    fireEvent.changeText(input, 'Spent $15 on lunch');

    await act(async () => {
      fireEvent.press(getByText('Generate Expense'));
    });

    expect(parseNaturalLanguageExpense).toHaveBeenCalledWith('Spent $15 on lunch');
    expect(mockNavigate.replace).toHaveBeenCalledWith('AddExpense', { prefillData: mockExpense });
  });

  it('handles parsing errors safely', async () => {
    (parseNaturalLanguageExpense as jest.Mock).mockRejectedValueOnce(new Error('Failed'));

    const { getByText, getByPlaceholderText } = render(<NLAddScreen />);
    const input = getByPlaceholderText('e.g. Spent $15 on coffee this morning');

    fireEvent.changeText(input, 'gibberish string');

    await act(async () => {
      fireEvent.press(getByText('Generate Expense'));
    });

    expect(getByText('Could not understand. Please try again or use Manual Entry.')).toBeTruthy();
    expect(mockNavigate.replace).not.toHaveBeenCalled();
  });

  it('navigates back on close press', () => {
    const { getByTestId } = render(<NLAddScreen />);
    // The Ionicons component is mocked to render a View with testID="mock-icon"
    // Since there's only one icon in the header, we can query it directly
    const closeIcon = getByTestId('mock-icon'); // Relies on the @expo/vector-icons jest setup mock

    fireEvent.press(closeIcon);
    expect(mockNavigate.goBack).toHaveBeenCalledTimes(1);
  });
});
