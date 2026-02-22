import { useAppNavigation } from '@/hooks';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { QuickAddActionSheet } from '../QuickAddActionSheet';

jest.mock('@/hooks', () => {
  const actual = jest.requireActual('@/hooks');
  return {
    ...actual,
    useAppNavigation: jest.fn(),
  };
});

describe('QuickAddActionSheet', () => {
  const mockNavigate = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useAppNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<QuickAddActionSheet visible={true} onClose={mockOnClose} />);

    expect(getByText('Manual Entry')).toBeTruthy();
    expect(getByText('Scan Receipt')).toBeTruthy();
    expect(getByText('Type a Message')).toBeTruthy();
  });

  it('calls onClose when tapping the overlay', () => {
    const { getByLabelText } = render(<QuickAddActionSheet visible={true} onClose={mockOnClose} />);

    fireEvent.press(getByLabelText('Close action sheet'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose and navigates to route when an action is pressed', () => {
    const { getByText } = render(<QuickAddActionSheet visible={true} onClose={mockOnClose} />);

    fireEvent.press(getByText('Manual Entry'));

    // onClose should be called immediately
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Trigger the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    // Expect navigate to have been called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('AddExpense');
  });
});
