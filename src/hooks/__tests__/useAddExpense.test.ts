import { useExpenseStore } from '@/store/useExpenseStore';
import { useNavigation } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useAddExpense } from '../useAddExpense';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('useAddExpense', () => {
  const mockNavigate = { goBack: jest.fn() };
  const mockAddExpense = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigate);

    // Default mock implementation for zustand store selector hook
    (useExpenseStore as jest.Mock).mockImplementation((selector) => {
      // Mock the state object that the selector would receive
      return selector({
        addExpense: mockAddExpense,
        isLoading: false,
      });
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAddExpense());

    expect(result.current.amount).toBe('');
    expect(result.current.title).toBe('');
    expect(result.current.categoryId).toBeNull();
    expect(result.current.isValid).toBe(false);
  });

  it('initializes with prefill data correctly', () => {
    const testDate = new Date('2023-01-01T12:00:00.000Z');
    const { result } = renderHook(() =>
      useAddExpense({
        amount: '50',
        title: 'Groceries',
        categoryId: 2,
        date: testDate.toISOString(),
      }),
    );

    expect(result.current.amount).toBe('50');
    expect(result.current.title).toBe('Groceries');
    expect(result.current.categoryId).toBe(2);
    expect(result.current.date).toEqual(testDate);
    expect(result.current.isValid).toBe(true);
  });

  it('updates validation state correctly', () => {
    const { result } = renderHook(() => useAddExpense());

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.setAmount('10');
    });
    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.setTitle('Snack');
    });
    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.setCategoryId(1);
    });
    expect(result.current.isValid).toBe(true);
  });

  it('alerts on invalid save attempts', async () => {
    const { result } = renderHook(() => useAddExpense());

    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Invalid Amount', expect.any(String));

    act(() => result.current.setAmount('10'));
    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Missing Title', expect.any(String));

    act(() => result.current.setTitle('Test'));
    await act(async () => {
      await result.current.handleSave();
    });
    expect(Alert.alert).toHaveBeenCalledWith('Missing Category', expect.any(String));
  });

  it('calls addExpense and navigates back on valid save', async () => {
    const { result } = renderHook(() => useAddExpense());

    // Setup valid state
    act(() => {
      result.current.setAmount('25.50');
      result.current.setTitle('Dinner');
      result.current.setCategoryId(3);
    });

    mockAddExpense.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.handleSave();
    });

    expect(mockAddExpense).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 25.5,
        title: 'Dinner',
        categoryId: 3,
      }),
    );

    // Simulate clicking OK on the success alert
    const alertCall = (Alert.alert as jest.Mock).mock.calls.find((call) => call[0] === 'Saved!');
    expect(alertCall).toBeDefined();

    const onPressObj = alertCall[2][0];
    onPressObj.onPress();
    expect(mockNavigate.goBack).toHaveBeenCalledTimes(1);
  });

  it('alerts on save failure', async () => {
    const { result } = renderHook(() =>
      useAddExpense({
        amount: '50',
        title: 'Fail test',
        categoryId: 1,
      }),
    );

    mockAddExpense.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to save expense. Please try again.');
  });
});
