import { act, renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useAddExpense } from '../useAddExpense';

// Mock store and nav
const mockAddExpense = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn((selector) => {
    return selector
      ? selector({ addExpense: mockAddExpense, isLoading: false })
      : { addExpense: mockAddExpense, isLoading: false };
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.spyOn(Alert, 'alert');

describe('useAddExpense', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useAddExpense());
    expect(result.current.amount).toBe('');
    expect(result.current.isValid).toBe(false);
  });

  it('validates amount on save', async () => {
    const { result } = renderHook(() => useAddExpense());
    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Invalid Amount', expect.any(String));
  });

  it('validates title on save', async () => {
    const { result } = renderHook(() => useAddExpense());
    act(() => result.current.setAmount('100'));
    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Missing Title', expect.any(String));
  });

  it('validates category on save', async () => {
    const { result } = renderHook(() => useAddExpense());
    act(() => {
      result.current.setAmount('100');
      result.current.setTitle('Food');
    });
    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Missing Category', expect.any(String));
  });

  it('saves successfully', async () => {
    const { result } = renderHook(() => useAddExpense());
    act(() => {
      result.current.setAmount('100');
      result.current.setTitle('Food');
      result.current.setCategoryId(1);
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(mockAddExpense).toHaveBeenCalled();
    // goBack is now called via Alert callback — verify Alert was shown
    expect(Alert.alert).toHaveBeenCalledWith(
      'Saved!',
      'Your expense has been recorded.',
      expect.any(Array),
    );

    // Simulate pressing "OK" in the alert to trigger goBack
    const alertCall = (Alert.alert as jest.Mock).mock.calls.find((call) => call[0] === 'Saved!');
    const okButton = alertCall?.[2]?.[0];
    act(() => {
      okButton?.onPress?.();
    });
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('handles save error', async () => {
    mockAddExpense.mockRejectedValueOnce(new Error('Fail'));
    const { result } = renderHook(() => useAddExpense());
    act(() => {
      result.current.setAmount('100');
      result.current.setTitle('Food');
      result.current.setCategoryId(1);
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
  });
});
